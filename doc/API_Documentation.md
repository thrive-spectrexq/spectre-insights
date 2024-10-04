# Spectre Insights API Documentation

## Base URL

`http://localhost:5000/api`

## Authentication

All protected routes require a JWT token to be included in the `Authorization` header as `Bearer <token>`.

## Endpoints

### **User Authentication**

#### **Register User**

- **URL:** `/users/register`
- **Method:** `POST`
- **Body Parameters:**
  - `name` (string, required)
  - `email` (string, required)
  - `password` (string, required)
- **Success Response:**
  - **Code:** `201 CREATED`
  - **Content:** 
    ```json
    {
      "token": "jwt_token",
      "user": {
        "id": "user_id",
        "name": "User Name",
        "email": "user@example.com"
      }
    }
    ```
- **Error Responses:**
  - **Code:** `400 BAD REQUEST` - User already exists
  - **Code:** `500 INTERNAL SERVER ERROR`

#### **Login User**

- **URL:** `/users/login`
- **Method:** `POST`
- **Body Parameters:**
  - `email` (string, required)
  - `password` (string, required)
- **Success Response:**
  - **Code:** `200 OK`
  - **Content:** 
    ```json
    {
      "token": "jwt_token",
      "user": {
        "id": "user_id",
        "name": "User Name",
        "email": "user@example.com"
      }
    }
    ```
- **Error Responses:**
  - **Code:** `400 BAD REQUEST` - Invalid credentials
  - **Code:** `500 INTERNAL SERVER ERROR`

#### **Get User Profile**

- **URL:** `/users/profile`
- **Method:** `GET`
- **Headers:**
  - `Authorization: Bearer <token>`
- **Success Response:**
  - **Code:** `200 OK`
  - **Content:** 
    ```json
    {
      "id": "user_id",
      "name": "User Name",
      "email": "user@example.com"
    }
    ```
- **Error Responses:**
  - **Code:** `401 UNAUTHORIZED` - Not authorized
  - **Code:** `404 NOT FOUND` - User not found
