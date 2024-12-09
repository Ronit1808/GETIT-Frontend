import React, { createContext, useState, useEffect } from "react";
import api from "../../api";
import {jwtDecode} from "jwt-decode";
import Loading from "../Loading";
import { useNavigate } from "react-router";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [cart, setCart] = useState({ items: [], summary: {} });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  const login = async (access, refresh) => {
    localStorage.setItem("access", access);
    localStorage.setItem("refresh", refresh);
    const redirectPath = sessionStorage.getItem("redirectPath") || "/";
      sessionStorage.removeItem("redirectPath");
     
    try {
      await fetchUserInfo(access);
      await fetchUserCart();
      navigate(redirectPath); 
    } catch (error) {
      console.error("Login failed:", error);
      logout();
    }
  };

  const logout = () => {
    setUser(null);
    sessionStorage.removeItem("redirectPath");
    navigate("/"); 
    setCart({ items: [], summary: {} });
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    localStorage.removeItem("cart_code");
  };

  const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem("refresh");
    if (!refreshToken) {
      logout();
      return;
    }

    try {
      const res = await api.post("token/refresh/", { refresh: refreshToken });
      const newAccessToken = res.data.access;
      localStorage.setItem("access", newAccessToken);
      await fetchUserInfo(newAccessToken);
      await fetchUserCart();
    } catch (error) {
      console.error("Failed to refresh token:", error);
      logout();
    }
  };

  const fetchUserInfo = async (accessToken) => {
    try {
      const res = await api.get("user_info/", {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      console.log(res.data)
      setUser(res.data);
      if (res.data.cart_code) {
        localStorage.setItem("cart_code", res.data.cart_code);
      } else {
        console.warn("Cart code not found in user info.");
      }
    } catch (error) {
      console.error("Failed to fetch user information:", error);
      logout();
    }
  };

  const fetchUserCart = async () => {
    const cartCode = localStorage.getItem("cart_code");
    if (!cartCode) {
      console.warn("No cart code found in localStorage.");
      setCart({ items: [], summary: {} });
      return;
    }

    try {
      const res = await api.get(`get_cart/?cart_code=${cartCode}`);
      console.log(res.data)
      setCart({
        items: res.data.items,
        summary: {
          totalPrice: res.data.cart_total_price,
          numOfItems: res.data.num_of_items,
        },
      });
    } catch (error) {
      console.error("Failed to fetch user cart:", error);
      setCart({ items: [], summary: {} });
    }
  };

  useEffect(() => {
    const initializeAuth = async () => {
      const accessToken = localStorage.getItem("access");
      if (accessToken) {
        try {
          const decoded = jwtDecode(accessToken);
          const currentTime = Date.now() / 1000;
          if (decoded.exp > currentTime) {
            await fetchUserInfo(accessToken);
            await fetchUserCart();
          } else {
            await refreshAccessToken();
          }
        } catch (error) {
          console.error("Error during token initialization:", error);
          logout();
        }
      }
      setLoading(false);
    };

    initializeAuth();
  }, []);

  if (loading) {
    return <Loading/>
  }

  return (
    <AuthContext.Provider value={{ user, cart, setCart, setUser , login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
