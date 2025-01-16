import React, { createContext, useState, useContext, useEffect } from "react";
import jwt_decode from "jwt-decode";

// Create the AuthContext
export const AuthContext = createContext({
  user: null,
  handleLogin: () => {},
  handleLogout: () => {},
  isAuthenticated: false,
});

// AuthProvider Component
export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decodedUser = jwt_decode(token);
        const isExpired = decodedUser.exp * 1000 < Date.now();
        return isExpired ? null : decodedUser;
      } catch (error) {
        console.error("Invalid token:", error);
        return null;
      }
    }
    return null;
  });

  const handleLogin = (token) => {
    try {
      const decodedUser = jwt_decode(token);
      localStorage.setItem("userId", decodedUser.sub);
      localStorage.setItem("userRole", decodedUser.roles);
      localStorage.setItem("token", token);
      setUser(decodedUser);
    } catch (error) {
      console.error("Failed to decode token:", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("userId");
    localStorage.removeItem("userRole");
    localStorage.removeItem("token");
    setUser(null);
  };

  const isAuthenticated = Boolean(user);

  useEffect(() => {
    // Optionally, you can implement token refresh logic here
    console.log("Auth state updated:", user);
  }, [user]);

  return (
    <AuthContext.Provider value={{ user, handleLogin, handleLogout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom Hook to Access AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
