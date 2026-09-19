import { useMemo, useState } from 'react';
import useFetch from '../hooks/useFetch';
import CategoryBar from './CategoryBar';
import DishList from './DishList';

export default function Menu() {
  const { data: dishes, loading, error } = useFetch('/dishes.json');
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = useMemo(() => {
    if (!dishes) {
      return ['All'];
    }

    return ['All', ...new Set(dishes.map((dish) => dish.category))];
  }, [dishes]);

  const visibleDishes =
    !dishes || activeCategory === 'All'
      ? dishes || []
      : dishes.filter((dish) => dish.category === activeCategory);

  return (
    <section className="menu-page">
      <div className="section-header menu-header">
        <div>
          <p className="eyebrow">Our kitchen</p>
          <h1>Menu</h1>
        </div>
      </div>

      <CategoryBar categories={categories} activeCategory={activeCategory} onSelect={setActiveCategory} />

      {loading ? <p>Loading menu...</p> : null}
      {error ? <p className="form-error">{error}</p> : null}

      {!loading && !error && visibleDishes.length === 0 ? (
        <p className="empty-state">No dishes available in this category yet.</p>
      ) : null}

      {!loading && !error && visibleDishes.length > 0 ? <DishList dishes={visibleDishes} /> : null}
    </section>
  );
}
