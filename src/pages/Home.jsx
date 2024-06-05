

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import Navbar from "../components/Navbar";
import CanteenList from "../components/CanteenList";
import Loader from "../components/Loader/Loader";
import Footer from "../components/Footer";

function Home() {

  const [canteenData , setCanteenData] = useState();
  const [loading, setLoading] = useState(false);

  const getCanteenData = async () =>{
    try{
      setLoading(true);
      const getCanteen = await fetch(
        `${process.env.REACT_APP_BASE_URL}/getcanteen`,
        {
          method : "GET",
          headers :{
            "Content-Type" : "application/json",
          },
        }
      );
      const res = await getCanteen.json();
      setCanteenData(res);
    }
      catch(error){
        console.error(error);
    }
    finally {
      setLoading(false);
    }

  };

  useEffect(()=>{
    getCanteenData();
  },[])



  return (
    <>
    {
      loading ? (
        <Loader/>
      ):(
        <div className=" min-h-screen dark:bg-teal-700">
        <Navbar />
        <div className="text-center">
          <CanteenList canteenData = {canteenData}/>
        </div>
        <Footer />
      </div>
      )
    }
    </>
   
      
  );
}

export default Home;




























