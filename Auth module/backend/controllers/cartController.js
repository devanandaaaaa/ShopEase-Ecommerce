
import Cart from '../models/Cart.js';

// Get the logged-in user's cart
const getCart = async (req, res) => {
  try {
    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      cart = await Cart.create({
        user: req.user._id,
        items: [],
      });
    }

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({
      message: 'Failed to get cart',
      error: error.message,
    });
  }
};

// Add a product to the cart
const addToCart = async (req, res) => {
  try {
    const {
      productId,
      name,
      category,
      price,
      image,
      quantity = 1,
    } = req.body;

    if (
      !productId ||
      !name ||
      !category ||
      price === undefined ||
      !image
    ) {
      return res.status(400).json({
        message: 'Product details are required',
      });
    }

    const itemPrice = Number(price);
    const itemQuantity = Number(quantity);

    if (
      !Number.isFinite(itemPrice) ||
      itemPrice < 0 ||
      !Number.isInteger(itemQuantity) ||
      itemQuantity < 1
    ) {
      return res.status(400).json({
        message: 'Invalid price or quantity',
      });
    }

    let cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      cart = new Cart({
        user: req.user._id,
        items: [],
      });
    }

    const id = String(productId);

    const existingItem = cart.items.find(
      item => String(item.productId) === id
    );

    if (existingItem) {
      existingItem.quantity += itemQuantity;
    } else {
      cart.items.push({
        productId: id,
        name,
        category,
        price: itemPrice,
        image,
        quantity: itemQuantity,
      });
    }

    await cart.save();

    res.status(201).json({
      message: 'Product added to cart',
      cart,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to add product to cart',
      error: error.message,
    });
  }
};

// Update the quantity of a cart item
const updateCartItem = async (req, res) => {
  try {
    const { productId } = req.params;
    const newQuantity = Number(req.body.quantity);

    if (!Number.isInteger(newQuantity) || newQuantity < 1) {
      return res.status(400).json({
        message: 'Quantity must be at least 1',
      });
    }

    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return res.status(404).json({
        message: 'Cart not found',
      });
    }

    const id = String(productId);

    const item = cart.items.find(
      item => String(item.productId) === id
    );

    if (!item) {
      return res.status(404).json({
        message: 'Product not found in cart',
      });
    }

    item.quantity = newQuantity;

    await cart.save();

    res.status(200).json({
      message: 'Cart updated',
      cart,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to update cart',
      error: error.message,
    });
  }
};

// Remove a product from the cart
const removeFromCart = async (req, res) => {
  try {
    const { productId } = req.params;

    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return res.status(404).json({
        message: 'Cart not found',
      });
    }

    const id = String(productId);
    const originalLength = cart.items.length;

    cart.items = cart.items.filter(
      item => String(item.productId) !== id
    );

    if (cart.items.length === originalLength) {
      return res.status(404).json({
        message: 'Product not found in cart',
      });
    }

    await cart.save();

    res.status(200).json({
      message: 'Product removed from cart',
      cart,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to remove product from cart',
      error: error.message,
    });
  }
};

// Clear the entire cart
const clearCart = async (req, res) => {
  try {
    const cart = await Cart.findOne({ user: req.user._id });

    if (!cart) {
      return res.status(404).json({
        message: 'Cart not found',
      });
    }

    cart.items = [];

    await cart.save();

    res.status(200).json({
      message: 'Cart cleared',
      cart,
    });
  } catch (error) {
    res.status(500).json({
      message: 'Failed to clear cart',
      error: error.message,
    });
  }
};

export {
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
};
