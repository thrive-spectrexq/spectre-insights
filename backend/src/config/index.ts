// backend/src/config/index.ts

import { cleanEnv, port, str } from 'envalid';
import path from 'path';
import dotenv from 'dotenv';

// Load environment variables from .env file
dotenv.config({
  path: path.resolve(__dirname, '../../.env'),
});

// Define the shape and validation for environment variables
const env = cleanEnv(process.env, {
  PORT: port({ default: 5000 }),
  MONGODB_URI: str(),
  JWT_SECRET: str(),
  STRAPI_API_URL: str(),
  EMAIL_SERVICE: str(),
  EMAIL_USER: str(),
  EMAIL_PASS: str(),
  NODE_ENV: str({ choices: ['development', 'production'] }),
});

// Define a Configuration Interface
interface Config {
  port: number;
  mongodb: {
    uri: string;
  };
  jwt: {
    secret: string;
    expiresIn: string;
  };
  strapi: {
    apiUrl: string;
  };
  email: {
    service: string;
    user: string;
    pass: string;
  };
  nodeEnv: string;
}

// Construct the configuration object
const config: Config = {
  port: env.PORT,
  mongodb: {
    uri: env.MONGODB_URI,
  },
  jwt: {
    secret: env.JWT_SECRET,
    expiresIn: '1h', // You can make this configurable if needed
  },
  strapi: {
    apiUrl: env.STRAPI_API_URL,
  },
  email: {
    service: env.EMAIL_SERVICE,
    user: env.EMAIL_USER,
    pass: env.EMAIL_PASS,
  },
  nodeEnv: env.NODE_ENV,
};

export default config;
