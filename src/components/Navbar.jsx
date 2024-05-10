
import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo2.png";

const Navbar = () => {
  return (
    <nav className="text-white p-3 font-semibold shadow-lg">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between">
        <div className="flex items-center space-x-2">
          <Link to="/home" className="flex items-center space-x-2">
            <img src={logo} alt="Logo" className="h-12" />
          </Link>
        </div>
        <div className="space-x-6 md:space-x-20 text-lg md:flex">
          
          <Link to="/home" className="hover:text-green-400 cursor-pointer transition-all duration-200">
          
            Home
          </Link>
          <Link to="/news" className="hover:text-green-400 cursor-pointer transition-all duration-200">
            News
          </Link>
          <Link to="/about" className="hover:text-green-400 cursor-pointer transition-all duration-200">
            About Us
          </Link>
        </div>
        <Link to="/">
          <button
            className="bg-green-500 hover:bg-green-700 text-white py-1 px-2 rounded transition duration-300 ease-in-out transform hover:scale-105"
          >
            Log out
          </button>
        </Link>
      </div>
    </nav>
  );
};

export default Navbar;






