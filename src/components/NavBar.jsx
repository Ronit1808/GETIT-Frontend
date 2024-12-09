import React, { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaUserCircle } from "react-icons/fa"; // Cart and User icons
import { HiMenu, HiX } from "react-icons/hi"; // Hamburger menu
import { AuthContext } from "./context/AuthContext";
import { BiJoystick } from "react-icons/bi";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const { user, cart, logout } = useContext(AuthContext); // Access user and logout from AuthContext

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleProfile = () => setIsProfileOpen(!isProfileOpen);

  const isLoggedIn = !!user; // Determine if the user is logged in

  return (
    <nav className="bg-white shadow-md top-0 sticky z-10">
      <div className="max-w-8xl mx-4 my-1 px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold">
              GETIT
            </Link>
            <span className="text-3xl pt-1 ml-2">
              <BiJoystick />
            </span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden text-lg pr-2 md:flex space-x-6 items-center">
            {["Home", "Contact", "Store", "About"].map((item, index) => (
              <Link
                key={index}
                to='/'
                className="hover:bg-gray-800 hover:text-white px-4 py-2 rounded-full transition-colors duration-300"
              >
                {item}
              </Link>
            ))}
            <Link
              to="/cart"
              className="text-3xl relative flex items-center"
            >
              <FaShoppingCart className="mr-1 hover:opacity-40" />
              {cart.summary?.numOfItems > 0 && (
                <span className="absolute text-white bg-blue-600 text-xs rounded-xl pt-0.5 w-5 h-5 text-center -top-2 -right-2">
                  {cart.summary.numOfItems}
                </span>
              )}
            </Link>
            
            
            {isLoggedIn ? (
              <div className="relative">
                <button
                  onClick={toggleProfile}
                  className="flex items-center focus:outline-none hover:text-gray-500"
                >
                  <FaUserCircle className="text-3xl" />
                </button>
               
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white shadow-lg rounded-md">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm hover:bg-gray-100"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      Profile
                    </Link>
                    <button
                      onClick={() => {
                        logout();
                        setIsProfileOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <Link
                to="/login"
                className=" bg-gray-800 text-white py-2 px-4 rounded-full hover:bg-gray-500"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button onClick={toggleMenu} aria-label="Menu">
              {isMenuOpen ? <HiX size={24} /> : <HiMenu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Dropdown Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {["Home", "Contact", "Store", "About"].map((item, index) => (
              <Link
                key={index}
                to='/'
                className="block px-3 py-2 hover:bg-gray-800 hover:text-white rounded-full transition-colors duration-300"
              >
                {item}
              </Link>
            ))}
            <Link
              to="/cart"
              className="block px-3 py-2 hover:bg-gray-800 hover:text-white rounded-full transition-colors duration-300 items-center"
            >
              Cart
            </Link>
            {isLoggedIn ? (
              <>
                <Link
                  to="/profile"
                  className="block px-3 py-2 hover:bg-gray-800 hover:text-white rounded-full transition-colors duration-300"
                >
                  Profile
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setIsMenuOpen(false);
                  }}
                  className="block w-full text-left px-3 py-2 hover:bg-gray-800 hover:text-white rounded-full transition-colors duration-300"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                to="/login"
                className="block px-3 py-2 hover:bg-gray-800 hover:text-white rounded-full transition-colors duration-300"
              >
                Login
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
