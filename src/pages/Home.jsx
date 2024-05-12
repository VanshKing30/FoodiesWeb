import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import Navbar from "../components/Navbar";
import CanteenList from "../components/CanteenList";
import Searchbar from "../components/Searchbar";

function Home() {
  const [canteenData, setCanteenData] = useState();
  const [filteredData, setfilteredData] = useState();
  const [isSearched, setIsSearched] = useState(false);
  const getCanteenData = async () => {
    try {
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
    } catch (error) {
      console.error(error);
    }
  };

  const searchValueHandler = (value) => {
    const data = canteenData?.data?.filter((canteen) => {
      return canteen.name.toUpperCase() === value.toUpperCase();
    });
    if (data.length > 0) {
      setIsSearched(true);
      setfilteredData({ data });
    } else {
      toast.error("No such canteen!");
    }
  };

  useEffect(() => {
    getCanteenData();
  }, []);

  return (
    <div className=" min-h-screen">
      <Navbar />
      <Searchbar
        searchValueHandler={(value) => {
          searchValueHandler(value);
        }}
      />

      <div className=" text-center  absolute top-28 ">
        <CanteenList canteenData={isSearched ? filteredData : canteenData} />
      </div>
    </div>
  );
}

export default Home;
