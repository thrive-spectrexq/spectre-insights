// backend/src/config/production.ts

export default {
    // Production-specific configurations can be added here
    mongodb: {
      uri: process.env.MONGODB_URI,
    },
    jwt: {
      secret: process.env.JWT_SECRET,
    },
    email: {
      service: process.env.EMAIL_SERVICE,
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  }
  