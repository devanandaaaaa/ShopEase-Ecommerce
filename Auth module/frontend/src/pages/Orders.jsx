
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import authService from '../services/api';

function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cancellingOrderId, setCancellingOrderId] = useState(null);

  const loadOrders = async () => {
    try {
      const data = await authService.getMyOrders();
      setOrders(data);
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          'Failed to load orders'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  const cancelOrder = async (orderId) => {
    const confirmed = window.confirm(
      'Are you sure you want to cancel this order?'
    );

    if (!confirmed) return;

    try {
      setCancellingOrderId(orderId);

      const data = await authService.cancelOrder(orderId);

      setOrders((currentOrders) =>
        currentOrders.map((order) =>
          order._id === orderId ? data.order : order
        )
      );

      toast.success('Order cancelled successfully');
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          'Failed to cancel order'
      );
    } finally {
      setCancellingOrderId(null);
    }
  };

  const getStatusClass = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending':
        return 'status-pending';
      case 'shipped':
        return 'status-shipped';
      case 'delivered':
        return 'status-delivered';
      case 'cancelled':
        return 'status-cancelled';
      default:
        return 'status-default';
    }
  };

  if (loading) {
    return (
      <main className="orders-page">
        <div className="orders-loading">
          <div className="orders-spinner" />
          <p>Loading your orders...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="orders-page">
      <header className="orders-header">
        <div>
          <p className="orders-eyebrow">YOUR ACCOUNT</p>
          <h1>My Orders</h1>
          <p className="orders-subtitle">
            Keep track of your purchases and order status.
          </p>
        </div>

        <div className="orders-count">
          <span>{orders.length}</span>
          <span>
            {orders.length === 1 ? 'Order' : 'Orders'}
          </span>
        </div>
      </header>

      {orders.length === 0 ? (
        <section className="orders-empty">
          <div className="orders-empty-icon">📦</div>
          <h2>No orders yet</h2>
          <p>
            You haven't placed any orders yet. Your purchases
            will appear here once you place an order.
          </p>
          <button
            className="orders-shop-button"
            onClick={() => {
              window.location.href = '/';
            }}
          >
            Continue Shopping
          </button>
        </section>
      ) : (
        <section className="orders-list">
          {orders.map((order) => (
            <article className="order-card" key={order._id}>
              <div className="order-card-header">
                <div>
                  <p className="order-label">ORDER ID</p>
                  <h2>
                    #{order._id.slice(-6).toUpperCase()}
                  </h2>
                </div>

                <span
                  className={`order-status ${getStatusClass(
                    order.status
                  )}`}
                >
                  {order.status || 'Unknown'}
                </span>
              </div>

              <div className="order-meta">
                <div>
                  <span className="order-meta-label">
                    Order date
                  </span>
                  <span className="order-meta-value">
                    {order.createdAt
                      ? new Date(
                          order.createdAt
                        ).toLocaleDateString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        })
                      : 'Not available'}
                  </span>
                </div>

                <div>
                  <span className="order-meta-label">
                    Items
                  </span>
                  <span className="order-meta-value">
                    {order.items.reduce(
                      (total, item) =>
                        total + Number(item.quantity || 0),
                      0
                    )}
                  </span>
                </div>
              </div>

              <div className="order-items">
                {order.items.map((item, index) => (
                  <div
                    className="order-item"
                    key={`${item.productId || item.name}-${index}`}
                  >
                    <div className="order-item-image">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                        />
                      ) : (
                        <span>🛍️</span>
                      )}
                    </div>

                    <div className="order-item-details">
                      <h3>{item.name}</h3>
                      <p>
                        Quantity: {item.quantity}
                      </p>
                      <p className="order-item-price">
                        ₹{Number(item.price || 0).toLocaleString(
                          'en-IN'
                        )} each
                      </p>
                    </div>

                    <div className="order-item-subtotal">
                      ₹
                      {(
                        Number(item.price || 0) *
                        Number(item.quantity || 0)
                      ).toLocaleString('en-IN')}
                    </div>
                  </div>
                ))}
              </div>

              <footer className="order-card-footer">
                <div className="order-total">
                  <span>Total amount</span>
                  <strong>
                    ₹
                    {Number(
                      order.totalAmount || 0
                    ).toLocaleString('en-IN')}
                  </strong>
                </div>

                {order.status?.toLowerCase() !== 'cancelled' &&
                  order.status?.toLowerCase() !== 'shipped' &&
                  order.status?.toLowerCase() !== 'delivered' && (
                    <button
                      className="order-cancel-button"
                      onClick={() => cancelOrder(order._id)}
                      disabled={cancellingOrderId === order._id}
                    >
                      {cancellingOrderId === order._id
                        ? 'Cancelling...'
                        : 'Cancel Order'}
                    </button>
                  )}
              </footer>
            </article>
          ))}
        </section>
      )}
    </main>
  );
}

export default Orders;
