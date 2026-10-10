
import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import authService from '../services/api';

function Checkout() {
  const navigate = useNavigate();

  const [cart, setCart] = useState(null);
  const [cartLoading, setCartLoading] = useState(true);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [phone, setPhone] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('COD');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let active = true;

    const checkCart = async () => {
      try {
        const data = await authService.getCart();

        if (!active) return;

        if (!data.items || data.items.length === 0) {
          toast.error('Your cart is empty');
          navigate('/cart');
          return;
        }

        setCart(data);
      } catch (error) {
        if (active) {
          toast.error('Failed to load cart');
          navigate('/cart');
        }
      } finally {
        if (active) setCartLoading(false);
      }
    };

    checkCart();

    return () => {
      active = false;
    };
  }, [navigate]);

  const items = cart?.items || [];
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const itemCount = items.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  const formatPrice = (price) =>
    `₹${Number(price).toLocaleString('en-IN')}`;

  const placeOrder = async (e) => {
    e.preventDefault();

    if (!name.trim() || !address.trim() || !phone.trim()) {
      toast.error('Please fill in all details');
      return;
    }

    if (!/^[0-9+\-\s()]{7,15}$/.test(phone.trim())) {
      toast.error('Please enter a valid phone number');
      return;
    }

    try {
      setLoading(true);

      await authService.createOrder({
        name: name.trim(),
        address: address.trim(),
        phone: phone.trim(),
        paymentMethod,
      });

      toast.success('Order placed successfully!');
      navigate('/orders');
    } catch (error) {
      toast.error(
        error.response?.data?.message || 'Failed to place order'
      );
    } finally {
      setLoading(false);
    }
  };

  if (cartLoading) {
    return (
      <main className="checkout-page">
        <div className="checkout-loading">
          <div className="cart-spinner" />
          <p>Preparing your checkout...</p>
        </div>
      </main>
    );
  }

  if (!cart?.items?.length) {
    return null;
  }

  return (
    <main className="checkout-page">
      <header className="checkout-header">
        <div>
          <p className="checkout-eyebrow">ALMOST THERE</p>
          <h1>Checkout <span>🛍️</span></h1>
          <p className="checkout-subtitle">
            Enter your delivery details to complete your order.
          </p>
        </div>

        <Link to="/cart" className="checkout-back-link">
          ← Back to cart
        </Link>
      </header>

      <div className="checkout-layout">
        <section className="checkout-form-card">
          <div className="checkout-section-heading">
            <span className="checkout-step">1</span>
            <div>
              <h2>Delivery Information</h2>
              <p>Where should we deliver your order?</p>
            </div>
          </div>

          <form onSubmit={placeOrder} className="checkout-form">
            <div className="checkout-field">
              <label htmlFor="checkoutName">Full Name</label>
              <input
                id="checkoutName"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter your full name"
                autoComplete="name"
                maxLength={100}
                required
              />
            </div>

            <div className="checkout-field">
              <label htmlFor="checkoutPhone">Phone Number</label>
              <input
                id="checkoutPhone"
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder="Enter your contact number"
                autoComplete="tel"
                maxLength={15}
                required
              />
              <small>Used for delivery-related communication.</small>
            </div>

            <div className="checkout-field">
              <label htmlFor="checkoutAddress">Delivery Address</label>
              <textarea
                id="checkoutAddress"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="House name/number, street, city, state and PIN code"
                rows={4}
                autoComplete="street-address"
                maxLength={500}
                required
              />
            </div>

            <div className="checkout-payment-section">
              <div className="checkout-section-heading">
                <span className="checkout-step">2</span>
                <div>
                  <h2>Payment Method</h2>
                  <p>Choose how you'd like to pay.</p>
                </div>
              </div>

              <label className="checkout-payment-option">
                <input
                  type="radio"
                  name="paymentMethod"
                  value="COD"
                  checked={paymentMethod === 'COD'}
                  onChange={(e) => setPaymentMethod(e.target.value)}
                />

                <span className="checkout-payment-icon">💵</span>

                <span className="checkout-payment-copy">
                  <strong>Cash on Delivery</strong>
                  <small>Pay when your order arrives.</small>
                </span>

                <span className="checkout-payment-selected">✓</span>
              </label>
            </div>

            <button
              className="checkout-place-order"
              type="submit"
              disabled={loading}
            >
              {loading ? 'Placing your order...' : 'Place Order'}
              {!loading && <span>→</span>}
            </button>

            <p className="checkout-secure-note">
              🔒 Your delivery details will be submitted securely.
            </p>
          </form>
        </section>

        <aside className="checkout-summary">
          <h2>Order Summary</h2>
          <p className="checkout-summary-caption">
            {itemCount} {itemCount === 1 ? 'item' : 'items'} in your order
          </p>

          <div className="checkout-summary-items">
            {items.map((item) => (
              <div className="checkout-summary-item" key={item.productId}>
                <div className="checkout-summary-image">
                  <img src={item.image} alt={item.name} />
                  <span>{item.quantity}</span>
                </div>

                <div className="checkout-summary-product">
                  <strong>{item.name}</strong>
                  <small>{item.category}</small>
                </div>

                <strong className="checkout-summary-item-price">
                  {formatPrice(item.price * item.quantity)}
                </strong>
              </div>
            ))}
          </div>

          <div className="checkout-price-row">
            <span>Subtotal</span>
            <strong>{formatPrice(total)}</strong>
          </div>

          <div className="checkout-price-row">
            <span>Shipping</span>
            <strong className="checkout-free">FREE</strong>
          </div>

          <div className="checkout-grand-total">
            <span>Total to pay</span>
            <strong>{formatPrice(total)}</strong>
          </div>

          <div className="checkout-summary-note">
            <span>📦</span>
            <p>
              Payment method: <strong>Cash on Delivery</strong>.
              Pay when the order is delivered.
            </p>
          </div>

          <Link to="/cart" className="checkout-edit-cart">
            Edit your cart
          </Link>
        </aside>
      </div>
    </main>
  );
}

export default Checkout;
