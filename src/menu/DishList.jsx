import DishCard from './DishCard';

export default function DishList({ dishes }) {
  return (
    <div className="dish-grid">
      {dishes.map((dish) => (
        <DishCard key={dish.id} dish={dish} />
      ))}
    </div>
  );
}
