// src/app.ts
import express from 'express';
import cors from 'cors';
import authRoutes from './routes/auth';
import astronautsRoutes from './routes/astronauts';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/astronauts', astronautsRoutes);

export default app;
