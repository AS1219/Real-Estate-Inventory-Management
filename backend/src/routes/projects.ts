import express from 'express';
import db from '../db.js';

const router = express.Router();

const now = () => new Date().toISOString();
const agents = ['Rahul Sharma', 'Priya Patel', 'Amit Kumar', 'Sneha Gupta', 'Vikram Singh'];
const buyers = ['Mr. Agarwal', 'Ms. Reddy', 'Mr. Singh', 'Mrs. Nair', 'Ms. Joshi'];

function generateProjectBuildings(projectId: string, buildingCount: number, statuses: string[]) {
  const buildings = [];
  const flatsPerBuilding = 40;
  let statusIndex = 0;

  for (let i = 0; i < buildingCount; i++) {
    const buildingId = `building-${projectId}-${i + 1}`;
    const buildingStatuses = statuses.slice(statusIndex, statusIndex + flatsPerBuilding);
    statusIndex += flatsPerBuilding;

    const available = buildingStatuses.filter((status) => status === 'available').length;
    const blocked = buildingStatuses.filter((status) => status === 'blocked').length;
    const sold = buildingStatuses.filter((status) => status === 'sold').length;

    buildings.push({
      id: buildingId,
      projectId,
      name: `Tower ${String.fromCharCode(65 + i)}`,
      floors: 10,
      totalFlats: flatsPerBuilding,
      availableFlats: available,
      blockedFlats: blocked,
      soldFlats: sold,
    });
  }

  return buildings;
}

function getStatusList(totalUnits: number, sold: number, blocked: number) {
  const statuses: string[] = [];
  const available = totalUnits - sold - blocked;
  for (let i = 0; i < sold; i++) statuses.push('sold');
  for (let i = 0; i < blocked; i++) statuses.push('blocked');
  for (let i = 0; i < available; i++) statuses.push('available');
  return statuses;
}

function generateFlats(projectId: string, buildingId: string, statusSlice: string[]) {
  const flats = [];
  const statuses = statusSlice;

  for (let floor = 1; floor <= 10; floor++) {
    for (let i = 0; i < 4; i++) {
      const index = (floor - 1) * 4 + i;
      const status = statuses[index] ?? 'available';
      flats.push({
        id: `flat-${projectId}-${buildingId}-${floor}-${i + 1}`,
        projectId,
        buildingId,
        number: `${floor}0${i + 1}`,
        floor,
        type: i % 2 === 0 ? '2BHK' : '3BHK',
        area: i % 2 === 0 ? 1200 : 1650,
        price: (i % 2 === 0 ? 8500000 : 12500000) + (floor * 100000),
        status,
        assignedAgent: status !== 'available' ? agents[index % agents.length] : null,
        buyerName: status === 'sold' ? buyers[index % buyers.length] : null,
        buyerContact: status === 'sold' ? `+91 9${Math.floor(100000000 + Math.random() * 900000000)}` : null,
        lastUpdated: new Date(Date.now() - Math.random() * 10000000000).toISOString(),
        position_x: (i % 2) * 250 + 50,
        position_y: Math.floor(i / 2) * 180 + 50,
        position_width: 200,
        position_height: 150,
      });
    }
  }

  return flats;
}

router.get('/', (_req, res) => {
  const projects = db.prepare(
    `SELECT id, name, location, description, image_url AS imageUrl, start_date AS startDate,
            total_units AS totalUnits, available_units AS availableUnits,
            blocked_units AS blockedUnits, sold_units AS soldUnits
     FROM projects ORDER BY name`
  ).all();

  res.json({ data: projects });
});

router.get('/:id', (req, res) => {
  const project = db.prepare(
    `SELECT id, name, location, description, image_url AS imageUrl, start_date AS startDate,
            total_units AS totalUnits, available_units AS availableUnits,
            blocked_units AS blockedUnits, sold_units AS soldUnits
     FROM projects WHERE id = ?`
  ).get(req.params.id);

  if (!project) {
    return res.status(404).json({ error: 'Project not found' });
  }

  const buildings = db.prepare(
    `SELECT id, project_id AS projectId, name, floors, total_flats AS totalFlats,
            available_flats AS availableFlats, blocked_flats AS blockedFlats, sold_flats AS soldFlats
     FROM buildings WHERE project_id = ? ORDER BY name`
  ).all(req.params.id);

  res.json({ data: { ...project, buildings } });
});

