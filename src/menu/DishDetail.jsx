import { Link, useParams } from 'react-router-dom';
import { formatCurrency } from '../api/dishes';
import { useCart } from '../cart/cartStore';
import useFetch from '../hooks/useFetch';

export default function DishDetail() {
  const { dishId } = useParams();
  const { data: dishes, loading, error } = useFetch('/dishes.json');
  const { addItem } = useCart();

  const dish = dishes?.find((item) => String(item.id) === String(dishId));

  if (loading) {
    return <p>Loading dish...</p>;
  }

  if (error) {
    return <p className="form-error">{error}</p>;
  }

  if (!dish) {
    return (
      <section className="detail-page empty-state">
        <h1>Dish not found</h1>
        <Link to="/menu" className="primary-button">
          Back to menu
        </Link>
      </section>
    );
  }

  return (
    <section className="detail-page">
      <Link to="/menu" className="back-link">
        ← Back to menu
      </Link>

      <div className="dish-detail-layout">
        <div className="dish-detail-art" aria-hidden="true">
          <span>{dish.emoji}</span>
        </div>

        <div className="dish-detail-copy">
          <p className="eyebrow">{dish.category}</p>
          <h1>{dish.name}</h1>
          <p className="price-tag">{formatCurrency(dish.price)}</p>
          <p>{dish.description}</p>
          <ul className="dish-meta">
            <li>Freshly prepared</li>
            <li>Served with authentic flavor</li>
            <li>Perfect for sharing</li>
          </ul>

          <button type="button" className="primary-button" onClick={() => addItem(dish)}>
            Add to cart
          </button>
        </div>
      </div>
    </section>
  );
}
