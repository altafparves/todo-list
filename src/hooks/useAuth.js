// src/hooks/useAuth.js
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginSuccess, logout } from "../store/slices/authSlice";

export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  useEffect(() => {
    // Check for stored token on mount
    const token = localStorage.getItem("token");
    if (token) {
      // Validate token here if needed
      const userData = JSON.parse(localStorage.getItem("user"));
      dispatch(loginSuccess({ user: userData, token }));
    }
  }, [dispatch]);

  const handleLogin = async (credentials) => {
    try {
      // Add your login API call here
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        dispatch(loginSuccess(data));
        navigate("/dashboard");
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      throw error;
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch(logout());
    navigate("/login");
  };

  return {
    isAuthenticated,
    user,
    login: handleLogin,
    logout: handleLogout,
  };
};

export default useAuth;
