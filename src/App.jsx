import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Home from "./components/pages/home/Home";
import Product from "./components/pages/product/Product";
import api from "./api";
import Cart from "./components/pages/cart/Cart";
import Checkout from "./components/pages/checkout/Checkout";
import Login from "./components/pages/user/Login";
import ProtectedRoute from "./components/ProtectedRoute";
import { AuthProvider } from "./components/context/AuthContext";
import Signup from "./components/pages/user/SignUp";
import UserProfile from "./components/userProfile/UserProfile";
import PaymentSuccess from "./components/pages/checkout/PaymentSuccess";
function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="products/:slug" element={<Product />} />
            <Route path="cart" element={<ProtectedRoute><Cart /></ProtectedRoute>} />
            <Route path="checkout" element={<ProtectedRoute><Checkout /></ProtectedRoute>} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="profile" element={<ProtectedRoute><UserProfile /></ProtectedRoute>} />
            <Route path="payment-success" element={<PaymentSuccess />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
