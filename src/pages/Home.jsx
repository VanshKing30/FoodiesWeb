import React, { useState, useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import Navbar from "../components/Navbar";
import CanteenList from "../components/CanteenList";
import Loader from "../components/Loader/Loader";
import Footer from "../components/Footer";
import FloatBtn from "../components/FloatBtn/FloatBtn";
import { useAuth } from "../authContext";
import { useNavigate } from "react-router-dom";
function Home() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [canteenData, setCanteenData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filteredCanteenData, setFilteredCanteenData] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  const getCanteenData = async () => {
    try {
      setLoading(true);
      console.log(process.env.REACT_APP_BASE_URL);
      const getCanteen = await fetch(
        `${process.env.REACT_APP_BASE_URL}/getcanteen`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const res = await getCanteen.json();
      setCanteenData(res);
      setFilteredCanteenData(res);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getDishData = async (canteenId, category) => {
    try {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}/${canteenId}/${category}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.json();
      return data.data;
    } catch (error) {
      console.error(`Error fetching ${category} data: `, error);
      return [];
    }
  };

  useEffect(() => {
    getCanteenData();
  }, []);

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredCanteenData(canteenData);
    }
  }, [searchTerm, canteenData]);

  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      setFilteredCanteenData(canteenData);
    } else {
      const fetchAllDishes = async () => {
        try {
          setLoading(true);
          const allCanteens = canteenData.data;
          const allDishesPromises = allCanteens.map(async (canteen) => {
            const [breakfast, lunch, dinner] = await Promise.all([
              getDishData(canteen._id, "breakfast"),
              getDishData(canteen._id, "lunch"),
              getDishData(canteen._id, "dinner"),
            ]);
            return {
              ...canteen,
              dishes: [...breakfast, ...lunch, ...dinner],
            };
          });
          const canteensWithDishes = await Promise.all(allDishesPromises);
          const filteredData = canteensWithDishes.filter(
            (canteen) =>
              canteen.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
              canteen.dishes.some((dish) =>
                dish.dish.toLowerCase().includes(searchTerm.toLowerCase())
              )
          );
          setFilteredCanteenData({ data: filteredData });
        } catch (error) {
          console.error("Error fetching dishes: ", error);
        } finally {
          setLoading(false);
        }
      };

      fetchAllDishes();
    }
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="min-h-screen dark:bg-teal-700">
          <Navbar />
          <div
            className="mx-auto max-w-2xl p-4"
            style={{ paddingTop: "120px" }}
          >
            {/* Search bar */}

            <div className="relative w-full max-w-sm mx-auto">
              <AiOutlineSearch
                className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-500"
                size={20}
              />
              <input
                type="text"
                placeholder="Search Dish or Canteen"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-500 shadow-md"
              />
              <button
                onClick={handleSearch}
                className="absolute top-1/2 right-0 transform -translate-y-1/2 h-full px-6 py-2 text-white bg-green-500 rounded-r-full hover:bg-green-600 focus:outline-none transition-transform duration-300 ease-in-out hover:scale-105 shadow-lg"
              >
                Search
              </button>
            </div>
          </div>
          <div className="text-center">
            <CanteenList canteenData={filteredCanteenData} />
          </div>
          <Footer />
        </div>
      )}
    </>
  );
}

export default Home;
