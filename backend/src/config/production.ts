// backend/src/config/production.ts

export default {
  // Production-specific configurations can be added here
  mongodb: {
    uri: process.env.MONGODB_URI,
  },
  jwt: {
    secret: process.env.JWT_SECRET,
  },
  emailService: {
    apiKey: process.env.EMAIL_SERVICE_API || '',
  },
}
