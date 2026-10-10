# E-commerce Website - Authentication Module

This is the Authentication Module (Member 1) for the E-commerce Web Development Major Project.

## Tech Stack
* **Frontend**: React, Vite, React Router, Axios, CSS
* **Backend**: Node.js, Express, MongoDB Atlas, Mongoose, bcryptjs, JWT

## Features
* User Registration (with password hashing and server validation)
* User Login (secure HTTP-only JWT cookies)
* Logout functionality
* Protected routes & Authorization Middleware
* Role-based access (Admin / User)
* Fully responsive, modern frontend UI

## Getting Started (Local Development)

### Prerequisites
* Node.js (v18+)
* A MongoDB Atlas Account

### 1. Database Setup
Please refer to the [MONGODB_SETUP.md](./MONGODB_SETUP.md) for detailed instructions on creating a free cluster and obtaining your connection URI.

### 2. Backend Setup
1. Open a terminal and navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy the environment variables template:
   ```bash
   cp .env.example .env
   ```
4. Open the `.env` file and add your MongoDB Atlas URI.
5. Start the backend server:
   ```bash
   npm run dev
   ```
   The backend will run on `http://localhost:5000`.

### 3. Frontend Setup
1. Open a **new** terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Start the Vite development server:
   ```bash
   npm run dev
   ```
4. Open your browser and go to `http://localhost:5173`.

---

## Testing

To run the backend automated tests:
1. Make sure you are in the `backend` directory.
2. Run `npm test`.

---

## Creating the First Admin Account
For security, users cannot register as administrators via the frontend. 
To create the project owner's admin account:

1. Ensure your MongoDB Atlas URI is set in `backend/.env`.
2. Configure the admin credentials in `backend/.env` (or use the defaults).
3. Run the seed script:
   ```bash
   cd backend
   npm run seed:admin
   ```
4. You can now log into the frontend using those credentials and you will have the `admin` role.

---

## Documentation for Teammates
* [API Contract](./API_CONTRACT.md) - How to use the Auth endpoints in your modules.
* [Deployment Guide](./DEPLOYMENT.md) - How to deploy this project live to the internet.
