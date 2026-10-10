
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';

function AdminPanel() {
  const [customers, setCustomers] = useState([]);
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  const [productName, setProductName] = useState('');
  const [productCategory, setProductCategory] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [productImage, setProductImage] = useState('');

  const addProduct = async (e) => {
    e.preventDefault();

    if (
      !productName.trim() ||
      !productCategory.trim() ||
      !productPrice ||
      !productImage.trim()
    ) {
      toast.error('Please fill in all product details');
      return;
    }

    if (Number(productPrice) <= 0) {
      toast.error('Price must be greater than zero');
      return;
    }

    try {
      await axios.post('/api/admin/products', {
        name: productName.trim(),
        category: productCategory.trim(),
        price: Number(productPrice),
        image: productImage.trim(),
      });

      toast.success('Product added successfully');

      setProductName('');
      setProductCategory('');
      setProductPrice('');
      setProductImage('');
    } catch (error) {
      toast.error(
        error.response?.data?.message || 'Failed to add product'
      );
    }
  };

  const loadAdminData = async () => {
    try {
      const [customersResponse, ordersResponse] =
        await Promise.all([
          axios.get('/api/admin/customers'),
          axios.get('/api/admin/orders'),
        ]);

      setCustomers(customersResponse.data);
      setOrders(ordersResponse.data);
    } catch (error) {
      toast.error(
        error.response?.data?.message || 'Failed to load admin data'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadAdminData();
  }, []);

  const formatPrice = (price) =>
    `₹${Number(price || 0).toLocaleString('en-IN')}`;

  const getStatusClass = (status) =>
    `admin-status admin-status-${String(status || 'pending').toLowerCase()}`;

  if (loading) {
    return (
      <main className="admin-page">
        <div className="admin-loading">
          <div className="cart-spinner" />
          <p>Loading your admin dashboard...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="admin-page">
      <header className="admin-header">
        <div>
          <p className="admin-eyebrow">STORE MANAGEMENT</p>
          <h1>Admin Dashboard <span>🛠️</span></h1>
          <p className="admin-subtitle">
            Manage your products, customers and orders in one place.
          </p>
        </div>
        <div className="admin-header-icon">⚙️</div>
      </header>

      <section className="admin-stats">
        <article className="admin-stat-card">
          <div className="admin-stat-icon purple">📦</div>
          <div>
            <p>Total Orders</p>
            <h2>{orders.length}</h2>
          </div>
        </article>

        <article className="admin-stat-card">
          <div className="admin-stat-icon blue">👥</div>
          <div>
            <p>Total Customers</p>
            <h2>{customers.length}</h2>
          </div>
        </article>

        <article className="admin-stat-card">
          <div className="admin-stat-icon green">₹</div>
          <div>
            <p>Order Value</p>
            <h2>
              {formatPrice(
                orders
                  .filter((order) => order.status !== 'Cancelled')
                  .reduce(
                    (sum, order) => sum + Number(order.totalAmount || 0),
                    0
                  )
              )}
            </h2>
          </div>
        </article>
      </section>

      <section className="admin-section admin-product-section">
        <div className="admin-section-heading">
          <div>
            <span className="admin-section-kicker">INVENTORY</span>
            <h2>Add a Product</h2>
            <p>Add a new item to your store catalogue.</p>
          </div>
          <span className="admin-section-emoji">🛍️</span>
        </div>

        <form className="admin-product-form" onSubmit={addProduct}>
          <div className="admin-field">
            <label htmlFor="productName">Product Name</label>
            <input
              id="productName"
              type="text"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
              placeholder="e.g. Smart Watch"
              required
            />
          </div>

          <div className="admin-field">
            <label htmlFor="productCategory">Category</label>
            <input
              id="productCategory"
              type="text"
              value={productCategory}
              onChange={(e) => setProductCategory(e.target.value)}
              placeholder="e.g. Electronics"
              required
            />
          </div>

          <div className="admin-field">
            <label htmlFor="productPrice">Price (₹)</label>
            <input
              id="productPrice"
              type="number"
              min="0.01"
              step="0.01"
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
              placeholder="e.g. 2499"
              required
            />
          </div>

          <div className="admin-field">
            <label htmlFor="productImage">Product Image URL</label>
            <input
              id="productImage"
              type="url"
              value={productImage}
              onChange={(e) => setProductImage(e.target.value)}
              placeholder="https://example.com/image.jpg"
              required
            />
          </div>

          <div className="admin-form-footer">
            <p>Use a publicly accessible image URL.</p>
            <button className="admin-add-button" type="submit">
              <span>＋</span> Add Product
            </button>
          </div>
        </form>
      </section>

      <section className="admin-section">
        <div className="admin-section-heading">
          <div>
            <span className="admin-section-kicker">YOUR USERS</span>
            <h2>Customers</h2>
            <p>Accounts registered on your store.</p>
          </div>
          <span className="admin-count">{customers.length} accounts</span>
        </div>

        {customers.length === 0 ? (
          <div className="admin-empty">
            <span>👥</span>
            <h3>No customers yet</h3>
            <p>Registered accounts will appear here.</p>
          </div>
        ) : (
          <div className="admin-customer-grid">
            {customers.map((customer) => (
              <article className="admin-customer-card" key={customer._id}>
                <div className="admin-customer-avatar">
                  {(customer.name || customer.email || 'U')
                    .charAt(0)
                    .toUpperCase()}
                </div>

                <div className="admin-customer-info">
                  <h3>{customer.name}</h3>
                  <p>{customer.email}</p>
                  <span
                    className={
                      customer.role === 'admin'
                        ? 'admin-role admin-role-admin'
                        : 'admin-role'
                    }
                  >
                    {customer.role || 'user'}
                  </span>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>

      <section className="admin-section">
        <div className="admin-section-heading">
          <div>
            <span className="admin-section-kicker">SALES MANAGEMENT</span>
            <h2>Orders</h2>
            <p>Review customer purchases and order details.</p>
          </div>
          <span className="admin-count">{orders.length} orders</span>
        </div>

        {orders.length === 0 ? (
          <div className="admin-empty">
            <span>📋</span>
            <h3>No orders yet</h3>
            <p>Customer orders will appear here after checkout.</p>
          </div>
        ) : (
          <div className="admin-orders-list">
            {orders.map((order) => (
              <article className="admin-order-card" key={order._id}>
                <div className="admin-order-top">
                  <div>
                    <span className="admin-order-label">ORDER ID</span>
                    <h3>#{order._id.slice(-6).toUpperCase()}</h3>
                  </div>

                  <span className={getStatusClass(order.status)}>
                    {order.status || 'Pending'}
                  </span>
                </div>

                <div className="admin-order-details">
                  <div>
                    <span>Customer</span>
                    <strong>{order.customerName || '—'}</strong>
                  </div>
                  <div>
                    <span>Phone</span>
                    <strong>{order.phone || '—'}</strong>
                  </div>
                  <div>
                    <span>Payment method</span>
                    <strong>{order.paymentMethod || '—'}</strong>
                  </div>
                  <div>
                    <span>Order total</span>
                    <strong className="admin-order-price">
                      {formatPrice(order.totalAmount)}
                    </strong>
                  </div>
                </div>

                <div className="admin-order-address">
                  <span>Delivery address</span>
                  <p>{order.address || 'No address provided'}</p>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}

export default AdminPanel;
