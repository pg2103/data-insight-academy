import subprocess
import sys

python_exec = sys.executable

print("🚀 Step 1: Scraping raw data...")
subprocess.run([python_exec, "scrapper.py"])

print("🤖 Step 3: Sentiment analysis...")
subprocess.run([python_exec, "compute_sentiments.py"])

print("✅ Pipeline completed.")