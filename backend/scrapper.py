import os
import json
from datetime import datetime, UTC
from bs4 import BeautifulSoup
from curl_cffi import requests as cureq
import sys

print("SCRAPER PYTHON:", sys.executable)


# =============================
# FETCH PAGE
# =============================
def fetch_page(url):
    headers = {"User-Agent": "Mozilla/5.0"}

    res = cureq.get(
        url,
        headers=headers,
        impersonate="chrome110",
        timeout=15
    )

    res.raise_for_status()
    return res.text


# =============================
# SCRAPER
# =============================
def scrape_moneycontrol(total_limit=50):
    print("🚀 Scraping Moneycontrol multiple pages...")

    base_url = "https://www.moneycontrol.com/news/business/page-{}/"

    results = []
    page = 1

    while len(results) < total_limit:
        url = base_url.format(page)
        print(f"\n📄 Fetching Page {page}: {url}")

        html = fetch_page(url)
        soup = BeautifulSoup(html, "html.parser")

        articles = soup.select("li.clearfix")

        if not articles:
            print("⚠️ No more articles found, stopping...")
            break

        for article in articles:
            if len(results) >= total_limit:
                break

            a_tag = article.find("a")
            p_tag = article.find("p")

            if not a_tag:
                continue

            title = a_tag.get_text(strip=True)
            link = a_tag.get("href")

            # filter junk
            if not link or link == "#" or "login" in title.lower():
                continue

            summary = p_tag.get_text(strip=True) if p_tag else ""

            print(f"[{len(results)+1}] {title[:60]}...")

            results.append({
                "headline": title,
                "synopsis": summary,
                "link": link,
                "source": "Moneycontrol",
                "published_at": datetime.now(UTC).isoformat(),
                "full_text": summary
            })

        page += 1

    print(f"\n✅ Total scraped: {len(results)} articles")
    return results

# =============================
# SAVE
# =============================
def write_json(path, data):
    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, indent=2)


# =============================
# MAIN
# =============================
if __name__ == "__main__":
    data = scrape_moneycontrol(total_limit=50)

    if data:
        path = os.path.join(os.path.dirname(__file__), "raw_news.json")
        write_json(path, data)

        print(f"\n✅ Saved {len(data)} latest articles")
    else:
        print("❌ No data scraped")