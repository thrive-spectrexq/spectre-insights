// backend/src/config/index.ts

import dotenv from 'dotenv';

dotenv.config();

const config = {
  port: parseInt(process.env.PORT || '5000', 10),
  mongodb: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/spectre',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'your_jwt_secret', // Use a strong secret in production
  },
  emailService: {
    apiKey: process.env.EMAIL_SERVICE_API || '',
  },
};

export default config;
