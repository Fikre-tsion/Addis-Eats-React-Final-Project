import { Link } from 'react-router-dom';
import { formatCurrency } from '../api/dishes';
import { useCart } from '../cart/cartStore';

export default function DishCard({ dish }) {
  const { addItem } = useCart();

  return (
    <article className="dish-card">
      <div className="dish-thumb">
        <img src={dish.image} alt={dish.name} />
      </div>

      <div className="dish-body">
        <div className="dish-header-row">
          <div>
            <p className="dish-category">{dish.category}</p>
            <h3>{dish.name}</h3>
          </div>
          <strong>{formatCurrency(dish.price)}</strong>
        </div>

        <p className="dish-description">{dish.description}</p>

        <div className="dish-actions">
          <Link to={`/menu/${dish.id}`} className="text-link">
            View details
          </Link>
          <button type="button" className="primary-button" onClick={() => addItem(dish)}>
            Add to cart
          </button>
        </div>
      </div>
    </article>
  );
}
