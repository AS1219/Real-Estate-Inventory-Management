import express from 'express';
import db from '../db.js';

const router = express.Router();

router.get('/', (_req, res) => {
  const salesByFloor = db.prepare(
    `SELECT floor_range AS floor, sold, available, blocked FROM analytics_floor_sales ORDER BY id`
  ).all();

  const revenueByBuilding = db.prepare(
    `SELECT name, revenue FROM analytics_revenue_by_building ORDER BY id`
  ).all();

  const salesTrends = db.prepare(
    `SELECT month, sales FROM analytics_sales_trends ORDER BY id`
  ).all();

  res.json({ data: { salesByFloor, revenueByBuilding, salesTrends } });
});

export default router;
