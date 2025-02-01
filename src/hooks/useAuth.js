// src/hooks/useAuth.js
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginSuccess, logout } from "../store/authSlice";
export const useAuth = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isAuthenticated, user } = useSelector((state) => state.auth);

  useEffect(() => {
    // Check for stored token on mount
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");

    if (token && userData) {
      try {
        const parsedUser = JSON.parse(userData);
        dispatch(loginSuccess({ user: parsedUser, token }));
      } catch (error) {
        console.error("Failed to parse user data:", error);
        localStorage.removeItem("user"); // Clear invalid data
      }
    }
  }, [dispatch]);

  const handleLogin = async (credentials) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      const data = await response.json();

      if (response.ok) {
        if (!data.datas) throw new Error("Invalid user data");

        localStorage.setItem("token", data.accessToken);
        localStorage.setItem("user", JSON.stringify(data.datas));
        dispatch(loginSuccess({ user: data.datas, token: data.accessToken }));
        navigate("/");
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      console.error("Login Error:", error);
      throw error;
    }
  };


  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    dispatch(logout());
    navigate("/login");
  };

  const handleRegister = async (userData) => {
    try {
      const response = await fetch(`${process.env.REACT_APP_API_URL}/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (response.ok) {
        navigate("/login");
      } else {
        throw new Error(data.message);
      }
    } catch (error) {
      throw error;
    }
  };


  return {
    isAuthenticated,
    user,
    login: handleLogin,
    logout: handleLogout,
    register: handleRegister,
  };
};

export default useAuth;
