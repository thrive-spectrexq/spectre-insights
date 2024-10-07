# Spectre Insights

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![Node.js](https://img.shields.io/badge/node.js-18.x-green.svg)
![Nuxt.js](https://img.shields.io/badge/nuxt.js-3.x-red.svg)
![Docker](https://img.shields.io/badge/docker-%3E%3D20.10-blue.svg)

**Spectre Insights** is a comprehensive web application designed to provide insightful information through various sections such as services, blog, products, and more. Built using modern technologies like Nuxt.js, Vue.js, Node.js, Express and MongoDB, Spectre Insights offers a seamless experience for both regular users and administrators.

---

## Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
  - [Running the Application](#running-the-application)
- [Docker Setup](#docker-setup)
- [Testing](#testing)
- [Deployment](#deployment)
- [Documentation](#documentation)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

---

## Features

### Public User Features

- **Homepage:** Overview of Spectre Insights with highlights of services, products, and featured blog posts.
- **Services Page:** Detailed descriptions of services offered with pricing and testimonials.
- **Blog:** Dynamic blog section managed via the admin panel with categories, tags, and search functionality.
- **About Page:** Company history, mission, team profiles, and contact information.
- **Product Page:** Showcase of products with detailed descriptions, pricing, and user reviews.
- **Contact Page:** Contact form, contact details, and interactive map integration.
- **User Authentication:** Signup, signin, profile management, and password reset functionalities.

### Admin Features

- **Admin Authentication:** Secure login with role-based access control and optional two-factor authentication.
- **Admin Dashboard:** Overview of website statistics and quick access to manage content.
- **Content Management:** CRUD operations for blog posts, services, products.
- **User Management:** View and manage registered users, roles, and permissions.
- **Analytics and Reporting:** Traffic analysis, user engagement metrics, and sales reports.
- **Site Settings:** Manage website configurations, contact information, and SEO settings.

---

## Technology Stack

### Frontend

- **Framework:** Nuxt.js (Vue.js)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **State Management:** Pinia
- **Routing:** Vue Router
- **Build Tool:** Vite (default with Nuxt 3)

### Backend

- **Runtime:** Node.js
- **Framework:** Express.js
- **Language:** Typescript
- **Authentication:** JWT (JSON Web Tokens)
- **Database:** MongoDB
- **ODM:** Mongoose

### Additional Tools

- **Version Control:** Git & GitHub
- **Containerization:** Docker
- **CI/CD:** GitHub Actions
- **Deployment:** Vercel or Netlify (Frontend), Heroku, AWS, or DigitalOcean (Backend)
- **Testing:** Jest, Cypress, Mocha, Chai, Supertest

---

## Getting Started

### Prerequisites

- **Node.js:** v18.x or higher
- **npm:** v8.x or higher
- **Docker:** v20.10 or higher (optional, for containerization)
- **Git:** For version control

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
  NUXT_PUBLIC_API_URL=http://localhost:5000/api

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

## Docker Setup

- Spectre Insights uses Docker for containerization, ensuring consistent environments across development and production.

### Prerequisites

- **Docker**: Ensure Docker is installed and running on your machine.

### Build and Run with Docker Compose

1. **Navigate to the Root Directory**

  ```bash
  cd spectre-insights


2. **Build and Start Containers**

  ```bash
  docker-compose up --build


- This command will build the Docker images for both the frontend and backend, along with the MongoDB service, and start the containers.

3. **Access the Application**

  ```bash
  Frontend: http://localhost:3000
  Backend API: http://localhost:5000/api