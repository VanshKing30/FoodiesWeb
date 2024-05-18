import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import AOS from "aos";
import "aos/dist/aos.css";
import Loader from "../components/Loader/Loader";

const Home = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    AOS.init({ duration: 800 });
    setLoading(false);
  }, []);

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-b from-blue-900 to-blue-600 text-white relative overflow-hidden">
          <div className="absolute inset-0 z-0">
            <div
              className="absolute inset-0 bg-cover bg-center"
              style={{
                backgroundImage: `url('https://downpic.cc/photos/istock/Downpic.cc-492150995.jpg')`,
                filter: "brightness(0.6)",
              }}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-b from-blue-900 to-transparent opacity-75"></div>
          </div>
          <Navbar />
          <div className="z-10 text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4" data-aos="fade-down">Welcome to Foodies</h1>
            <p className="text-lg md:text-xl mb-8" data-aos="fade-up">Explore our services, offerings, and more.</p>
            <Link
              to="/canteen"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg transition duration-300 ease-in-out"
              data-aos="fade-up"
            >
              Visit Canteen
            </Link>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