router.post('/', (req, res) => {
  const {
    name,
    location,
    description,
    imageUrl,
    startDate,
    buildingCount,
    availableUnits,
    blockedUnits,
    soldUnits
  } = req.body;

  if (!name || !location || !description || !imageUrl || !startDate || !buildingCount) {
    return res.status(400).json({ error: 'Missing required project fields' });
  }

  const totalUnits = buildingCount * 40;
  const available = Number(availableUnits ?? 0);
  const blocked = Number(blockedUnits ?? 0);
  const sold = Number(soldUnits ?? 0);

  if (available + blocked + sold !== totalUnits) {
    return res.status(400).json({ error: 'Project totals must equal total units' });
  }

  const id = `project-${Date.now()}`;
  const createdAt = now();
  const updatedAt = createdAt;
  const statusList = getStatusList(totalUnits, sold, blocked);

  const buildings = generateProjectBuildings(id, buildingCount, statusList);
  const flatStatuses = [...statusList];
  const flats = buildings.flatMap((building, buildingIndex) => {
    const start = buildingIndex * 40;
    return generateFlats(id, building.id, flatStatuses.slice(start, start + 40));
  });

  const insertProject = db.prepare(
    `INSERT INTO projects (id, name, location, description, image_url, start_date, total_units,
      available_units, blocked_units, sold_units, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  );

  const insertBuilding = db.prepare(
    `INSERT INTO buildings (id, project_id, name, floors, total_flats, available_flats,
      blocked_flats, sold_flats, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  );

  const insertFlat = db.prepare(
    `INSERT INTO flats (id, project_id, building_id, number, floor, type, area, price, status,
      assigned_agent, buyer_name, buyer_contact, last_updated, position_x, position_y,
      position_width, position_height, created_at, updated_at)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  );

  const transaction = db.transaction(() => {
    insertProject.run(id, name, location, description, imageUrl, startDate, totalUnits, available, blocked, sold, createdAt, updatedAt);
    buildings.forEach((building) => {
      insertBuilding.run(
        building.id,
        id,
        building.name,
        building.floors,
        building.totalFlats,
        building.availableFlats,
        building.blockedFlats,
        building.soldFlats,
        createdAt,
        updatedAt
      );
    });
    flats.forEach((flat) => {
      insertFlat.run(
        flat.id,
        flat.projectId,
        flat.buildingId,
        flat.number,
        flat.floor,
        flat.type,
        flat.area,
        flat.price,
        flat.status,
        flat.assignedAgent,
        flat.buyerName,
        flat.buyerContact,
        flat.lastUpdated,
        flat.position_x,
        flat.position_y,
        flat.position_width,
        flat.position_height,
        createdAt,
        updatedAt
      );
    });
  });

  try {
    transaction();
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Unable to create project' });
  }

  res.status(201).json({
    data: {
      id,
      name,
      location,
      description,
      imageUrl,
      startDate,
      totalUnits,
      availableUnits: available,
      blockedUnits: blocked,
      soldUnits: sold,
      buildings
    }
  });
});

router.put('/:id', (req, res) => {
  const { name, location, description, imageUrl, startDate, availableUnits, blockedUnits, soldUnits } = req.body;
  const project = db.prepare('SELECT id FROM projects WHERE id = ?').get(req.params.id);

  if (!project) {
    return res.status(404).json({ error: 'Project not found' });
  }

  const update = db.prepare(
    `UPDATE projects
     SET name = COALESCE(?, name), location = COALESCE(?, location), description = COALESCE(?, description),
         image_url = COALESCE(?, image_url), start_date = COALESCE(?, start_date),
         available_units = COALESCE(?, available_units), blocked_units = COALESCE(?, blocked_units),
         sold_units = COALESCE(?, sold_units), updated_at = ?
     WHERE id = ?`
  );

  update.run(name, location, description, imageUrl, startDate, availableUnits, blockedUnits, soldUnits, now(), req.params.id);

  const updatedProject = db.prepare(
    `SELECT id, name, location, description, image_url AS imageUrl, start_date AS startDate,
            total_units AS totalUnits, available_units AS availableUnits,
            blocked_units AS blockedUnits, sold_units AS soldUnits
     FROM projects WHERE id = ?`
  ).get(req.params.id);

  res.json({ data: updatedProject });
});

router.delete('/:id', (req, res) => {
  const info = db.prepare('DELETE FROM projects WHERE id = ?').run(req.params.id);

  if (info.changes === 0) {
    return res.status(404).json({ error: 'Project not found' });
  }

  res.status(204).end();
});

export default router;
