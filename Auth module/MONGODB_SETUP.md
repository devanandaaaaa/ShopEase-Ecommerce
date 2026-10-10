# MongoDB Atlas Setup Guide

This guide explains how to set up the cloud database for our E-commerce project.

## 1. Create a MongoDB Atlas Account
1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) and sign up for a free account.
2. Once logged in, click **Build a Database**.
3. Choose the **FREE** (M0) tier.
4. Select a provider (AWS/Google Cloud/Azure) and a region close to you.
5. Click **Create**.

## 2. Configure Security & Network Access
1. **Create a Database User**: 
   - Enter a username (e.g., `ecommerce_user`).
   - Auto-generate a secure password and copy it to a safe place.
   - Click **Create User**.
2. **Network Access (IP Whitelist)**:
   - To allow access from anywhere (for deployment), choose **Allow Access from Anywhere** (`0.0.0.0/0`).
   - *Note: In a strict production setting, you'd only whitelist your backend server's IP. For a college project, 0.0.0.0/0 is usually required to avoid connectivity issues during evaluation.*
   - Click **Add IP Address**.
3. Click **Finish and Close**.

## 3. Get the Connection String (URI)
1. In your Database Deployments view, click the **Connect** button next to your cluster.
2. Select **Drivers** (Node.js).
3. Copy the provided connection string. It will look like this:
   `mongodb+srv://<username>:<password>@cluster0.abcde.mongodb.net/?retryWrites=true&w=majority`
4. **Modify the string**:
   - Replace `<username>` with your database user (if not already filled).
   - Replace `<password>` with the password you copied earlier.
   - Insert the database name `ecommerce_db` before the `?`.
   - Final result: `mongodb+srv://ecommerce_user:YourPassword123@cluster0.abcde.mongodb.net/ecommerce_db?retryWrites=true&w=majority`

## 4. Add URI to Environment Variables
1. Go to the `backend/` folder in the project.
2. Rename `.env.example` to `.env`.
3. Paste your modified connection string into the `MONGODB_URI` variable.

```env
MONGODB_URI=mongodb+srv://ecommerce_user:YourPassword123@cluster0.abcde.mongodb.net/ecommerce_db?retryWrites=true&w=majority
```
