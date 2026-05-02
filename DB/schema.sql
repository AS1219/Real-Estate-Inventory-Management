PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS projects (
  id TEXT PRIMARY KEY,
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  description TEXT NOT NULL,
  image_url TEXT NOT NULL,
  start_date TEXT NOT NULL,
  total_units INTEGER NOT NULL,
  available_units INTEGER NOT NULL,
  blocked_units INTEGER NOT NULL,
  sold_units INTEGER NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS buildings (
  id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL,
  name TEXT NOT NULL,
  floors INTEGER NOT NULL,
  total_flats INTEGER NOT NULL,
  available_flats INTEGER NOT NULL,
  blocked_flats INTEGER NOT NULL,
  sold_flats INTEGER NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS flats (
  id TEXT PRIMARY KEY,
  project_id TEXT NOT NULL,
  building_id TEXT NOT NULL,
  number TEXT NOT NULL,
  floor INTEGER NOT NULL,
  type TEXT NOT NULL,
  area INTEGER NOT NULL,
  price INTEGER NOT NULL,
  status TEXT NOT NULL,
  assigned_agent TEXT,
  buyer_name TEXT,
  buyer_contact TEXT,
  last_updated TEXT NOT NULL,
  position_x REAL,
  position_y REAL,
  position_width REAL,
  position_height REAL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE,
  FOREIGN KEY (building_id) REFERENCES buildings(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS activities (
  id TEXT PRIMARY KEY,
  type TEXT NOT NULL,
  flat_number TEXT NOT NULL,
  agent_name TEXT NOT NULL,
  project_name TEXT NOT NULL,
  timestamp TEXT NOT NULL,
  created_at TEXT NOT NULL,
  updated_at TEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS analytics_floor_sales (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  floor_range TEXT NOT NULL,
  sold INTEGER NOT NULL,
  available INTEGER NOT NULL,
  blocked INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS analytics_revenue_by_building (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  revenue INTEGER NOT NULL
);

CREATE TABLE IF NOT EXISTS analytics_sales_trends (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  month TEXT NOT NULL,
  sales INTEGER NOT NULL
);
