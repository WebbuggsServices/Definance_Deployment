# Kremlin

Kremlin is a full-stack MERN (MongoDB, Express, React, Node.js) application with built-in authentication, designed for a Single Page Application (SPA) workflow using the [Create React App (CRA)](https://create-react-app.dev/) build tool.

## Features

- Backend API powered by Express & MongoDB
- Routes for authentication, logout, registration, profile viewing, and profile updating
- JWT (JSON Web Token) authentication stored in an HTTP-only cookie
- Secure and protected routes and endpoints
- Custom middleware for JWT validation and cookie storage
- Error handling middleware
- React-based frontend for user interactions such as registration, login, logout, profile viewing, and profile updating
- Utilizes React Bootstrap UI library for enhanced user interface
- Implements React Toastify for user notifications

## Getting Started

1. **MongoDB Setup**: Create a MongoDB database and obtain your `MongoDB URI` from [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register).

2. **Environment Variables**: Rename the `.env.example` file to `.env` and add the following information:

    ```env
    NODE_ENV = development
    PORT = 5000
    MONGO_URI = your_mongodb_uri
    JWT_SECRET = 'abc123'
    ```

    Change the `JWT_SECRET` to your desired value.

3. **Install Dependencies**: Run the following commands in your terminal to install both frontend and backend dependencies:

    ```bash
    npm install
    cd frontend
    npm install
    ```

4. **Run the Application**: Execute the following command to run the frontend:

    ```bash
    npm run start
    ```

    Alternatively, to run the backend:

    ```bash
    npm run dev
    ```

## Build & Deployment

To deploy the application, you can follow these steps:

1. **Create Frontend Production Build**:

    ```bash
    cd frontend
    npm run build
    ```

This will create an optimized production build of the frontend. You can then deploy the application using the generated build files.
