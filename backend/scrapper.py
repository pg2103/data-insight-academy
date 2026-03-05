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

# -----------------------------
# ✅ QUALITY FILTER (NEW)
# -----------------------------
def is_valid_article(title: str, link: str) -> bool:
    title_lower = title.lower()
    link_lower = link.lower()

    # ❌ remove junk titles
    junk_title_keywords = [
        "top news",
        "videos",
        "slideshows",
        "infographic",
        "world news",
        "politics",
        "economy news",
        "business videos",
        "apply now",
        "loan",
        "advertisement",
        "photo gallery"
    ]

    if any(word in title_lower for word in junk_title_keywords):
        return False

    # ❌ remove bad domains
    if "moneycontrolpay" in link_lower:
        return False

    # ❌ remove non-article urls
    bad_url_patterns = [
        "/videos/",
        "/photogallery/",
        "/infographic/",
        "news-all.html",
    ]

    if any(p in link_lower for p in bad_url_patterns):
        return False

    # ✅ keep only real financial news
    good_patterns = [
        "/news/business/",
        "/news/markets/",
        "/news/stocks/",
    ]

    if not any(p in link_lower for p in good_patterns):
        return False

    return True


# -----------------------------
# existing helpers
# -----------------------------
def fetch(url, timeout=12):
    r = requests.get(url, headers=HEADERS, timeout=timeout)
    r.raise_for_status()
    return r


def clean_text(s):
    return " ".join(s.split()) if s else ""


# -----------------------------
# article body extractor
# -----------------------------
def extract_article_text(article_url):
    try:
        res = fetch(article_url)
    except Exception as e:
        return f"[fetch error: {e}]"

    soup = BeautifulSoup(res.content, "html.parser")

    container_selectors = [
        "div.post-content",
        "div.entry-content",
        "article .entry-content",
        "article .content",
        "article",
        "div[itemprop='articleBody']",
        "section.article-content",
        "div#content",
        "div.storycontent",
    ]

    paragraphs = []
    for sel in container_selectors:
        container = soup.select_one(sel)
        if container:
            ps = [
                clean_text(p.get_text(" ", strip=True))
                for p in container.find_all("p")
            ]
            ps = [p for p in ps if len(p) > 50]
            if ps:
                paragraphs = ps
                break

    if not paragraphs:
        meta = (
            soup.find("meta", attrs={"name": "description"})
            or soup.find("meta", attrs={"property": "og:description"})
        )
        return (
            clean_text(meta["content"])
            if meta and meta.get("content")
            else "[no readable content found]"
        )

    return "\n\n".join(paragraphs[:6])


# -----------------------------
# ✅ IMPROVED LISTING
# -----------------------------
def extract_listing(news_url, limit=10):
    res = fetch(news_url)
    soup = BeautifulSoup(res.content, "html.parser")

    base = f"{urlparse(news_url).scheme}://{urlparse(news_url).netloc}"
    seen_urls = set()
    items = []

    for a in soup.select("h2 a, h3 a, a.title"):
        title = clean_text(a.get_text(strip=True))
        href = a.get("href")

        if not title or not href:
            continue

        # ✅ skip very short titles (NEW)
        if len(title) < 30:
            continue

        link = urljoin(base, href)

        if link in seen_urls:
            continue

        # ✅ filter junk (NEW — VERY IMPORTANT)
        if not is_valid_article(title, link):
            continue

        seen_urls.add(link)

        parent_block = a.find_parent(["div", "li", "article"])
        synopsis = None
        if parent_block:
            p_tag = parent_block.find("p")
            if p_tag:
                synopsis = clean_text(p_tag.get_text(" ", strip=True))

        items.append({
            "title": title,
            "link": link,
            "synopsis": synopsis
        })

        if len(items) >= limit:
            break

    return items


# -----------------------------
# ✅ IMPROVED MAIN SCRAPER
# -----------------------------
def scrape_news_with_bodies(news_url, limit=15, polite=True):
    listing = extract_listing(news_url, limit=limit)
    results = []

    print(f"Found {len(listing)} articles, now fetching full content...")

    for i, item in enumerate(listing, 1):
        print(f"  [{i}/{len(listing)}] Fetching: {item['link']}")

        body = extract_article_text(item["link"])

        # ✅ skip failed articles (NEW — CRITICAL)
        if body.startswith("[fetch error"):
            continue

        if body.startswith("[no readable content"):
            continue

        results.append({
            "headline": item["title"],
            "synopsis": item.get("synopsis") or body.split("\n\n")[0],
            "link": item["link"],
            "source": urlparse(item["link"]).netloc,
            "published_at": datetime.utcnow().isoformat() + "Z",
            "full_text": body
        })

        if polite:
            time.sleep(random.uniform(0.5, 1.5))

    return results


def write_json(path, data):
    with open(path, "w", encoding="utf-8") as f:
        json.dump(data, f, ensure_ascii=False, indent=2)


# -----------------------------
# main
# -----------------------------
if __name__ == "__main__":
    print("🚀 Starting news scraping...")

    NEWS_URL = "https://www.moneycontrol.com/news/"
    scraped_data = scrape_news_with_bodies(NEWS_URL, limit=15)

    if scraped_data:
        output_path = os.path.join(os.path.dirname(__file__), "raw_news.json")
        write_json(output_path, scraped_data)
        print(f"\n✅ Successfully scraped {len(scraped_data)} articles")
    else:
        print("\n⚠️ No data was scraped.")