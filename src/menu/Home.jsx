import { Link } from 'react-router-dom';
import useFetch from '../hooks/useFetch';
import DishCard from './DishCard';

export default function Home() {
  const { data: dishes, loading, error } = useFetch('/dishes.json');

  const featuredDishes = dishes ? dishes.slice(0, 3) : [];

  return (
    <section className="home-page">
      <div className="hero">
        <div className="hero-copy">
          <p className="eyebrow">Freshly served</p>
          <h1>Authentic Ethiopian comfort food, delivered to your table.</h1>
          <p>
            Explore our signature platters, aromatic stews, and hand-crafted breads inspired by the warmth of Addis Ababa.
          </p>

          <div className="hero-actions">
            <Link to="/menu" className="primary-button">
              Explore menu
            </Link>
            <Link to="/checkout" className="secondary-button">
              Checkout
            </Link>
          </div>
        </div>

        <div className="hero-visual" aria-label="Featured dish illustration">
          <div className="plate-card">
            <span className="badge">Chef's special</span>
            <h2>Doro Wat</h2>
            <p>Slow-cooked chicken stew with berbere, onions, and injera.</p>
          </div>
        </div>
      </div>

      <div className="feature-row">
        <div className="feature-box">
          <strong>Fast delivery</strong>
          <span>Within 30 minutes</span>
        </div>
        <div className="feature-box">
          <strong>Fresh ingredients</strong>
          <span>Picked daily</span>
        </div>
        <div className="feature-box">
          <strong>Family style</strong>
          <span>Shareable platters</span>
        </div>
      </div>

      <div className="section-header">
        <div>
          <p className="eyebrow">Popular picks</p>
          <h2>Featured dishes</h2>
        </div>
        <Link to="/menu" className="text-link">
          See full menu
        </Link>
      </div>

      {loading ? <p>Loading menu...</p> : null}
      {error ? <p className="form-error">{error}</p> : null}

      {!loading && !error ? (
        <div className="dish-grid">
          {featuredDishes.map((dish) => (
            <DishCard key={dish.id} dish={dish} />
          ))}
        </div>
      ) : null}
    </section>
  );
}
