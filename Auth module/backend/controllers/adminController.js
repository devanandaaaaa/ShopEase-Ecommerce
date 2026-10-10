import User from '../models/User.js';
import Order from '../models/Order.js';
import Product from '../models/Product.js';

const getCustomers = async (req, res) => {
  try {
    const customers = await User.find({})
      .select('-passwordHash')
      .sort({ createdAt: -1 });

    res.status(200).json(customers);
  } catch (error) {
    res.status(500).json({
      message: 'Failed to get customers',
      error: error.message,
    });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await Order.find({})
      .populate('user', 'name email')
      .sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({
      message: 'Failed to get orders',
      error: error.message,
    });
  }
};

const addProduct = async (req, res) => {
    try {
      const {
        name,
        category,
        price,
        image,
      } = req.body;
  
      if (!name || !category || price === undefined || !image) {
        return res.status(400).json({
          message: 'Product details are required',
        });
      }
  
      const product = await Product.create({
        name,
        category,
        price: Number(price),
        image,
      });
  
      res.status(201).json({
        message: 'Product added successfully',
        product,
      });
    } catch (error) {
      res.status(500).json({
        message: 'Failed to add product',
        error: error.message,
      });
    }
  };

  export {
    getCustomers,
    getOrders,
    addProduct,
  };