import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo2.png";
import { motion, AnimatePresence, useScroll } from "framer-motion";
import { IoClose } from "react-icons/io5";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  return (
    <nav className="text-white p-3 font-semibold shadow-lg top-0 bg-gradient-to-t from-blue-950 via-blue-950 to-gray-900 w-full fixed z-40">
      <motion.div
        className="left-0 top-0 w-full h-1 bg-blue-500 fixed z-50"
        style={{ scaleX: scrollYProgress }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <Link to="/home" className="flex items-center space-x-2">
                <img src={logo} alt="Logo" className="h-12" />
              </Link>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                <NavItem to="/home">Home</NavItem>
                <NavItem to="/about">About</NavItem>
                <NavItem to="/news">News</NavItem>
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <NavItem to="/">
              <button
                className="bg-green-500 hover:bg-green-700 text-white py-1 px-2 rounded transition duration-300 ease-in-out transform hover:scale-105"
              >
                Log out
              </button>
            </NavItem>
          </div>
          <div className="-mr-2 flex md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-700 focus:outline-none focus:bg-gray-700 focus:text-white"
              aria-expanded="false"
            >
              {isOpen ? (
                <IoClose className="text-white" />
              ) : (
                <GiHamburgerMenu className="text-white" />
              )}
            </button>
          </div>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -50 }}
            className="md:hidden absolute w-full flex flex-col items-center justify-center"
          >
            <div className="w-[100%] bg-[#282c34] px-[20%] pt-2 pb-3 space-y-1 sm:px-3">
              <MobileNavItem to="/home">Home</MobileNavItem>
              <MobileNavItem to="/about">About us</MobileNavItem>
              <MobileNavItem to="/news">News</MobileNavItem>
              <MobileNavItem to="/">
                <button
                  className="bg-green-500 hover:bg-green-700 text-white py-1 px-2 rounded transition duration-300 ease-in-out transform hover:scale-105"
                >
                  Log out
                </button>
              </MobileNavItem>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};
const NavItem = ({ to, children }) => {
  const itemVariants = {
    initial: { opacity: 1, y: 0 },
    hover: {
      borderLeftWidth: "2px",
      borderBottomWidth: "2px",
      color:"#ffffff",
      borderColor: "#48BB78",
      boxShadow: "0px 0px 10px 2px rgba(72, 187, 120, 0.5)", // Example box shadow
      transition: { duration: 0.3 },
    },
  };




  return (
    <motion.div
      variants={itemVariants}
      initial="initial"
      whileHover="hover"
      className="text-gray-300 px-3 py-2 rounded-md text-sm font-medium"
    >
      <Link to={to}>{children}</Link>
    </motion.div>
  );
};

const MobileNavItem = ({ to, children }) => {
  return (
    <Link
      to={to}
      className="z-[2] text-gray-300 hover:bg-gray-700 hover:text-white block px-3 py-2 rounded-md text-base font-medium"
    >
      {children}
    </Link>
  );
};

export default Navbar;
