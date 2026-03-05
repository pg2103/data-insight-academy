import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import dotenv from 'dotenv';
import { generalLimiter } from './middleware/rateLimiting';

// ✅ Keep only the routes you actually use
import newsRoutes from './routes/news';
import stocksRoutes from './routes/stocks';

// Load environment variables
dotenv.config();

const app = express();
const PORT = process.env.PORT || 8000;

/* ================================
   Security Middleware
================================ */
app.use(
  helmet({
    crossOriginEmbedderPolicy: false,
  })
);

/* ================================
   CORS
================================ */
app.use(
  cors({
    origin:
      process.env.NODE_ENV === 'production'
        ? ['https://your-frontend-domain.com'] // change later
        : [
            'http://localhost:3000',
            'http://localhost:5173',
            'http://localhost:8080',
          ],
    credentials: true,
  })
);

/* ================================
   Body Parsers
================================ */
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

/* ================================
   Performance + Logging
================================ */
app.use(compression());
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

/* ================================
   Rate Limiting
================================ */
app.use(generalLimiter);

/* ================================
   Health Check (FIXED — no DB)
================================ */
app.get('/health', (req, res) => {
  res.json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    environment: process.env.NODE_ENV || 'development',
    services: {
      api: 'running',
    },
  });
});

/* ================================
   API Info
================================ */
app.get('/api', (req, res) => {
  res.json({
    name: 'Financial Sentiment Analysis API',
    version: '1.0.0',
    endpoints: {
      news: '/api/news',
      stocks: '/api/stocks',
    },
    status: 'operational',
    timestamp: new Date().toISOString(),
  });
});

/* ================================
   API Routes (ONLY WHAT YOU USE)
================================ */
app.use('/api/news', newsRoutes);
app.use('/api/stocks', stocksRoutes);

/* ================================
   404 Handler
================================ */
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Route not found',
    path: req.originalUrl,
  });
});

/* ================================
   Global Error Handler
================================ */
app.use(
  (
    error: Error & { status?: number },
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) => {
    console.error('Unhandled error:', error);

    const isDev = process.env.NODE_ENV !== 'production';

    res.status(error.status || 500).json({
      error: error.message || 'Internal server error',
      ...(isDev && { stack: error.stack }),
      timestamp: new Date().toISOString(),
    });
  }
);

/* ================================
   Start Server
================================ */
const server = app.listen(PORT, () => {
  console.log(`
🚀 Financial API Server Running
🌐 Environment: ${process.env.NODE_ENV || 'development'}
🎯 Port: ${PORT}
📍 Base URL: http://localhost:${PORT}

Available Endpoints:
- News:   http://localhost:${PORT}/api/news
- Stocks: http://localhost:${PORT}/api/stocks
- Health: http://localhost:${PORT}/health
  `);
});

/* ================================
   Graceful Shutdown
================================ */
const gracefulShutdown = (signal: string) => {
  console.log(`${signal} received. Shutting down...`);
  server.close(() => process.exit(0));
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

export default app;