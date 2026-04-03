import os
import json
from datetime import datetime
from bs4 import BeautifulSoup
from curl_cffi import requests as cureq

def fetch_rss_feed(url):
    headers = {"User-Agent": "Mozilla/5.0"}
    res = cureq.get(url, headers=headers, impersonate="chrome110", timeout=15)
    res.raise_for_status()
    return res.content

def scrape_news_rss(rss_url, limit=15):
    print("📡 Fetching articles from RSS Feed...")
    raw_xml = fetch_rss_feed(rss_url)
    
    # html.parser works perfectly for extracting basic XML tags
    soup = BeautifulSoup(raw_xml, "html.parser")
    items = soup.find_all("item")
    
    results = []
    print(f"Found {len(items)} items in feed. Processing top {limit}...")
    
    for i, item in enumerate(items[:limit], 1):
        title = item.title.text if item.title else "No Title"
        link = item.link.text if item.link else ""
        
        # RSS feeds provide a highly detailed summary out of the box
        synopsis = item.description.text if item.description else ""
        
        # Clean up any leftover HTML tags inside the summary
        clean_synopsis = BeautifulSoup(synopsis, "html.parser").get_text(strip=True)
        
        print(f"  [{i}/{limit}] Processed: {title[:50]}...")
        
        results.append({
            "headline": title,
            "synopsis": clean_synopsis,
            "link": link,
            "source": "moneycontrol.com",
            "published_at": datetime.utcnow().isoformat() + "Z",
            "full_text": clean_synopsis # Using synopsis as full text avoids secondary blocks!
        })
        
    return results

def write_json(path, data):
    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)

if __name__ == "__main__":
    print("🚀 Starting news scraping via RSS...")
    
    # The official Moneycontrol Business RSS Feed
    RSS_URL = "https://www.moneycontrol.com/rss/business.xml"
    
    scraped_data = scrape_news_rss(RSS_URL, limit=15)

    if scraped_data:
        output_path = os.path.join(os.path.dirname(__file__), "raw_news.json")
        write_json(output_path, scraped_data)
        print(f"\n✅ Successfully scraped {len(scraped_data)} articles")
    else:
        print("\n⚠️ No data was scraped.")