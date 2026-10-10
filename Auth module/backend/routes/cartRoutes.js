import express from 'express';
import {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
} from '../controllers/cartController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// All cart routes require a logged-in user
router.use(protect);

// Get current user's cart
router.get('/', getCart);

// Add product to cart
router.post('/', addToCart);

// Update product quantity
router.put('/:productId', updateCartItem);

// Remove product from cart
router.delete('/:productId', removeFromCart);

// Clear cart
router.delete('/', clearCart);

export default router;