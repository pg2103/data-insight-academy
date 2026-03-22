import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import dotenv from 'dotenv';
import { generalLimiter } from './middleware/rateLimiting';

// import newsRoutes from './routes/news';
import stocksRoutes from './routes/stocks';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 8000;

app.use(
  helmet({
    crossOriginEmbedderPolicy: false,
  })
);

app.use(
  cors({
    origin:
      process.env.NODE_ENV === 'production'
        ? ['https://your-frontend-domain.com']
        : [
            'http://localhost:3000',
            'http://localhost:5173',
            'http://localhost:8080',
          ],
    credentials: true,
  })
);

app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

app.use(compression());
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev'));

app.use(generalLimiter);

app.get('/', (_req, res) => {
  res.json({
    message: 'Backend server is running',
    port: PORT,
    status: 'ok',
  });
});

app.get('/health', (_req, res) => {
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

app.get('/api', (_req, res) => {
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

// app.use('/api/news', newsRoutes);
app.use('/api/stocks', stocksRoutes);

app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Route not found',
    path: req.originalUrl,
  });
});

app.use(
  (
    error: Error & { status?: number },
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction
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

const server = app.listen(PORT, () => {
  console.log(`🚀 Financial API Server Running on http://localhost:${PORT}`);
  console.log(`📍 Health: http://localhost:${PORT}/health`);
  console.log(`📍 API: http://localhost:${PORT}/api`);
  console.log(`📍 Stocks: http://localhost:${PORT}/api/stocks`);
});

const gracefulShutdown = (signal: string) => {
  console.log(`${signal} received. Shutting down...`);
  server.close(() => process.exit(0));
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

export default app;