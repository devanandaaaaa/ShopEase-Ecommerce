import Order from '../models/Order.js';
import Cart from '../models/Cart.js';

// Create an order from the current user's cart
const createOrder = async (req, res) => {
  try {
    const {
      name,
      address,
      phone,
      paymentMethod,
    } = req.body;

    if (!name || !address || !phone) {
      return res.status(400).json({
        message: 'Name, address and phone are required',
      });
    }

    const cart = await Cart.findOne({
      user: req.user._id,
    });

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({
        message: 'Your cart is empty',
      });
    }

    const totalAmount = cart.items.reduce(
      (total, item) =>
        total + item.price * item.quantity,
      0
    );

    const order = await Order.create({
      user: req.user._id,

      customerName: name,
      address,
      phone,
      paymentMethod: paymentMethod || 'COD',

      items: cart.items.map((item) => ({
        productId: item.productId,
        name: item.name,
        category: item.category,
        price: item.price,
        image: item.image,
        quantity: item.quantity,
      })),

      totalAmount,
      status: 'Pending',
    });

    cart.items = [];
    await cart.save();

    res.status(201).json({
      message: 'Order created successfully',
      order,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to create order',
      error: error.message,
    });
  }
};

// Get all orders belonging to the current user
const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({
      user: req.user._id,
    }).sort({ createdAt: -1 });

    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({
      message: 'Failed to get orders',
      error: error.message,
    });
  }
};

// Get one order belonging to the current user
const getOrderById = async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!order) {
      return res.status(404).json({
        message: 'Order not found',
      });
    }

    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({
      message: 'Failed to get order',
      error: error.message,
    });
  }
};

// Cancel an order belonging to the current user
const cancelOrder = async (req, res) => {
  try {
    const order = await Order.findOne({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!order) {
      return res.status(404).json({
        message: 'Order not found',
      });
    }

    if (['Shipped', 'Delivered', 'Cancelled'].includes(order.status)) {
      return res.status(400).json({
        message: `Order cannot be cancelled because it is ${order.status.toLowerCase()}`,
      });
    }

    order.status = 'Cancelled';
    await order.save();

    res.status(200).json({
      message: 'Order cancelled successfully',
      order,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to cancel order',
      error: error.message,
    });
  }
};

export {
  createOrder,
  getMyOrders,
  getOrderById,
  cancelOrder,
};