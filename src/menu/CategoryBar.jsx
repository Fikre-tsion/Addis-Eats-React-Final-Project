export default function CategoryBar({ categories, activeCategory, onSelect }) {
  return (
    <div className="category-bar" aria-label="Dish categories">
      {categories.map((category) => (
        <button
          key={category}
          type="button"
          className={category === activeCategory ? 'category-pill active' : 'category-pill'}
          onClick={() => onSelect(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
}
