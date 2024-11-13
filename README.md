# Spectre Insights

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node.js](https://img.shields.io/badge/node.js-18.x-green.svg)
![Nuxt.js](https://img.shields.io/badge/nuxt.js-3.x-red.svg)
![Docker](https://img.shields.io/badge/docker-%3E%3D20.10-blue.svg)

**Spectre Insights** is a comprehensive web application designed to provide insightful information.

---

### Installation

1. **Clone the Repository**

   ```bash
   git clone https://github.com/thrive-spectrexq/spectre-insights.git
   cd spectre-insights

2. **Setup Backend**

   ```bash
   cd backend
   npm install

3. **Setup Frontend**

   ```bash
   cd frontend
   npm install

### Environment Variables

- Create a .env file in both the backend and frontend directories based on the provided .env.example files.

- **Backend** .env

  ```bash
  PORT=5000
  MONGODB_URI=mongodb://mongo:27017/spectre
  JWT_SECRET=your_jwt_secret
  EMAIL_SERVICE_API=SendGrid_api
  NODE_ENV=development


- **Frontend** .env

  ```bash
  API_BASE_URL=http://localhost:5000/api

### Running the Application

- **Running Backend**

  ```bash
  cd backend
  npm run dev

- **Running Frontend**

  ```bash
  cd frontend
  npm run dev

- Access the frontend at http://localhost:3000 and the backend API at http://localhost:5000.
