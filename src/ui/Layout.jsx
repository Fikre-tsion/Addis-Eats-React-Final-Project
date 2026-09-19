import { NavLink, Outlet } from 'react-router-dom';
import CartBadge from '../cart/CartBadge';
import { useAuth } from '../auth/AuthContext';

export default function Layout() {
  const { user, logout } = useAuth();

  return (
    <div className="app-shell">
      <header className="topbar">
        <div className="brand-wrap">
          <NavLink to="/" className="brand">
            Addis Eats
          </NavLink>
        </div>

        <nav className="main-nav" aria-label="Main navigation">
          <NavLink to="/" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            Home
          </NavLink>
          <NavLink to="/menu" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            Menu
          </NavLink>
          <NavLink to="/checkout" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>
            Checkout
          </NavLink>
        </nav>

        <div className="nav-actions">
          <CartBadge />

          {user ? (
            <div className="user-menu">
              <span className="user-label">Hi, {user.name}</span>
              <button type="button" className="secondary-button" onClick={logout}>
                Logout
              </button>
            </div>
          ) : (
            <NavLink to="/login" className="secondary-button">
              Login
            </NavLink>
          )}
        </div>
      </header>

      <main className="page-content">
        <Outlet />
      </main>
    </div>
  );
}
