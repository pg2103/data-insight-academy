import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import dotenv from 'dotenv';
import { generalLimiter } from './middleware/rateLimiting';
import { exec } from 'child_process';
import path from 'path';

// import newsRoutes from './routes/news';
import stocksRoutes from './routes/stocks';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 8000;

// ===============================
// 🛡️ MIDDLEWARE
// ===============================
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

// ===============================
// 📡 ROUTES
// ===============================
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

// ===============================
// ❌ 404 HANDLER
// ===============================
app.use('*', (req, res) => {
  res.status(404).json({
    error: 'Route not found',
    path: req.originalUrl,
  });
});

// ===============================
// ⚠️ ERROR HANDLER
// ===============================
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

// ===============================
// 🔥 PIPELINE FUNCTION
// ===============================
const runPipeline = () => {
  const backendPath = path.resolve(__dirname, '..');

  // 👉 Use venv python (VERY IMPORTANT)
  const pythonPath = path.join(
    backendPath,
    'venv',
    'Scripts',
    'python.exe'
  );

  console.log('⚡ Running news pipeline...');

  exec(`"${pythonPath}" run_pipeline.py`, { cwd: backendPath }, (error, stdout, stderr) => {
    if (error) {
      console.error(`❌ Pipeline Error: ${error.message}`);
      return;
    }

    if (stderr) {
      console.warn(`⚠️ Pipeline Warning: ${stderr}`);
    }

    console.log(`✅ Pipeline Output:\n${stdout}`);
  });
};

// ===============================
// 🚀 SERVER START
// ===============================
const server = app.listen(PORT, () => {
  console.log(`🚀 Financial API Server Running on http://localhost:${PORT}`);
  console.log(`📍 Health: http://localhost:${PORT}/health`);
  console.log(`📍 API: http://localhost:${PORT}/api`);
  console.log(`📍 Stocks: http://localhost:${PORT}/api/stocks`);

  // 🔥 Run once at startup
  runPipeline();

  // 🔁 Auto refresh every 30 minutes
  setInterval(() => {
    console.log('🔄 Refreshing news data...');
    runPipeline();
  }, 1000 * 60 * 30);
});

// ===============================
// 🛑 GRACEFUL SHUTDOWN
// ===============================
const gracefulShutdown = (signal: string) => {
  console.log(`${signal} received. Shutting down...`);
  server.close(() => process.exit(0));
};

process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

export default app;