import React, { useContext, useState, useEffect } from "react";
import api from "../../../api";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Loading from "../../Loading";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, user } = useContext(AuthContext); 
  const [error, setError] = useState("");
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const handleLogin = async (e) => {
    e.preventDefault();
    const userInfo = { username, password };

    setIsLoggingIn(true); 
    try {
      const res = await api.post("token/", userInfo);
      login(res.data.access, res.data.refresh); // Call the login method with tokens
    } catch (err) {
      setError("Invalid username or password");
      console.error("Login error:", err.response?.data || err.message);
    }finally {
      setIsLoggingIn(false); 
    }
  };

  useEffect(() => {
    // Redirect the user after login if `user` exists
    if (user) {
      const from = location.state?.from || "/";
      navigate(from, { replace: true });
    }
  }, [user, navigate, location.state]);

  if (isLoggingIn) {
    return <Loading/>; 
  }


  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="bg-white shadow-lg rounded-lg p-8 max-w-sm w-full">
        <h2 className="text-2xl font-semibold text-center mb-2 text-gray-800">
          Welcome Back
        </h2>
        <h3 className="text-xl text-center mb-6 text-gray-800">
          Please login to your account
        </h3>
        {error && (
          <div className="mb-4 p-2 bg-red-100 text-red-600 rounded-md text-sm">
            {error}
          </div>
        )}
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label
              htmlFor="username"
              className="block text-sm font-medium mb-2 text-gray-700"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              className="mt-1 w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-2 text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 w-full px-4 py-2 border mb-3 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
          >
            Login
          </button>
        </form>
        <p className="mt-4 text-center text-sm text-gray-600">
          <a href="#" className="text-indigo-600 hover:underline">
            Forgot Password?
          </a>
        </p>
        <p className="mt-1 text-center text-sm text-gray-600">
          Don’t have an account?{" "}
          <Link to="/signup" className="text-indigo-600 hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
