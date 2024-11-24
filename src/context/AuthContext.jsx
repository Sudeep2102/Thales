import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext(null);

// Initialize database from localStorage or with default user
const initializeDatabase = () => {
  const storedUsers = localStorage.getItem('users');
  if (storedUsers) {
    return JSON.parse(storedUsers);
  }
  // Default demo user
  const defaultUsers = [{
    email: 'demo@company.com',
    password: 'demo123',
    companyName: 'EcoTech Solutions',
  }];
  localStorage.setItem('users', JSON.stringify(defaultUsers));
  return defaultUsers;
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('currentUser');
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [users, setUsers] = useState(initializeDatabase);

  // Persist user data
  useEffect(() => {
    if (user) {
      localStorage.setItem('currentUser', JSON.stringify(user));
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [user]);

  // Persist users database
  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  const login = (email, password) => {
    const foundUser = users.find(
      (u) => u.email === email && u.password === password
    );
    if (foundUser) {
      setUser(foundUser);
      return true;
    }
    return false;
  };

  const register = (email, password, companyName) => {
    // Check if user already exists
    if (users.some(u => u.email === email)) {
      return { success: false, error: 'Email already registered' };
    }

    const newUser = { email, password, companyName };
    setUsers(prev => [...prev, newUser]);
    setUser(newUser);
    return { success: true };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => useContext(AuthContext);