import React from "react";
import { FaFacebook, FaInstagram, FaLinkedin } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        
          <div>
            <h2 className="text-xl font-bold text-white mb-4">GETIT</h2>
            <p className="text-gray-400 leading-relaxed">
              Your one-stop destination for premium gaming products and accessories. 
              Level up your gaming experience with us!
            </p>
          </div>

         
          <div>
            <h2 className="text-lg font-bold text-white mb-4">Quick Links</h2>
            <ul className="space-y-2">
              <li>
                <a href="/" className="hover:text-white transition">
                  Home
                </a>
              </li>
              <li>
                <a href="/" className="hover:text-white transition">
                  About
                </a>
              </li>
              <li>
                <a href="/" className="hover:text-white transition">
                  Store
                </a>
              </li>
              <li>
                <a href="/" className="hover:text-white transition">
                  Contact
                </a>
              </li>
            </ul>
          </div>

       
          <div>
            <h2 className="text-lg font-bold text-white mb-4">Contact Us</h2>
            <ul className="space-y-2 text-gray-400">
              <li>Email: support@getit.com</li>
              <li>Phone: +91 9876543210</li>
              <li>Address: 123 Gaming Street, GameCity, GC 56789</li>
            </ul>
          </div>

        
          <div>
            <h2 className="text-lg font-bold text-white mb-4">Follow Us</h2>
            <div className="flex space-x-4">
              <a
                href="https://facebook.com"
                className="text-gray-400 hover:text-white transition"
              >
                <FaFacebook size={28} />
              </a>
              <a
                href="https://twitter.com"
                className="text-gray-400 hover:text-white transition"
              >
                <FaXTwitter size={28} />
              </a>
              <a
                href="https://instagram.com"
                className="text-gray-400 hover:text-white transition"
              >
                <FaInstagram size={28} />
              </a>
              <a
                href="https://linkedin.com"
                className="text-gray-400 hover:text-white transition"
              >
                <FaLinkedin size={28} />
              </a>
            </div>
          </div>
        </div>

      
        <div className="mt-12 border-t border-gray-700 pt-4 text-center">
          <p className="text-sm text-white">
            &copy; {new Date().getFullYear()} GETIT. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
