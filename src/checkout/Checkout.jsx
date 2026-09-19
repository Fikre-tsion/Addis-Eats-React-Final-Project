import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { formatCurrency } from '../api/dishes';
import { useAuth } from '../auth/AuthContext';
import CartPanel from '../cart/CartPanel';
import { useCart } from '../cart/cartStore';
import Field from './Field';
import { validateCheckout } from './validate';

export default function Checkout() {
  const { user } = useAuth();
  const { cart, subtotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [values, setValues] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    address: '',
    phone: '',
    notes: '',
  });
  const [errors, setErrors] = useState({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const deliveryFee = cart.length > 0 ? 4.5 : 0;
  const total = subtotal + deliveryFee;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setValues((previous) => ({ ...previous, [name]: value }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const nextErrors = validateCheckout(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setIsSubmitted(true);
    clearCart();
  };

  if (cart.length === 0 && !isSubmitted) {
    return (
      <section className="checkout-layout">
        <div className="checkout-form empty-state">
          <h2>Your cart is empty</h2>
          <p>Add a few dishes before checking out.</p>
          <Link to="/menu" className="primary-button">
            Browse menu
          </Link>
        </div>
      </section>
    );
  }

  if (isSubmitted) {
    return (
      <section className="not-found">
        <div className="error-card">
          <p className="eyebrow">Order confirmed</p>
          <h1>Thank you for your order!</h1>
          <p>Your food is being prepared and will arrive soon.</p>
          <button type="button" className="primary-button" onClick={() => navigate('/menu')}>
            Keep browsing
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="checkout-layout">
      <form className="checkout-form" onSubmit={handleSubmit} noValidate>
        <h2>Delivery details</h2>

        <div className="checkout-grid">
          <div className="full-span">
            <Field
              label="Full name"
              name="fullName"
              value={values.fullName}
              onChange={handleChange}
              error={errors.fullName}
              placeholder="Your name"
            />
          </div>

          <div className="full-span">
            <Field
              label="Email"
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              error={errors.email}
              placeholder="you@example.com"
            />
          </div>

          <div className="full-span">
            <Field
              label="Street address"
              name="address"
              value={values.address}
              onChange={handleChange}
              error={errors.address}
              placeholder="123 Addis Ababa Street"
            />
          </div>

          <div className="full-span">
            <Field
              label="Phone number"
              name="phone"
              type="tel"
              value={values.phone}
              onChange={handleChange}
              error={errors.phone}
              placeholder="+251 911 123456"
            />
          </div>

          <div className="full-span">
            <label className="field-group">
              <span>Order notes</span>
              <textarea
                name="notes"
                value={values.notes}
                onChange={handleChange}
                placeholder="Optional notes for the kitchen or driver"
              />
            </label>
          </div>
        </div>

        <button type="submit" className="primary-button full-width" style={{ marginTop: '1rem' }}>
          Place order · {formatCurrency(total)}
        </button>
      </form>

      <CartPanel />
    </section>
  );
}
