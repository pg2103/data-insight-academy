import subprocess
import os

# 🔥 FORCE venv python (correct way)
BASE_DIR = os.path.dirname(__file__)

python_exec = os.path.join(BASE_DIR, "venv", "Scripts", "python.exe")

print("🚀 Running full pipeline...")
print("Using Python:", python_exec)

# STEP 1: Scraper
print("📡 Step 1: Scraping...")
subprocess.run([python_exec, "scrapper.py"], check=True)

# STEP 2: Sentiment
print("🤖 Step 2: Sentiment...")
subprocess.run([python_exec, "compute_sentiments.py"], check=True)

print("✅ Pipeline completed")