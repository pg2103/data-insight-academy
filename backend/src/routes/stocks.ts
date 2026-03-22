import express from 'express';
import {
  getMarketSnapshot,
  getStockDetails,
  searchMarket,
  testAngelSession,
} from '../services/angelOneService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.json({
    message: 'Stocks route is working',
    provider: 'Angel One SmartAPI',
  });
});

router.get('/debug/session', async (_req, res, next) => {
  try {
    const data = await testAngelSession();
    res.json(data);
  } catch (error) {
    next(error);
  }
});

router.get('/market', async (req, res, next) => {
  try {
    const group = String(req.query.group || 'all');
    const data = await getMarketSnapshot(group);
    res.json(data);
  } catch (error) {
    next(error);
  }
});

router.get('/search', async (req, res, next) => {
  try {
    const q = String(req.query.q || '').trim();

    if (!q) {
      return res.json({
        fetchedAt: new Date().toISOString(),
        total: 0,
        stocks: [],
      });
    }

    const data = await searchMarket(q);
    res.json(data);
  } catch (error) {
    next(error);
  }
});

router.get('/:symbol', async (req, res, next) => {
  try {
    const symbol = String(req.params.symbol || '').trim();
    const range = String(req.query.range || '1mo');

    const data = await getStockDetails(symbol, range);
    res.json(data);
  } catch (error) {
    next(error);
  }
});

export default router;