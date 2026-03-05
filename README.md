# 📊 StockAI – AI-Powered Market Insight & Risk Management

StockAI is an AI-powered platform designed to deliver market insights using financial news analysis, machine learning, and data visualization.

The platform collects financial news, analyzes the sentiment of each article using a specialized financial NLP model, and presents the results through an interactive dashboard.

The goal is to help users better understand market trends, sentiment shifts, and potential risks using AI-driven insights.

**Note:** The project is currently under active development.

---

# 🚀 Objective

The main objective of StockAI is to simplify stock and cryptocurrency market analysis.

Instead of manually reading large volumes of financial news and market data, the platform processes information automatically and extracts meaningful insights using AI.

The system focuses on three core ideas:

• Collect financial information from reliable sources
• Use AI models to analyze sentiment and patterns
• Present insights through an intuitive dashboard

---

# 🧠 Current Capabilities

The current version already implements an automated pipeline consisting of:

1. **Financial News Scraping**
2. **AI-Based Sentiment Analysis**
3. **Dashboard Visualization**

### Workflow

1. News articles are scraped from MoneyControl.
2. Articles are stored in a raw dataset.
3. FinBERT analyzes the sentiment of each article.
4. Enriched data is stored in JSON format.
5. React dashboard displays the insights.

---

# 🔮 Planned Features

The full vision of StockAI includes several advanced features.

### Market Data

* 📈 Real-time stock and cryptocurrency market data
* 📊 Historical trend analysis
* 📉 Market volatility tracking

### AI Analysis

* 💬 News sentiment analysis
* 🔮 Price prediction using machine learning models
* 🧠 Pattern detection for market movements

### Risk Intelligence

* ⚠️ Risk alerts based on sentiment changes
* 📉 Early detection of negative market signals
* 📊 AI-driven investment insights

### User Experience

* 🔍 AI-powered search and filtering
* 📊 Interactive charts and dashboards
* 📱 Modern responsive UI

---

# 🧰 Tech Stack

### Frontend

* React.js
* Vite
* TypeScript
* Tailwind CSS
* ShadCN UI

### Backend (Current)

* Python
* Requests
* BeautifulSoup
* HuggingFace Transformers
* FinBERT sentiment model
* PyTorch

### Backend (Planned)

* Node.js
* Express.js

### Database (Planned)

* MongoDB

### AI / ML

* Python
* Pandas
* Scikit-learn
* NLP models for sentiment analysis

---

# 🏗 Architecture Overview

The project currently works with a **data pipeline architecture**.

```
News Source (MoneyControl)
        │
        ▼
Python Scraper
(scrapper.py)
        │
        ▼
Raw News Dataset
(raw_news.json)
        │
        ▼
FinBERT Sentiment Analysis
(compute_sentiments.py)
        │
        ▼
Processed News Dataset
(src/data/news.json)
        │
        ▼
React Dashboard
```

---

# 📂 Project Structure

```
data-insight-academy
│
├── backend
│   ├── scrapper.py
│   ├── compute_sentiments.py
│   ├── raw_news.json
│   └── venv
│
├── src
│   ├── components
│   ├── pages
│   └── data
│       └── news.json
│
├── public
├── api
├── package.json
└── README.md
```

Important directories:

**backend/**
Contains scraping scripts and sentiment analysis pipeline.

**src/data/**
Contains processed news data used by the frontend.

---

# ⚙️ Installation

Clone the repository.

```
git clone <repository-url>
cd data-insight-academy
```

Install frontend dependencies.

```
npm install
```

---

# 🐍 Backend Setup

Move to backend directory.

```
cd backend
```

Create a virtual environment.

```
python -m venv venv
```

Activate it.

PowerShell:

```
venv\Scripts\Activate.ps1
```

---

# 📦 Install Python Dependencies

Install scraping libraries.

```
pip install requests beautifulsoup4
```

Install NLP libraries.

```
pip install transformers tqdm
```

Install PyTorch (CPU version).

```
pip install torch --index-url https://download.pytorch.org/whl/cpu
```

---

# 📰 Run the News Scraper

Inside the backend directory:

```
python scrapper.py
```

This script:

* Scrapes financial news
* Extracts article content
* Saves results to

```
backend/raw_news.json
```

---

# 🤖 Run Sentiment Analysis

Run the sentiment processing script.

```
python compute_sentiments.py
```

The script:

1. Loads the **FinBERT model**
2. Analyzes sentiment for each article
3. Labels each article as:

* Positive
* Neutral
* Negative

Output is saved to:

```
src/data/news.json
```

---

# 🖥 Running the Frontend

Return to the root directory.

```
cd ..
```

Start the development server.

```
npm run dev
```

Application runs at:

```
http://localhost:8080
```

---

# 🔄 Typical Development Workflow

When updating news data:

Step 1 — Scrape news

```
cd backend
python scrapper.py
```

Step 2 — Run sentiment analysis

```
python compute_sentiments.py
```

Step 3 — Start frontend

```
cd ..
npm run dev
```

---

# 🤖 AI Model Used

The system uses:

**FinBERT – Financial Sentiment Analysis Model**

FinBERT is a BERT-based model fine-tuned specifically for financial text.
It provides significantly better sentiment detection for financial news compared to general NLP models.

---

# 📌 Project Status

```
✔ Project Setup
✔ News Scraper
✔ Sentiment Analysis Pipeline
✔ Frontend Dashboard Base
⬜ Frontend UI Improvements
⬜ Backend API Layer
⬜ Database Integration
⬜ Real-Time Market Data
⬜ AI Prediction Models
⬜ Risk Detection System
⬜ Deployment
```

---

# ⚠️ Known Warnings

Browserslist outdated message

```
npx update-browserslist-db@latest
```

HuggingFace symlink warning on Windows
This occurs if Developer Mode is disabled. It does not affect functionality.

---

# 🔮 Future Improvements

Possible future extensions:

* Real-time market APIs
* News aggregation from multiple sources
* AI-based trend detection
* Automated scheduled scraping
* Database storage instead of JSON
* Dockerized deployment
* Cloud deployment pipeline

---


These things make projects look **10× more professional to recruiters.**
