import React, { useState, useEffect } from "react";
import { AiOutlineSearch } from "react-icons/ai";  // Importing the search icon
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
      setFilteredCanteenData(res); // Initialize filtered data with all canteens
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getCanteenData();
  }, []);

  useEffect(() => {
    if (!canteenData?.data) return; // Ensure canteenData.data exists
    // Filter canteenData based on searchTerm
    if (searchTerm.trim() === "") {
      setFilteredCanteenData(canteenData); // If search term is empty, show all canteens
    } else {
      const filteredData = canteenData.data.filter((canteen) =>
        canteen.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setFilteredCanteenData({ data: filteredData });
    }
  }, [searchTerm, canteenData]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (
        <div className="min-h-screen dark:bg-teal-700">
          <Navbar />
          <div className="mx-auto max-w-2xl p-4" style={{ paddingTop: "120px" }}>
            <div className="relative">
              <AiOutlineSearch className="absolute top-2 left-3 text-gray-400" size={24} />
              <input
                type="text"
                placeholder="Search Canteen"
                value={searchTerm}
                onChange={handleSearch}
                className="w-full pl-10 pr-4 py-2 rounded-md border border-gray-300 focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
              />
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
