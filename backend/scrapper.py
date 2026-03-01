# backend/scraper.py

import os
import json
import requests
import time
import random
from datetime import datetime
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse

HEADERS = {
    "User-Agent": (
        "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 "
        "(KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36"
    )
}

def fetch(url, timeout=12):
    """Fetches a URL and returns the response object."""
    r = requests.get(url, headers=HEADERS, timeout=timeout)
    r.raise_for_status()
    return r

def clean_text(s):
    """Removes extra whitespace from a string."""
    return " ".join(s.split()) if s else ""

def extract_article_text(article_url):
    """Extracts the main body text from an article URL."""
    try:
        res = fetch(article_url)
    except Exception as e:
        return f"[fetch error: {e}]"

    soup = BeautifulSoup(res.content, "html.parser")
    # A list of common selectors for article content
    container_selectors = [
        "div.post-content", "div.entry-content", "article .entry-content",
        "article .content", "article", "div[itemprop='articleBody']",
        "section.article-content", "div#content", "div.storycontent",
    ]

    paragraphs = []
    for sel in container_selectors:
        container = soup.select_one(sel)
        if container:
            ps = [clean_text(p.get_text(" ", strip=True)) for p in container.find_all("p")]
            ps = [p for p in ps if len(p) > 50] # Filter out short paragraphs
            if ps:
                paragraphs = ps
                break
    
    if not paragraphs:
        # Fallback to meta description if no paragraphs are found
        meta = soup.find("meta", attrs={"name": "description"}) or soup.find("meta", attrs={"property": "og:description"})
        return clean_text(meta["content"]) if meta and meta.get("content") else "[no readable content found]"
    
    return "\n\n".join(paragraphs[:6]) # Return the first 6 paragraphs

def extract_listing(news_url, limit=10):
    """Extracts a list of article links and titles from a news listing page."""
    res = fetch(news_url)
    soup = BeautifulSoup(res.content, "html.parser")
    base = f"{urlparse(news_url).scheme}://{urlparse(news_url).netloc}"
    seen_urls = set()
    items = []

    # Common pattern for news headlines
    for a in soup.select("h2 a, h3 a, a.title"):
        title = clean_text(a.get_text(strip=True))
        href = a.get("href")
        if not title or not href:
            continue
        
        link = urljoin(base, href)
        if link in seen_urls:
            continue
        
        seen_urls.add(link)
        
        # Try to find a summary paragraph near the link
        parent_block = a.find_parent(["div", "li", "article"])
        synopsis = None
        if parent_block:
            p_tag = parent_block.find("p")
            if p_tag:
                synopsis = clean_text(p_tag.get_text(" ", strip=True))
        
        items.append({"title": title, "link": link, "synopsis": synopsis})
        if len(items) >= limit:
            return items
            
    return items

def scrape_news_with_bodies(news_url, limit=15, polite=True):
    """Scrapes news, fetches full article bodies, and returns a list of dictionaries."""
    listing = extract_listing(news_url, limit=limit)
    results = []
    print(f"Found {len(listing)} articles, now fetching full content...")
    for i, item in enumerate(listing, 1):
        print(f"  [{i}/{len(listing)}] Fetching: {item['link']}")
        body = extract_article_text(item["link"])
        
        results.append({
            "headline": item["title"],
            "synopsis": item.get("synopsis") or (body.split("\n\n")[0] if body else ""),
            "link": item["link"],
            "source": urlparse(item["link"]).netloc,
            "published_at": datetime.utcnow().isoformat() + "Z",
            "full_text": body
        })
        if polite:
            time.sleep(random.uniform(0.5, 1.5))
    return results

def write_json(path, data):
    """Writes data to a JSON file."""
    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

if __name__ == "__main__":
    print("🚀 Starting news scraping...")
    NEWS_URL = "https://www.moneycontrol.com/news/"
    scraped_data = scrape_news_with_bodies(NEWS_URL, limit=15)

    if scraped_data:
        output_path = os.path.join(os.path.dirname(__file__), "raw_news.json")
        write_json(output_path, scraped_data)
        print(f"\n✅ Successfully scraped {len(scraped_data)} articles and saved to raw_news.json")
    else:
        print("\n⚠️ No data was scraped.")