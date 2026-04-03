import os
import json

def is_valid(article):
    title = article["title"].lower()
    link = article["link"].lower()

    # must be news
    if "news" not in link:
        return False

    # remove junk
    bad_keywords = [
        "login", "sign in", "advertisement",
        "privacy", "terms", "subscription",
        "video", "photo", "gallery"
    ]

    if any(word in title for word in bad_keywords):
        return False

    # must be meaningful title
    if len(title) < 25:
        return False

    return True


def clean_data():
    backend_dir = os.path.dirname(__file__)
    raw_path = os.path.join(backend_dir, "raw_news.json")
    clean_path = os.path.join(backend_dir, "clean_news.json")

    with open(raw_path, "r", encoding="utf-8") as f:
        raw = json.load(f)

    clean = []
    seen = set()

    for article in raw:
        if not is_valid(article):
            continue

        if article["link"] in seen:
            continue

        seen.add(article["link"])
        clean.append(article)

    with open(clean_path, "w", encoding="utf-8") as f:
        json.dump(clean, f, indent=2)

    print(f"✅ Cleaned {len(clean)} valid articles")


if __name__ == "__main__":
    clean_data()