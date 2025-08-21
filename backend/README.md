# Financial Sentiment Analysis Backend API

A comprehensive Node.js/Express.js backend API for financial sentiment analysis, real-time stock data, and news aggregation. Built with TypeScript and integrated with Supabase for authentication and data management.

## 🚀 Features

- **Authentication & Authorization**: Supabase-based user management with JWT tokens
- **Sentiment Analysis**: Advanced text sentiment analysis with financial-specific lexicon
- **Stock Market Data**: Real-time quotes, historical data, and technical indicators
- **News Aggregation**: Financial news from multiple sources with sentiment analysis
- **Rate Limiting**: Comprehensive API protection and usage controls
- **Caching**: Intelligent caching for improved performance
- **TypeScript**: Full type safety and modern development experience

## 📦 Tech Stack

- **Runtime**: Node.js 18+
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth
- **External APIs**: Yahoo Finance, News API, Finnhub, Alpha Vantage
- **Caching**: Node-cache
- **Validation**: Express-validator
- **Security**: Helmet, CORS, Rate limiting

## 🛠️ Installation

1. **Clone and navigate to backend directory**:
   ```bash
   cd backend
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Environment setup**:
   ```bash
   cp .env.example .env
   ```

4. **Configure environment variables** in `.env`:
   ```env
   # Server Configuration
   PORT=8000
   NODE_ENV=development

   # Supabase Configuration (already configured)
   SUPABASE_URL=https://pctmqfscaeybkyrohnwu.supabase.co
   SUPABASE_ANON_KEY=your_anon_key
   SUPABASE_SERVICE_ROLE_KEY=your_service_key

   # External API Keys (optional but recommended)
   NEWS_API_KEY=your_news_api_key
   FINNHUB_API_KEY=your_finnhub_key
   ALPHA_VANTAGE_API_KEY=your_alpha_vantage_key
   ```

5. **Build and start the server**:
   ```bash
   # Development mode
   npm run dev

   # Production build
   npm run build
   npm start
   ```

## 🔧 API Keys Setup

### Required External Services

1. **News API** (newsapi.org):
   - Sign up for free account
   - Get API key
   - Add to `NEWS_API_KEY` in `.env`

2. **Finnhub** (finnhub.io):
   - Create free account
   - Get API token
   - Add to `FINNHUB_API_KEY` in `.env`

3. **Alpha Vantage** (alphavantage.co) - Optional:
   - Register for free API key
   - Add to `ALPHA_VANTAGE_API_KEY` in `.env`

### Service Role Key for Supabase

1. Go to your Supabase project dashboard
2. Navigate to Settings > API
3. Copy the `service_role` key (not the `anon` key)
4. Add it to `SUPABASE_SERVICE_ROLE_KEY` in `.env`

## 📡 API Endpoints

### Authentication (`/api/auth`)
- `GET /profile` - Get user profile
- `PUT /profile` - Update user profile
- `DELETE /account` - Delete user account
- `GET /stats` - Get user statistics
- `GET /verify` - Verify authentication

### Sentiment Analysis (`/api/sentiment`)
- `POST /analyze` - Analyze single text sentiment
- `POST /analyze-batch` - Analyze multiple texts
- `POST /trends` - Analyze sentiment trends
- `GET /stats/:symbol` - Get sentiment stats for symbol
- `POST /compare` - Compare sentiment across symbols
- `GET /history` - Get user's analysis history

### News (`/api/news`)
- `GET /` - Get financial news with filters
- `GET /top` - Get top financial stories
- `GET /search` - Search news articles
- `GET /symbol/:symbol` - Get news for specific stock
- `GET /trending` - Get trending symbols
- `POST /analyze-sentiment` - Analyze news sentiment
- `GET /market-sentiment` - Get market sentiment summary

### Stocks (`/api/stocks`)
- `GET /quote/:symbol` - Get real-time quote
- `POST /quotes` - Get multiple quotes
- `GET /history/:symbol` - Get historical data
- `GET /profile/:symbol` - Get company profile
- `GET /search` - Search stocks
- `GET /market-summary` - Get market overview
- `GET /indicators/:symbol` - Get technical indicators
- `POST /compare` - Compare stock performance
- `GET /stats/:symbol` - Get stock statistics

### System
- `GET /health` - Health check
- `GET /api` - API information

## 🔐 Authentication

The API uses Supabase authentication with JWT tokens. Include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

Some endpoints allow optional authentication (will work without token but may have limited features).

## 📊 Response Format

All API responses follow this structure:

```json
{
  "success": true,
  "data": {
    // Response data here
  },
  "message": "Optional message",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

Error responses:

```json
{
  "error": "Error message",
  "message": "Detailed error description",
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

## 🚦 Rate Limiting

- **General API**: 100 requests per 15 minutes
- **Data Fetching**: 60 requests per minute
- **News API**: 30 requests per minute
- **Sentiment Analysis**: 20 requests per minute
- **Strict Operations**: 5 requests per 15 minutes

## 🗄️ Database Schema

The backend uses your existing Supabase database with the `profiles` table:

```sql
profiles (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id),
  email TEXT,
  full_name TEXT,
  avatar_url TEXT,
  role TEXT DEFAULT 'user',
  created_at TIMESTAMP,
  updated_at TIMESTAMP
)
```

## 🧪 Development

### Available Scripts

```bash
npm run dev       # Start development server with hot reload
npm run build     # Build TypeScript to JavaScript
npm start         # Start production server
npm run lint      # Run ESLint
npm run lint:fix  # Fix ESLint issues
npm test          # Run tests (when implemented)
```

### Project Structure

```
backend/
├── src/
│   ├── config/          # Configuration files
│   ├── middleware/      # Express middleware
│   ├── routes/          # API route handlers
│   ├── services/        # Business logic services
│   └── server.ts        # Main server file
├── dist/                # Built JavaScript files
├── package.json
├── tsconfig.json
├── .env
└── README.md
```

## 🚀 Deployment

### Environment Variables for Production

```env
NODE_ENV=production
PORT=8000
SUPABASE_URL=your_production_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_production_service_key
# ... other production API keys
```

### Docker Deployment (Optional)

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production
COPY dist ./dist
EXPOSE 8000
CMD ["npm", "start"]
```

## 🔍 Monitoring & Logging

- Health check endpoint: `GET /health`
- Structured logging with Morgan
- Error tracking and reporting
- Performance monitoring with caching

## 🤝 Contributing

1. Fork the repository
2. Create feature branch
3. Make changes with proper TypeScript types
4. Add tests if applicable
5. Submit pull request

## 📝 License

MIT License - feel free to use this code for your projects.

## 🆘 Support

- Check the `/health` endpoint for system status
- Review logs for error details
- Ensure all environment variables are properly set
- Verify external API keys are valid and have sufficient quotas

---

**Note**: This backend is designed to work seamlessly with your existing Supabase authentication setup. Make sure to update the CORS origins in production to match your frontend domain.