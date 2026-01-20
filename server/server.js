import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
import atsRoutes from './routes/ats.js';

dotenv.config();

connectDB();

const app = express();

// Relaxed CORS for debugging
app.use(cors({ 
  origin: true, // Allow all origins
  credentials: true 
}));

app.use(express.json());

// Debug logging middleware
app.use((req, res, next) => {
  console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl}`);
  console.log('Origin:', req.headers.origin);
  next();
});

app.get('/', (req, res) => {
  res.send('API is running...');
});

app.get('/api/test', (req, res) => {
  res.json({ message: 'Test route working' });
});

// Mount routes
app.use('/api/ats', atsRoutes);

// Catch-all 404 for debugging
app.use('*', (req, res) => {
  console.log(`404 Hit: ${req.originalUrl}`);
  res.status(404).json({ 
    error: 'Not Found (Catch-all)', 
    path: req.originalUrl,
    method: req.method
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log('CORS enabled for all origins (origin: true)');
});
