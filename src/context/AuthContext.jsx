import { createContext, useState, useEffect } from "react";

export const AuthContext = createContext(null);

const STORAGE_KEY = "taskflow_user";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Au chargement de l'app, on vérifie si une session simulée existe déjà
  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      setUser(JSON.parse(stored));
    }
    setLoading(false);
  }, []);

  function login({ email, firstName = "Hounas", lastName = "" }) {
    const fakeUser = {
      email,
      firstName,
      lastName,
      role: "Frontend Developer",
      memberSince: "August 2026",
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(fakeUser));
    setUser(fakeUser);
  }

  function logout() {
    localStorage.removeItem(STORAGE_KEY);
    setUser(null);
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, loading, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}