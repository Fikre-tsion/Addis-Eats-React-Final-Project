import { createContext, useContext, useEffect, useMemo, useState } from 'react';

const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('addis-eats-cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('addis-eats-cart', JSON.stringify(cart));
  }, [cart]);

  const addItem = (dish) => {
    setCart((previous) => {
      const existingItem = previous.find((item) => item.id === dish.id);

      if (existingItem) {
        return previous.map((item) =>
          item.id === dish.id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      }

      return [...previous, { ...dish, quantity: 1 }];
    });
  };

  const updateQuantity = (dishId, change) => {
    setCart((previous) =>
      previous
        .map((item) =>
          item.id === dishId ? { ...item, quantity: Math.max(0, item.quantity + change) } : item,
        )
        .filter((item) => item.quantity > 0),
    );
  };

  const removeItem = (dishId) => {
    setCart((previous) => previous.filter((item) => item.id !== dishId));
  };

  const clearCart = () => setCart([]);

  const itemCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const value = useMemo(
    () => ({
      cart,
      itemCount,
      subtotal,
      addItem,
      updateQuantity,
      removeItem,
      clearCart,
    }),
    [cart, itemCount, subtotal],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error('useCart must be used inside a CartProvider');
  }

  return context;
}
