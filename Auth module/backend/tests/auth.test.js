import request from 'supertest';
import mongoose from 'mongoose';
import app from '../server.js';
import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();

beforeAll(async () => {
  // Connect to a local test database or use a test Atlas URI
  const url = process.env.MONGODB_URI_TEST || process.env.MONGODB_URI;
  if (!url) {
    console.warn("Skipping DB connection in tests: No MONGODB_URI provided");
    return;
  }
  await mongoose.connect(url);
});

afterAll(async () => {
  if (mongoose.connection.readyState === 1) {
    await User.deleteMany({});
    await mongoose.connection.close();
  }
});

beforeEach(async () => {
  if (mongoose.connection.readyState === 1) {
    await User.deleteMany({});
  }
});

describe('Auth API', () => {
  if (!process.env.MONGODB_URI_TEST && !process.env.MONGODB_URI) {
    it.skip('Skipping tests because no database is configured', () => {});
    return;
  }

  const testUser = {
    name: 'Test User',
    email: 'test@example.com',
    password: 'password123'
  };

  describe('POST /api/auth/register', () => {
    it('should register a valid user', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send(testUser);
      
      expect(res.statusCode).toEqual(201);
      expect(res.body).toHaveProperty('id');
      expect(res.body.name).toEqual(testUser.name);
      expect(res.body.email).toEqual(testUser.email);
      expect(res.body.role).toEqual('user');
      expect(res.headers['set-cookie']).toBeDefined();
    });

    it('should not register user with duplicate email', async () => {
      await request(app).post('/api/auth/register').send(testUser);
      
      const res = await request(app)
        .post('/api/auth/register')
        .send(testUser);
      
      expect(res.statusCode).toEqual(400);
      expect(res.body.message).toEqual('User already exists');
    });

    it('should validate missing fields', async () => {
      const res = await request(app)
        .post('/api/auth/register')
        .send({ email: 'test@example.com' }); // missing name and password
      
      expect(res.statusCode).toEqual(400);
      expect(res.body.errors).toBeDefined();
    });
  });

  describe('POST /api/auth/login', () => {
    beforeEach(async () => {
      await request(app).post('/api/auth/register').send(testUser);
    });

    it('should login with correct credentials', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({ email: testUser.email, password: testUser.password });
      
      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('id');
      expect(res.headers['set-cookie']).toBeDefined();
    });

    it('should not login with incorrect password', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({ email: testUser.email, password: 'wrongpassword' });
      
      expect(res.statusCode).toEqual(401);
      expect(res.body.message).toEqual('Invalid email or password');
    });

    it('should not login with nonexistent email', async () => {
      const res = await request(app)
        .post('/api/auth/login')
        .send({ email: 'wrong@example.com', password: 'password123' });
      
      expect(res.statusCode).toEqual(401);
      expect(res.body.message).toEqual('Invalid email or password');
    });
  });

  describe('Protected Routes', () => {
    it('should not access /api/auth/me without token', async () => {
      const res = await request(app).get('/api/auth/me');
      expect(res.statusCode).toEqual(401);
    });

    it('should access /api/auth/me with token', async () => {
      const loginRes = await request(app).post('/api/auth/register').send(testUser);
      const cookie = loginRes.headers['set-cookie'];

      const res = await request(app)
        .get('/api/auth/me')
        .set('Cookie', cookie);
      
      expect(res.statusCode).toEqual(200);
      expect(res.body.email).toEqual(testUser.email);
    });
  });

  describe('POST /api/auth/logout', () => {
    it('should logout and clear cookie', async () => {
      const res = await request(app).post('/api/auth/logout');
      expect(res.statusCode).toEqual(200);
      expect(res.headers['set-cookie'][0]).toContain('jwt=;');
    });
  });
});
