# Spectre Insights Architecture

## Overview

Spectre Insights is a full-stack web application built with Nuxt.js (Vue.js) for the frontend and Express.js (Node.js) for the backend. MongoDB is used as the database, and Strapi serves as the headless CMS.

## Components

- **Frontend:** Nuxt.js with TypeScript, Tailwind CSS, and Pinia for state management.
- **Backend:** Express.js with TypeScript, handling RESTful APIs and authentication.
- **Database:** MongoDB, managed via Mongoose.
- **CMS:** Strapi for content management.
- **Containerization:** Docker and Docker Compose for consistent environments.
- **Deployment:** Frontend on Vercel/Netlify, Backend on Heroku/AWS/DigitalOcean.

## Data Flow

1. **User Interaction:** Users interact with the frontend application.
2. **API Requests:** The frontend communicates with the backend through RESTful APIs.
3. **Database Operations:** The backend interacts with MongoDB for data persistence.
4. **Content Management:** Admins use Strapi to manage blog posts, services, and products, which are then fetched by the frontend.

## Diagram

![Architecture Diagram](./images/architecture-diagram.png)
