import { createContext, useState, useEffect } from "react";
import { db } from "../services/db";

export const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const email = db.getSession();
    if (email) {
      const existing = db.getUser(email);
      if (existing) setUser(existing);
    }
    setLoading(false);
  }, []);

  function login({ email, password }) {
    const existing = db.getUser(email);
    if (!existing) {
      throw new Error("Aucun compte trouvé avec cet email.");
    }
    if (existing.password !== password) {
      throw new Error("Mot de passe incorrect.");
    }
    db.setSession(email);
    setUser(existing);
    return existing;
  }

  function register({ email, password, firstName, lastName }) {
    const newUser = db.createUser({ email, password, firstName, lastName });
    db.setSession(email);
    setUser(newUser);
    return newUser;
  }

  function logout() {
    db.clearSession();
    setUser(null);
  }

  function updateProfile(changes) {
    const updated = db.updateUser(user.email, changes);
    setUser(updated);
    return updated;
  }

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated: !!user, loading, login, register, logout, updateProfile }}
    >
      {children}
    </AuthContext.Provider>
  );
}