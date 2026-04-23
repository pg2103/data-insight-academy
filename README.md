# StockAI

StockAI is a hybrid financial analytics platform that combines a news sentiment pipeline with live stock market data. The news side collects business articles from Moneycontrol, processes them with FinBERT, and stores the result as JSON for the frontend. The stock side is API-driven and fetches Indian market data through Angel One SmartAPI. The frontend provides interactive pages for news, learning content, and stock exploration.

---

## Overview

The project has two main data flows:

### 1. News pipeline

* Backend triggers a Python pipeline when the server starts.
* Scrapes Moneycontrol business news.
* Runs FinBERT sentiment analysis.
* Saves output to `src/data/news.json`.
* Frontend reads this JSON directly.

### 2. Stock data system

* Backend exposes APIs for stock data.
* Uses Angel One SmartAPI.
* Frontend fetches live stock data via API.

---

## Tech Stack

### Frontend

* React
* TypeScript
* Vite
* Tailwind CSS
* ShadCN UI
* React Router
* Recharts
* Clerk Authentication

### Backend

* Node.js
* Express.js
* TypeScript
* Helmet, CORS, Morgan
* Compression & Rate Limiting
* Child Process (Python execution)

### Data & AI

* Python
* BeautifulSoup
* Requests
* HuggingFace Transformers
* FinBERT
* Angel One SmartAPI
* In-memory caching

---

## Architecture

```text
News Flow
Moneycontrol → Python Scraper → FinBERT → news.json → Frontend

Stock Flow
Frontend → Backend API → Angel One → Live Data → Frontend UI
```

---

## Features

### News

* Scraping from Moneycontrol
* Sentiment analysis (FinBERT)
* Filters (source, topic, sentiment)
* Sorting (latest, positive, negative)
* Article preview + external links

### Stocks

* Live Indian stock data
* Market groups (Nifty, Sensex, etc.)
* Search functionality
* Stock detail charts
* Watchlist support

### Learning Page

* Static modules UI
* Clean structured layout
* Protected using Clerk

### Authentication

* Clerk (frontend only)
* Protected routes: News, Learn, Stocks

---

## Backend API

### Basic

* `/` → status
* `/health` → health check
* `/api` → API info

### News

* `/api/news`
* `/api/news/refresh`

### Stocks

* `/api/stocks`
* `/api/stocks/market`
* `/api/stocks/search`
* `/api/stocks/:symbol`
* `/api/stocks/debug/session`

---

## How It Works

### News Pipeline

* Runs automatically on backend start
* Runs again every 30 minutes
* Can be triggered manually
* Saves processed data to JSON

### Stock System

* Backend fetches live data from Angel One
* Handles:

  * authentication
  * rate limiting
  * caching
  * batching

### Frontend

* News → reads JSON file
* Stocks → calls backend APIs
* Learn → static content

---

## Project Structure

```text
.
├── backend
│   ├── src
│   │   ├── server.ts            # Main backend server (runs pipeline + APIs)
│   │   ├── routes
│   │   │   ├── news.ts          # News endpoints
│   │   │   └── stocks.ts        # Stock APIs (Angel One)
│   │   ├── services
│   │   │   ├── angelOneService.ts  # Market data logic
│   │   │   └── stockService.ts     # Stock utilities + processing
│   │   ├── middleware           # Rate limiting, validation
│   │   └── config
│   │       └── stockUniverse.ts # Stock groups (Nifty, Sensex, etc.)
│   │
│   ├── scrapper.py             # News scraping (Moneycontrol)
│   ├── compute_sentiments.py   # FinBERT sentiment analysis
│   ├── run_pipeline.py         # Runs full pipeline (scrape + sentiment)
│   ├── requirements.txt        # Python dependencies
│   └── venv                    # Python virtual environment
│
├── src (Frontend)
│   ├── pages
│   │   ├── News.tsx            # News UI (reads JSON)
│   │   ├── StockList.tsx       # Market overview
│   │   ├── StockDetails.tsx    # Stock detail + charts
│   │   └── Learn.tsx           # Learning modules
│   │
│   ├── data
│   │   ├── news.json           # Processed news (pipeline output)
│   │   ├── stockData.ts        # API integration (frontend)
│   │   └── modulesData.ts      # Learning content
│   │
│   ├── components             # Reusable UI components
│   └── hooks                  # Custom React hooks
│
├── public/assets              # Static files (videos, images, PDFs)
├── package.json               # Frontend config
└── README.md
```

---

## ⚙️ Getting Started (Run Locally)

### 1. Clone the Repository

```bash
git clone <your-repo-url>
cd data-insight-academy
```

---

### 2. Install Frontend Dependencies

```bash
npm install
```

---

### 3. Setup Python (Only First Time)

Go to backend:

```bash
cd backend
```

Create virtual environment:

```bash
python -m venv venv
```

Activate it:

**Windows (PowerShell):**

```bash
venv\Scripts\Activate.ps1
```

Install Python libraries:

```bash
pip install requests beautifulsoup4 transformers tqdm
pip install torch --index-url https://download.pytorch.org/whl/cpu
```

👉 This step is required only once.

---

### 4. Start Backend

```bash
npm run dev
```

This will:

* Start backend server (port 8000)
* Run news pipeline automatically
* Refresh every 30 minutes

---

### 5. Start Frontend (New Terminal)

```bash
cd data-insight-academy
npm run dev
```

Frontend runs at:

```
http://localhost:8080
```

---

## 🔄 How to Use

* Start backend first → required for stocks + news pipeline
* Start frontend → UI loads
* News page → uses processed JSON
* Stocks page → fetches live API data

---

## Notes

* Python setup is required only once
* After setup → just run `npm run dev`
* No database used (file-based system)
* Backend must run for stock features
* No deployment configured yet

---
