import os
import json
from datetime import datetime
from transformers import pipeline
from tqdm import tqdm

def analyze_sentiments():
    """
    Reads raw news, analyzes sentiment for each article,
    and saves the enriched data for the frontend.
    """
    print("🔥 Initializing FinBERT sentiment analysis model (this may take a moment)...")
    # Use a pipeline as a high-level helper, as in your Colab notebook
    sentiment_pipeline = pipeline("sentiment-analysis", model="ProsusAI/finbert")

    # Define file paths
    backend_dir = os.path.dirname(__file__)
    raw_news_path = os.path.join(backend_dir, "raw_news.json")
    final_output_path = os.path.join(backend_dir, "..", "src", "data", "news.json")

    # 1. Read the raw scraped data
    try:
        with open(raw_news_path, "r", encoding="utf-8") as f:
            raw_articles = json.load(f)
    except FileNotFoundError:
        print(f"❌ Error: The file {raw_news_path} was not found.")
        print("Please run scraper.py first to generate it.")
        return

    print(f"📰 Found {len(raw_articles)} articles to analyze.")
    
    enriched_articles = []
    # Use tqdm for a nice progress bar
    for article in tqdm(raw_articles, desc="Analyzing sentiments"):
        try:
            # Analyze the summary (synopsis) or fallback to the title (headline)
            text_to_analyze = article.get("synopsis") or article.get("headline")

            if text_to_analyze:
                # Truncate text to the model's max input size to avoid errors
                analysis_result = sentiment_pipeline(text_to_analyze[:512])
                # The result is a list with one dictionary, e.g., [{'label': 'positive', 'score': 0.98}]
                article['sentiment'] = analysis_result[0]
            else:
                # If no text, assign a default neutral sentiment
                article['sentiment'] = {'label': 'neutral', 'score': 0.5}

            enriched_articles.append(article)
        except Exception as e:
            print(f"\nCould not process article: {article.get('headline')}. Error: {e}")
            # Still add the article but with neutral sentiment
            article['sentiment'] = {'label': 'neutral', 'score': 0.5}
            enriched_articles.append(article)
            
    # 2. Create the final JSON object in the format the frontend expects
    final_data = {
        "updated_at": datetime.utcnow().isoformat() + "Z",
        "articles": enriched_articles
    }

    # 3. Save the final data to the frontend's data directory
    os.makedirs(os.path.dirname(final_output_path), exist_ok=True)
    with open(final_output_path, "w", encoding="utf-8") as f:
        json.dump(final_data, f, ensure_ascii=False, indent=2)

    print(f"\n✅ Success! Enriched {len(enriched_articles)} articles with sentiment data.")
    print(f"Final data saved to: {final_output_path}")

if __name__ == "__main__":
    analyze_sentiments()