// backend/src/config/development.ts

export default {
    // Development-specific configurations can be added here
    mongodb: {
      uri: process.env.MONGODB_URI || 'mongodb+srv://frimpsbathrive:mdkgZFnGw9IJBhNq@cluster0.koxddbu.mongodb.net/spectre?retryWrites=true&w=majority',
    },
    jwt: {
      secret: process.env.JWT_SECRET || 'development_jwt_secret',
    },
  }
  