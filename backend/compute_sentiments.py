import os
import json
from datetime import datetime
from transformers import pipeline
from tqdm import tqdm
import torch


# ================================
# Config
# ================================
MAX_TEXT_LEN = 512
BATCH_SIZE = 8  # increase to 16 if you have good CPU/GPU


def choose_text(article: dict) -> str:
    """
    Choose the best available text for sentiment.
    Priority:
    1. full_text (best signal)
    2. synopsis
    3. headline
    """
    text = (
        article.get("full_text")
        or article.get("synopsis")
        or article.get("headline")
        or ""
    )
    return text.strip()[:MAX_TEXT_LEN]


def normalize_label(label: str) -> str:
    """
    Normalize FinBERT labels to lowercase standard form.
    """
    label = label.lower()
    if label not in {"positive", "negative", "neutral"}:
        return "neutral"
    return label


def analyze_sentiments():
    print("🔥 Loading FinBERT sentiment model...")

    # Auto-detect GPU if available
    device = 0 if torch.cuda.is_available() else -1

    sentiment_pipeline = pipeline(
        "sentiment-analysis",
        model="ProsusAI/finbert",
        device=device,
    )

    backend_dir = os.path.dirname(__file__)
    raw_news_path = os.path.join(backend_dir, "raw_news.json")
    final_output_path = os.path.join(
        backend_dir, "..", "src", "data", "news.json"
    )

    # ================================
    # Load raw news
    # ================================
    try:
        with open(raw_news_path, "r", encoding="utf-8") as f:
            raw_articles = json.load(f)
    except FileNotFoundError:
        print(f"❌ raw_news.json not found. Run scraper first.")
        return

    print(f"📰 Articles to analyze: {len(raw_articles)}")

    # ================================
    # Prepare texts
    # ================================
    texts = [choose_text(article) for article in raw_articles]

    enriched_articles = []

    # ================================
    # Batch inference (FASTER)
    # ================================
    print("⚡ Running FinBERT inference...")

    for i in tqdm(range(0, len(texts), BATCH_SIZE)):
        batch_texts = texts[i : i + BATCH_SIZE]
        batch_articles = raw_articles[i : i + BATCH_SIZE]

        try:
            results = sentiment_pipeline(batch_texts)

            for article, result in zip(batch_articles, results):
                article["sentiment"] = {
                    "label": normalize_label(result["label"]),
                    "score": round(float(result["score"]), 4),
                }
                enriched_articles.append(article)

        except Exception as e:
            print(f"\n⚠️ Batch failed: {e}")
            # fallback per article
            for article in batch_articles:
                article["sentiment"] = {
                    "label": "neutral",
                    "score": 0.5,
                }
                enriched_articles.append(article)

    # ================================
    # Final JSON
    # ================================
    final_data = {
        "updated_at": datetime.utcnow().isoformat() + "Z",
        "articles": enriched_articles,
    }

    os.makedirs(os.path.dirname(final_output_path), exist_ok=True)

    with open(final_output_path, "w", encoding="utf-8") as f:
        json.dump(final_data, f, ensure_ascii=False, indent=2)

    print(
        f"\n✅ Done. Processed {len(enriched_articles)} articles.\n"
        f"📁 Saved to: {final_output_path}"
    )


if __name__ == "__main__":
    analyze_sentiments()