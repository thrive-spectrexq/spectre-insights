// backend/src/app.ts

import express, { Application, Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

import userRoutes from './routes/userRoutes';
// Import other routes as needed

import config from './config'; // Import the validated configuration

const app: Application = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/users', userRoutes);
// Add other routes here

// Root Route
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Spectre Insights API');
});

// Error Handling Middleware
app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

// Connect to MongoDB and start the server
const PORT: number = config.port;
const MONGO_URI: string = config.mongodb.uri;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error: Error) => {
    console.error('MongoDB connection error:', error);
  });
