import express from 'express';
import { body } from 'express-validator';
import { registerUser, loginUser, logoutUser, getUserProfile } from '../controllers/authController.js';
import { protect } from '../middleware/authMiddleware.js';
import rateLimit from 'express-rate-limit';

const router = express.Router();

// Rate limiting for auth routes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 10, // limit each IP to 10 requests per windowMs for login/register
  message: 'Too many authentication attempts from this IP, please try again after 15 minutes',
});

// @route   POST /api/auth/register
router.post(
  '/register',
  authLimiter,
  [
    body('name').trim().notEmpty().withMessage('Name is required'),
    body('email').trim().isEmail().withMessage('Please include a valid email').normalizeEmail(),
    body('password')
      .isLength({ min: 6 })
      .withMessage('Password must be at least 6 characters'),
  ],
  registerUser
);

// @route   POST /api/auth/login
router.post(
  '/login',
  authLimiter,
  [
    body('email').trim().isEmail().withMessage('Please include a valid email').normalizeEmail(),
    body('password').exists().withMessage('Password is required'),
  ],
  loginUser
);

// @route   POST /api/auth/logout
router.post('/logout', logoutUser);

// @route   GET /api/auth/me
router.get('/me', protect, getUserProfile);

export default router;
