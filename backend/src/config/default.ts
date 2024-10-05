// backend/src/config/default.ts

export default {
  port: process.env.PORT || 5000,
  mongodb: {
    uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/spectre_insights',
  },
  jwt: {
    secret: process.env.JWT_SECRET || 'default_jwt_secret',
    expiresIn: '1h',
  },
  emailService: {
    apiKey: process.env.EMAIL_SERVICE_API || '',
  },
}
