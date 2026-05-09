import React, { createContext, useContext, useState, useEffect } from "react";
import { App } from "antd";
import { jwtDecode } from "jwt-decode";
import { api, getApiErrorMessage } from "../config/http";
import { buildUserFromDecoded, pickAccessToken } from "../config/authPayload";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const { message } = App.useApp();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("token"));

  // Load user from localStorage on mount
  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (storedToken) {
      try {
        const decodedToken = jwtDecode(storedToken);
        const storedUser = localStorage.getItem("user");
        const storedUserObj = storedUser ? JSON.parse(storedUser) : null;
        const userFromToken = buildUserFromDecoded(
          decodedToken,
          storedToken,
          "",
          storedUserObj?.roles || [],
        );
        setUser(userFromToken);
        setToken(storedToken);
        localStorage.setItem("user", JSON.stringify(userFromToken));
      } catch (error) {
        console.error("Error decoding token:", error);
        // If token is invalid, clear localStorage
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        localStorage.removeItem("tokenExpiration");
      }
    }
    setLoading(false);
  }, []);

  // Frontend validation for signup
  const validateSignup = (formData) => {
    const errors = {};

    // Username validation
    const username = (formData.username ?? formData.email ?? "").trim().toLowerCase();
    if (!username || username.length < 3) {
      errors.username = "Username must be at least 3 characters";
    } else if (username.length > 50) {
      errors.username = "Username must be less than 50 characters";
    }

    // Password validation (minimum 6 characters as per design)
    if (!formData.password || formData.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    } else if (formData.password.length > 128) {
      errors.password = "Password must be less than 128 characters";
    }

    if (!formData.confirmPassword) {
      errors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  };

  // Frontend validation for login
  const validateLogin = (formData) => {
    const errors = {};

    // Username validation (accept any text)
    if (!formData.email || formData.email.trim().length < 1) {
      errors.email = "Username is required";
    }

    // Password validation
    if (!formData.password || formData.password.length < 1) {
      errors.password = "Password is required";
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors,
    };
  };

  // Signup function
  const signup = async (formData) => {
    setLoading(true);

    try {
      // Frontend validation
      const validation = validateSignup(formData);
      if (!validation.isValid) {
        Object.values(validation.errors).forEach((error) => {
          message.error(error);
        });
        setLoading(false);
        return { success: false, errors: validation.errors };
      }

      // Prepare data for backend (Manager = يحتاج موافقة أدمن، Member = يفعّل مباشرة)
      const normalizedUsername = (formData.username ?? formData.email ?? "")
        .trim()
        .toLowerCase();
      const signupData = {
        userName: normalizedUsername,
        password: formData.password,
        firstName: formData.firstName,
        lastName: formData.lastName,
        age: formData.age,
        role: formData.role || "member",
      };

      await api.post("/api/auth/register", signupData);

      const isManager = formData.role === "manager";
      if (isManager) {
        message.success(
          "Account created. An administrator must approve your account before you can sign in.",
        );
        setLoading(false);
        return { success: true, requiresLogin: true, isManager: true };
      }

      message.success("Account created successfully. You can sign in now.");
      setLoading(false);
      return { success: true, requiresLogin: true, isManager: false };
    } catch (error) {
      console.log("Signup error:", error);
      let errorMsg = getApiErrorMessage(error, "Signup failed");

      const body = error.response?.data;
      if (
        import.meta.env.DEV &&
        body?.detail &&
        errorMsg &&
        !String(errorMsg).includes(String(body.detail))
      ) {
        errorMsg = `${errorMsg} (${body.detail})`;
      }

      message.error(errorMsg);
      setLoading(false);
      return { success: false, error: errorMsg };
    }
  };

  // Login function
  const login = async (formData) => {
    setLoading(true);

    try {
      const validation = validateLogin(formData);
      if (!validation.isValid) {
        Object.values(validation.errors).forEach((err) => message.error(err));
        setLoading(false);
        return { success: false, errors: validation.errors };
      }

      const { data } = await api.post("/api/auth/login", {
        userName: formData.email.trim().toLowerCase(),
        password: formData.password,
      });

      const accessToken = pickAccessToken(data);
      if (!accessToken) {
        message.error("Invalid response from server (missing token).");
        setLoading(false);
        return { success: false, error: "Missing token" };
      }

      const decodedToken = jwtDecode(accessToken);

      setToken(accessToken);
      localStorage.setItem("token", accessToken);

      if (data.expiration ?? data.Expiration) {
        localStorage.setItem(
          "tokenExpiration",
          String(data.expiration ?? data.Expiration),
        );
      }

      const userFromToken = buildUserFromDecoded(
        decodedToken,
        accessToken,
        formData.email.trim().toLowerCase(),
        data.roles || [],
      );
      setUser(userFromToken);
      localStorage.setItem("user", JSON.stringify(userFromToken));

      message.success("Login successful!");
      setLoading(false);
      return { success: true, user: userFromToken };
    } catch (error) {
      const errorMsg = getApiErrorMessage(error, "Login failed");
      const body = error.response?.data;
      if (
        import.meta.env.DEV &&
        body?.detail &&
        errorMsg &&
        !String(errorMsg).includes(String(body.detail))
      ) {
        message.error(`${errorMsg} (${body.detail})`);
      } else {
        message.error(errorMsg);
      }
      setLoading(false);
      return { success: false, error: errorMsg };
    }
  };

  // Logout function
  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    message.success("Logged out successfully");
  };

  const value = {
    user,
    token,
    loading,
    signup,
    login,
    logout,
    validateSignup,
    validateLogin,
    isAuthenticated: !!user,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
