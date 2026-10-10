
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import authService from '../services/api';

function Cart() {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const loadCart = async () => {
    try {
      const data = await authService.getCart();
      setCart(data);
    } catch (error) {
      toast.error(
        error.response?.data?.message || 'Failed to load cart'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadCart();
  }, []);

  const updateQuantity = async (productId, quantity) => {
    if (quantity < 1) return;

    try {
      const data = await authService.updateCartItem(
        productId,
        quantity
      );
      setCart(data.cart);
    } catch (error) {
      toast.error(
        error.response?.data?.message || 'Failed to update cart'
      );
    }
  };

  const removeItem = async (productId) => {
    try {
      const data = await authService.removeFromCart(productId);
      setCart(data.cart);
      toast.success('Product removed from cart');
    } catch (error) {
      toast.error(
        error.response?.data?.message || 'Failed to remove product'
      );
    }
  };

  const items = cart?.items || [];

  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const formatPrice = (price) =>
    `₹${Number(price).toLocaleString('en-IN')}`;

  if (loading) {
    return (
      <main className="cart-page">
        <div className="cart-loading">
          <div className="cart-spinner" />
          <p>Loading your shopping cart...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="cart-page">
      <div className="cart-heading">
        <div>
          <p className="cart-eyebrow">YOUR SHOPPING BAG</p>
          <h1>Shopping Cart <span>🛒</span></h1>
          <p className="cart-subtitle">
            Review your items before placing your order.
          </p>
        </div>

        <Link to="/" className="cart-continue-link">
          ← Continue shopping
        </Link>
      </div>

      {items.length === 0 ? (
        <section className="cart-empty">
          <div className="cart-empty-icon">🛍️</div>
          <h2>Your cart is waiting for you</h2>
          <p>
            Looks like you haven't added anything yet.
            Explore our products and find something you love.
          </p>
          <Link to="/" className="cart-primary-button">
            Explore products
          </Link>
        </section>
      ) : (
        <div className="cart-layout">
          <section className="cart-products">
            <div className="cart-section-heading">
              <h2>Your items</h2>
              <span>{items.length} {items.length === 1 ? 'item' : 'items'}</span>
            </div>

            {items.map((item) => (
              <article className="cart-item" key={item.productId}>
                <div className="cart-product-image">
                  <img src={item.image} alt={item.name} />
                </div>

                <div className="cart-product-info">
                  <span className="cart-product-category">
                    {item.category}
                  </span>

                  <h3>{item.name}</h3>

                  <p className="cart-unit-price">
                    {formatPrice(item.price)} <span>/ item</span>
                  </p>

                  <button
                    className="cart-remove-button"
                    onClick={() => removeItem(item.productId)}
                  >
                    <span aria-hidden="true">×</span> Remove
                  </button>
                </div>

                <div className="cart-item-actions">
                  <span className="cart-action-label">Quantity</span>

                  <div className="cart-quantity">
                    <button
                      aria-label={`Decrease ${item.name} quantity`}
                      onClick={() =>
                        updateQuantity(item.productId, item.quantity - 1)
                      }
                      disabled={item.quantity <= 1}
                    >
                      −
                    </button>

                    <span>{item.quantity}</span>

                    <button
                      aria-label={`Increase ${item.name} quantity`}
                      onClick={() =>
                        updateQuantity(item.productId, item.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </div>

                  <strong className="cart-line-total">
                    {formatPrice(item.price * item.quantity)}
                  </strong>
                </div>
              </article>
            ))}
          </section>

          <aside className="cart-summary">
            <h2>Order summary</h2>

            <div className="cart-summary-row">
              <span>Subtotal ({items.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
              <strong>{formatPrice(total)}</strong>
            </div>

            <div className="cart-summary-row">
              <span>Shipping</span>
              <strong className="cart-free-shipping">FREE</strong>
            </div>

            <p className="cart-shipping-note">
              Shipping charges, if applicable, will be confirmed at checkout.
            </p>

            <div className="cart-summary-total">
              <span>Total</span>
              <strong>{formatPrice(total)}</strong>
            </div>

            <button
              className="cart-checkout-button"
              onClick={() => navigate('/checkout')}
            >
              Proceed to Checkout <span>→</span>
            </button>

            <div className="cart-trust-note">
              <span>🔒</span>
              <p>Secure checkout<br />Your order details are protected.</p>
            </div>
          </aside>
        </div>
      )}
    </main>
  );
}

export default Cart;
