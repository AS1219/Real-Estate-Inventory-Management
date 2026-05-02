import express from 'express';
import db from '../db.js';

const router = express.Router();

router.get('/', (req, res) => {
  const projectId = req.query.projectId as string | undefined;
  const status = req.query.status as string | undefined;

  let query = `SELECT f.id, f.number, f.floor, f.type, f.area, f.price, f.status,
                      f.assigned_agent AS assignedAgent, f.buyer_name AS buyerName,
                      f.buyer_contact AS buyerContact, f.last_updated AS lastUpdated,
                      f.position_x AS position_x, f.position_y AS position_y,
                      f.position_width AS position_width, f.position_height AS position_height,
                      b.name AS buildingName, p.name AS projectName,
                      f.project_id AS projectId, f.building_id AS buildingId
               FROM flats f
               JOIN buildings b ON f.building_id = b.id
               JOIN projects p ON f.project_id = p.id`;
  const conditions: string[] = [];
  const params: any[] = [];

  if (projectId) {
    conditions.push('f.project_id = ?');
    params.push(projectId);
  }

  if (status) {
    conditions.push('f.status = ?');
    params.push(status);
  }

  if (conditions.length > 0) {
    query += ' WHERE ' + conditions.join(' AND ');
  }

  query += ' ORDER BY p.name, b.name, f.floor, f.number';

  const flats = db.prepare(query).all(...params);
  res.json({ data: flats });
});

router.get('/:id', (req, res) => {
  const flat = db.prepare(
    `SELECT f.id, f.number, f.floor, f.type, f.area, f.price, f.status,
            f.assigned_agent AS assignedAgent, f.buyer_name AS buyerName,
            f.buyer_contact AS buyerContact, f.last_updated AS lastUpdated,
            f.position_x AS position_x, f.position_y AS position_y,
            f.position_width AS position_width, f.position_height AS position_height,
            b.name AS buildingName, p.name AS projectName,
            f.project_id AS projectId, f.building_id AS buildingId
     FROM flats f
     JOIN buildings b ON f.building_id = b.id
     JOIN projects p ON f.project_id = p.id
     WHERE f.id = ?`
  ).get(req.params.id);

  if (!flat) {
    return res.status(404).json({ error: 'Flat not found' });
  }

  res.json({ data: flat });
});

router.put('/:id', (req, res) => {
  const { status } = req.body;

  if (!status) {
    return res.status(400).json({ error: 'Missing status' });
  }

  const flat = db.prepare('SELECT id FROM flats WHERE id = ?').get(req.params.id);

  if (!flat) {
    return res.status(404).json({ error: 'Flat not found' });
  }

  db.prepare('UPDATE flats SET status = ?, updated_at = ? WHERE id = ?').run(status, new Date().toISOString(), req.params.id);

  const updatedFlat = db.prepare('SELECT * FROM flats WHERE id = ?').get(req.params.id);
  res.json({ data: updatedFlat });
});

export default router;
