import express from 'express';

import {
    getCustomers,
    getOrders,
    addProduct,
  } from '../controllers/adminController.js';

import {
  protect,
  admin,
} from '../middleware/authMiddleware.js';

const router = express.Router();

router.use(protect);
router.use(admin);

router.get('/customers', getCustomers);
router.get('/orders', getOrders);
router.post('/products', addProduct);

export default router;