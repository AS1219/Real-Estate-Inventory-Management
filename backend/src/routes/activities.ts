import express from 'express';
import db from '../db.js';

const router = express.Router();

router.get('/', (_req, res) => {
  const activities = db.prepare(
    `SELECT id, type, flat_number AS flatNumber, agent_name AS agentName,
            project_name AS projectName, timestamp
     FROM activities ORDER BY timestamp DESC`
  ).all();

  res.json({ data: activities });
});

router.post('/', (req, res) => {
  const { type, flatNumber, agentName, projectName, timestamp } = req.body;

  if (!type || !flatNumber || !agentName || !projectName || !timestamp) {
    return res.status(400).json({ error: 'Missing required activity fields' });
  }

  const now = new Date().toISOString();
  const id = `act-${Date.now()}`;

  db.prepare(
    `INSERT INTO activities (id, type, flat_number, agent_name, project_name, timestamp, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`
  ).run(id, type, flatNumber, agentName, projectName, timestamp, now, now);

  res.status(201).json({ data: { id, type, flatNumber, agentName, projectName, timestamp } });
});

export default router;
