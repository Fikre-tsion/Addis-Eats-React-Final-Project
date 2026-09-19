import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AuthProvider } from './auth/AuthContext';
import Login from './auth/Login';
import RequireAuth from './auth/RequireAuth';
import { CartProvider } from './cart/cartStore';
import Checkout from './checkout/Checkout';
import Home from './menu/Home';
import Menu from './menu/Menu';
import DishDetail from './menu/DishDetail';
import Layout from './ui/Layout';
import NotFound from './ui/NotFound';

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="menu" element={<Menu />} />
              <Route path="menu/:dishId" element={<DishDetail />} />
              <Route
                path="checkout"
                element={
                  <RequireAuth>
                    <Checkout />
                  </RequireAuth>
                }
              />
              <Route path="login" element={<Login />} />
              <Route path="*" element={<NotFound />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  );
}
