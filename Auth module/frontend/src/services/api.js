import axios from 'axios';

// Use environment variable if available, otherwise default to Vite's proxy path
const API_URL = import.meta.env.VITE_API_URL || '/api/auth/';

// Configure axios to send credentials (cookies) with every request
axios.defaults.withCredentials = true;

// Register user
const register = async (userData) => {
  const response = await axios.post(API_URL + 'register', userData);
  return response.data;
};

// Login user
const login = async (userData) => {
  const response = await axios.post(API_URL + 'login', userData);
  return response.data;
};

// Logout user
const logout = async () => {
  const response = await axios.post(API_URL + 'logout');
  return response.data;
};

// Get current user profile
const getMe = async () => {
  const response = await axios.get(API_URL + 'me');
  return response.data;
};

// Get current user's cart
const getCart = async () => {
  const response = await axios.get('/api/cart');
  return response.data;
};

// Add a product to the cart
const addToCart = async (productData) => {
  const response = await axios.post('/api/cart', productData);
  return response.data;
};

// Update cart item quantity
const updateCartItem = async (productId, quantity) => {
  const response = await axios.put(
    `/api/cart/${productId}`,
    { quantity }
  );
  return response.data;
};

// Remove product from cart
const removeFromCart = async (productId) => {
  const response = await axios.delete(
    `/api/cart/${productId}`
  );
  return response.data;
};

// Clear the cart
const clearCart = async () => {
  const response = await axios.delete('/api/cart');
  return response.data;
};

// Create an order from the cart
const createOrder = async (orderDetails) => {
  const response = await axios.post(
    '/api/orders',
    orderDetails
  );

  return response.data;
};

// Get logged-in user's orders
const getMyOrders = async () => {
  const response = await axios.get('/api/orders/my-orders');
  return response.data;
};

// Get one order
const getOrderById = async (orderId) => {
  const response = await axios.get(
    `/api/orders/${orderId}`
  );
  return response.data;
};

// Cancel an order
const cancelOrder = async (orderId) => {
  const response = await axios.put(
    `/api/orders/${orderId}/cancel`
  );
  return response.data;
};

const authService = {
  register,
  login,
  logout,
  getMe,
  getCart,
  addToCart,
  updateCartItem,
  removeFromCart,
  clearCart,
  createOrder,
  getMyOrders,
  getOrderById,
  cancelOrder,
};

export default authService;
