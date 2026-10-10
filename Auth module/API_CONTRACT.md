# API Contract: Authentication Module

This document outlines the API endpoints provided by the Authentication Module (Member 1) for use by other modules in the E-commerce project.

## Base URL
`/api/auth`

## Authentication Method
This API uses **HTTP-only cookies** containing a JWT. 
- You do not need to manually attach a token to the `Authorization` header.
- For frontend requests (Axios), ensure you set `axios.defaults.withCredentials = true;` globally.

---

## Endpoints

### 1. Register User
- **URL**: `/register`
- **Method**: `POST`
- **Access**: Public
- **Description**: Creates a new user with the default role of `user`.

**Request Body**:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

**Success Response (201 Created)**:
*Also sets the `jwt` cookie.*
```json
{
  "id": "60d0fe4f5311236168a109ca",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "user"
}
```

**Error Response (400 Bad Request)**:
```json
{
  "message": "User already exists" 
}
```
*(Or an array of validation errors)*

---

### 2. Login User
- **URL**: `/login`
- **Method**: `POST`
- **Access**: Public
- **Description**: Authenticates a user and sets an HTTP-only cookie.

**Request Body**:
```json
{
  "email": "john@example.com",
  "password": "password123"
}
```

**Success Response (200 OK)**:
*Also sets the `jwt` cookie.*
```json
{
  "id": "60d0fe4f5311236168a109ca",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "user" // or "admin"
}
```

**Error Response (401 Unauthorized)**:
```json
{
  "message": "Invalid email or password"
}
```

---

### 3. Logout User
- **URL**: `/logout`
- **Method**: `POST`
- **Access**: Public
- **Description**: Clears the authentication cookie.

**Success Response (200 OK)**:
```json
{
  "message": "Logged out successfully"
}
```

---

### 4. Get Current User Profile
- **URL**: `/me`
- **Method**: `GET`
- **Access**: Private (Requires valid cookie)
- **Description**: Returns the currently authenticated user's safe profile.

**Success Response (200 OK)**:
```json
{
  "id": "60d0fe4f5311236168a109ca",
  "name": "John Doe",
  "email": "john@example.com",
  "role": "user"
}
```

**Error Response (401 Unauthorized)**:
```json
{
  "message": "Not authorized, no token" // or "Not authorized, token failed"
}
```

---

## Integration Guidelines for Other Members

1. **User References**: In your database schemas (e.g., Orders, Cart), reference the user by storing the `id` string (or ObjectId) returned by the auth endpoints.
2. **Checking Roles**: If you need to restrict an endpoint (e.g., Admin panel for Member 5), verify the user's role on the backend. You can either use the provided `admin` middleware from `backend/middleware/authMiddleware.js` or write your own check against `req.user.role === 'admin'`.
3. **Protected Routes**: Wrap your Express routes with the `protect` middleware from `backend/middleware/authMiddleware.js`. This will populate `req.user` for you to use in your controllers.
