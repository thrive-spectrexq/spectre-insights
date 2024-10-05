// backend/src/config/development.ts

export default {
  // Development-specific configurations can be added here
  mongodb: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/spectre',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'development_jwt_secret',
  },
}
