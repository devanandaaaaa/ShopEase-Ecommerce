import express from 'express';
import {
  createOrder,
  getMyOrders,
  getOrderById,
  cancelOrder,
} from '../controllers/orderController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

// All order routes require a logged-in user
router.use(protect);

// Create an order from the user's cart
router.post('/', createOrder);

// Get all orders of the logged-in user
router.get('/my-orders', getMyOrders);

// Get one order
router.get('/:id', getOrderById);

// Cancel an order
router.put('/:id/cancel', cancelOrder);

export default router;