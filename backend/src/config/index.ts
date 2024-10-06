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
    host: 'smtp.your-email-provider.com',
    port: 587, // or 465 for SSL
    secure: false, // true for 465, false for other ports
    auth: {
      user: 'your_email@example.com',
      pass: 'your_email_password',
    },
    from: '"Spectre Insights" <no-reply@spectreinsights.com>',
  }
};

export default config;
