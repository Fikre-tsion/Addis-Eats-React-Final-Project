import { formatCurrency } from '../api/dishes';
import { useCart } from './cartStore';

export default function CartPanel() {
  const { cart, subtotal, updateQuantity, removeItem, clearCart } = useCart();

  return (
    <aside className="cart-panel">
      <div className="cart-header-row">
        <h2>Your cart</h2>
        {cart.length > 0 ? (
          <button type="button" className="text-button" onClick={clearCart}>
            Clear all
          </button>
        ) : null}
      </div>

      {cart.length === 0 ? (
        <p className="empty-state compact">Your cart is empty. Add a few dishes to begin.</p>
      ) : (
        <>
          <div className="cart-items">
            {cart.map((item) => (
              <div key={item.id} className="cart-item">
                <div>
                  <h3>{item.name}</h3>
                  <p>{formatCurrency(item.price)} each</p>
                </div>

                <div className="cart-item-controls">
                  <div className="qty-control">
                    <button type="button" onClick={() => updateQuantity(item.id, -1)} aria-label={`Decrease ${item.name}`}>
                      −
                    </button>
                    <span>{item.quantity}</span>
                    <button type="button" onClick={() => updateQuantity(item.id, 1)} aria-label={`Increase ${item.name}`}>
                      +
                    </button>
                  </div>

                  <button type="button" className="text-button danger" onClick={() => removeItem(item.id)}>
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <span>Subtotal</span>
            <strong>{formatCurrency(subtotal)}</strong>
          </div>
        </>
      )}
    </aside>
  );
}
