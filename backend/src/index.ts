import express from 'express';
import cors from 'cors';
import projectsRouter from './routes/projects.js';
import flatsRouter from './routes/flats.js';
import activitiesRouter from './routes/activities.js';
import analyticsRouter from './routes/analytics.js';

const app = express();
const port = process.env.PORT ? Number(process.env.PORT) : 4000;

app.use(cors());
app.use(express.json());

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok' });
});

app.use('/api/projects', projectsRouter);
app.use('/api/flats', flatsRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/analytics', analyticsRouter);

app.use((req, res) => {
  res.status(404).json({ error: 'Not found' });
});

app.listen(port, () => {
  console.log(`Backend running on http://localhost:${port}`);
});
