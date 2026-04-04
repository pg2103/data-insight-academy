import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import compression from 'compression';
import dotenv from 'dotenv';
import { generalLimiter } from './middleware/rateLimiting';
import { exec } from 'child_process';
import path from 'path';
import fs from 'fs';

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
// 📡 BASIC ROUTES
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
  });
});

app.get('/api', (_req, res) => {
  res.json({
    name: 'Financial Sentiment API',
    version: '1.0.0',
    endpoints: {
      news: '/api/news',
      refresh: '/api/news/refresh',
      stocks: '/api/stocks',
    },
  });
});

// ===============================
// 🔥 READ NEWS (IMPORTANT)
// ===============================
app.get('/api/news', (_req, res) => {
  try {
    const filePath = path.join(__dirname, '..', 'src', 'data', 'news.json');

    const raw = fs.readFileSync(filePath, 'utf-8');
    const data = JSON.parse(raw);

    res.json(data);
  } catch (err) {
    console.error('❌ Failed to read news.json', err);
    res.status(500).json({ error: 'Failed to load news' });
  }
});

// ===============================
// 🔥 REFRESH NEWS (IMPORTANT)
// ===============================
app.get('/api/news/refresh', (_req, res) => {
  const backendPath = path.resolve(__dirname, '..');

  const pythonPath = path.join(
    backendPath,
    'venv',
    'Scripts',
    'python.exe'
  );

  console.log('🔄 Running pipeline manually...');

  exec(`python run_pipeline.py`, { cwd: backendPath }, (error, stdout, stderr) => {
  console.log("PIPELINE OUTPUT:\n", stdout);
  console.log("PIPELINE ERROR:\n", stderr);

  if (error) {
    console.error("❌ Pipeline failed:", error.message);
    return;
  }
  });
});

// ===============================
// OTHER ROUTES
// ===============================
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
app.use((error: any, _req: any, res: any, _next: any) => {
  console.error('Unhandled error:', error);

  res.status(500).json({
    error: error.message || 'Internal server error',
  });
});

// ===============================
// 🚀 SERVER START
// ===============================
const server = app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);

  // run once
  runPipeline();

  // auto refresh every 30 min
  setInterval(runPipeline, 1000 * 60 * 30);
});

// ===============================
// 🔥 PIPELINE FUNCTION
// ===============================
function runPipeline() {
  const backendPath = path.resolve(__dirname, '..');

  const pythonPath = path.join(
    backendPath,
    'venv',
    'Scripts',
    'python.exe'
  );

  console.log('⚡ Running news pipeline...');

  exec(`"${pythonPath}" run_pipeline.py`, { cwd: backendPath }, (error, stdout, stderr) => {
    if (error) {
      console.error('❌ Pipeline error:', error.message);
      return;
    }

    if (stderr) {
      console.warn('⚠️ Pipeline warning:', stderr);
    }

    console.log(stdout);
  });
}

// ===============================
// 🛑 SHUTDOWN
// ===============================
process.on('SIGINT', () => {
  console.log('Shutting down...');
  server.close(() => process.exit(0));
});

export default app;