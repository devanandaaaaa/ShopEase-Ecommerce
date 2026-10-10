# Deployment Guide

This project is built to be easily deployed to modern cloud hosting providers so it is accessible via a public HTTPS URL without installing any local software.

Recommended Setup:
- **Backend**: Render.com, Railway, or Heroku (Free/Hobby tiers)
- **Frontend**: Vercel or Netlify
- **Database**: MongoDB Atlas

---

## 1. Deploying the Backend (Render example)

1. Push your code to a GitHub repository.
2. Log into [Render](https://render.com/).
3. Click **New +** and select **Web Service**.
4. Connect your GitHub repository.
5. Setup details:
   - **Root Directory**: `backend` (Important!)
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
6. Add Environment Variables (under Advanced):
   - `NODE_ENV`: `production`
   - `PORT`: `5000`
   - `MONGODB_URI`: *(Your Atlas connection string)*
   - `JWT_SECRET`: *(A long, random secret string)*
   - `FRONTEND_URL`: *(Leave blank for now, you will update this after deploying the frontend)*
7. Click **Create Web Service**. 
8. Once deployed, copy your backend URL (e.g., `https://ecommerce-auth-api.onrender.com`).
   - *Note on free tiers: Render spins down the backend after 15 minutes of inactivity. Initial requests may take 30-50 seconds to wake up.*

---

## 2. Deploying the Frontend (Vercel example)

1. Log into [Vercel](https://vercel.com/).
2. Click **Add New** -> **Project** and import your GitHub repository.
3. Setup details:
   - **Root Directory**: Click `Edit` and select `frontend`.
   - **Framework Preset**: Vite (should be auto-detected).
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. We need to tell Vite to connect to the production backend. Open `frontend/src/services/api.js` in your code and modify the `API_URL` logic (or use an environment variable). For this specific project setup:
   - In `frontend/.env.production` (create this), add:
     `VITE_API_URL=https://ecommerce-auth-api.onrender.com/api/auth/`
   - Update `api.js` to use `import.meta.env.VITE_API_URL || '/api/auth/'`.
5. Click **Deploy**.
6. Copy the live frontend URL (e.g., `https://ecommerce-auth-app.vercel.app`).

---

## 3. Final Production Configuration

Because this app uses HTTP-only cookies, CORS and cookie settings must be perfectly aligned:

1. **Go back to your Backend hosting dashboard** (Render).
2. Update the `FRONTEND_URL` environment variable to match your exact Vercel URL (e.g., `https://ecommerce-auth-app.vercel.app`). Do not include a trailing slash.
3. Restart the backend service.

### Note on Cross-Domain Cookies (SameSite)
By default, the backend sets `sameSite: 'strict'`. If your frontend is on `vercel.app` and your backend is on `onrender.com`, browsers will block the cookie as a third-party cookie.
**For production with different domains:**
Change `sameSite: 'strict'` to `sameSite: 'none'` and ensure `secure: true` in `backend/utils/generateToken.js`.
*(If frontend and backend are served from the same domain, keep `sameSite: 'strict'`.)*
