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
    strapi: {
      apiUrl: process.env.STRAPI_API_URL || 'http://localhost:1337',
    },
    email: {
      service: process.env.EMAIL_SERVICE || 'SendGrid',
      user: process.env.EMAIL_USER || 'your_sendgrid_username',
      pass: process.env.EMAIL_PASS || 'your_sendgrid_password',
    },
  }
  