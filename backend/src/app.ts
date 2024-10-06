// backend/src/app.ts

import express, { Application, Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

import userRoutes from './routes/userRoutes';
import blogRoutes from './routes/blogRoutes'; // Import blog routes
import servicesRoutes from './routes/servicesRoutes';
import productRoutes from './routes/productRoutes';
import contactRoutes from './routes/contactRoutes';
import testimonialRoutes from './routes/testimonialRoutes';
import { errorHandler } from './middlewares/errorHandler';
import config from './config';
import logger from './utils/logger'; // Import logger

const app: Application = express();

// 1. Security Middleware
app.use(helmet());

// 2. Rate Limiting Middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
});
app.use(limiter);

// 3. CORS Middleware
app.use(cors());

// 4. Body Parsing Middleware
app.use(express.json());

// 5. Routes
app.use('/api/users', userRoutes);
app.use('/api/blogs', blogRoutes);
app.use('/api/services', servicesRoutes); // Use services routes
app.use('/api/products', productRoutes); // Assuming you have product routes
app.use('/api/contact', contactRoutes);
app.use('/api/testimonials', testimonialRoutes);

// 6. Root Route
app.get('/', (req: Request, res: Response) => {
  res.send('Welcome to Spectre Insights API');
});

// 7. Error Handling Middleware
app.use(errorHandler);

// 8. Connect to MongoDB and start the server
const PORT: number = config.port;
const MONGO_URI: string = config.mongodb.uri;

mongoose
  .connect(MONGO_URI)
  .then(() => {
    logger.info('Connected to MongoDB');
    app.listen(PORT, () => {
      logger.info(`Server is running on port ${PORT}`);
    });
  })
  .catch((error: Error) => {
    logger.error('MongoDB connection error:', error);
    process.exit(1); // Exit the process with failure
  });

// 9. Graceful Shutdown
process.on('unhandledRejection', (reason: any, promise) => {
  logger.error('Unhandled Rejection at:', promise, 'reason:', reason);
  mongoose.disconnect().then(() => {
    process.exit(1);
  });
});

process.on('uncaughtException', (error: Error) => {
  logger.error('Uncaught Exception thrown:', error);
  mongoose.disconnect().then(() => {
    process.exit(1);
  });
});
