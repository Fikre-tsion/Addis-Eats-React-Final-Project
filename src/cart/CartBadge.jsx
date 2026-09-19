import { Link } from 'react-router-dom';
import { useCart } from './cartStore';

export default function CartBadge() {
  const { itemCount } = useCart();

  return (
    <Link to="/checkout" className="cart-badge" aria-label="Cart">
      <span>Cart</span>
      {itemCount > 0 ? <span className="cart-count">{itemCount}</span> : null}
    </Link>
  );
}
