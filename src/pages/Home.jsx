

import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import Navbar from "../components/Navbar";
import CanteenList from "../components/CanteenList";

function Home() {

  const [canteenData , setCanteenData] = useState();

  const getCanteenData = async () =>{
    try{
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
    };

  };

  useEffect(()=>{
    getCanteenData();
  },[])




  return (
    <div className=" min-h-screen">
      <Navbar />
      <div className="text-center">
        <CanteenList canteenData = {canteenData}/>
      </div>
    </div>
      
  );
}

export default Home;




























