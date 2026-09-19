import { createContext, useContext, useMemo, useState } from 'react';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('addis-eats-user');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const login = (email) => {
    const nextUser = {
      email,
      name: email.split('@')[0],
    };

    setUser(nextUser);
    localStorage.setItem('addis-eats-user', JSON.stringify(nextUser));
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('addis-eats-user');
  };

  const value = useMemo(
    () => ({
      user,
      login,
      logout,
      isAuthenticated: Boolean(user),
    }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error('useAuth must be used inside an AuthProvider');
  }

  return context;
}
