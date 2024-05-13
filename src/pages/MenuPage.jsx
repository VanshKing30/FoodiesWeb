
import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import Navbar from "../components/Navbar";

function MenuPage() {
  const { _id } = useParams();
  const [breakfast, setBreakfast] = useState();
  const [lunch, setLunch] = useState();
  const [dinner, setDinner] = useState();
  const [selectedDish, setSelectedDish] = useState(null);
  const [feedback, setFeedback] = useState("");

  const getBreakfast = async () => {
    try {
      const getBreakfast = await fetch(
        `${process.env.REACT_APP_BASE_URL}/${_id}/breakfast`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const res = await getBreakfast.json();
      setBreakfast(res);
    } catch (error) {
      console.error(error);
    }
  };


  const getLunch = async () => {
    try {
      const getLunch = await fetch(
        `${process.env.REACT_APP_BASE_URL}/${_id}/lunch`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const res = await getLunch.json();
      setLunch(res);
    } catch (error) {
      console.error(error);
    }
  };

  const getDinner = async () => {
    try {
      const getDinner = await fetch(
        `${process.env.REACT_APP_BASE_URL}/${_id}/dinner`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const res = await getDinner.json();
      setDinner(res);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getBreakfast();
    getLunch();
    getDinner();
  }, []);



  const handleDishClick = async (dishId) => {
    try {
      // Use the Spoonacular API to get the recipe details based on dishId
      const response = await axios.get(
        `${process.env.REACT_APP_SPOONACULAR_API_URL}/recipes/${dishId}/information?apiKey=${process.env.REACT_APP_API_KEY}`
      );

      // Extract the recipe URL from the response and open it in a new tab
      const recipeUrl = response.data.spoonacularSourceUrl;
      window.open(recipeUrl, "_blank");
    } catch (error) {
      console.error("Error fetching recipe information: ", error);
    }
  };

  function handleFeedbackSubmit() {
    if (feedback.trim() === '') {
      // Display an alert if the feedback is empty
      toast.error("Please provide your feedback before submitting.");
    } else {
      // Submit feedback if it's not empty
      setFeedback('');
      toast.success('Feedback Submitted!');
    }
  }

  return (
    <div className="text-purple-800 min-h-screen">
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold mb-8 text-white">Today's Menu </h1>

        
        <div className="flex flex-col gap-4 p-5 md:flex-row">
          
          {breakfast && (
            <div className="bg-white p-6 rounded shadow-md text-gray-900">
              <h2 className="text-2xl font-bold mb-4">Breakfast</h2>
              <ul>
                {breakfast.data.map((dish) => (
                  <li
                    key={dish._id}
                    onClick={() => handleDishClick(dish.dishId)} // Add click handler
                    style={{ cursor: "pointer" }}
                    className="hover:bg-gradient-to-r from-green-300 to-green-500 transition-transform duration-300 ease-in-out transform hover:-translate-y-1"
                  >
                    • {dish.dish}
                  </li>
                ))}
              </ul>
            </div>
          )}

          
          {lunch && (
            <div className="bg-white p-6 rounded shadow-md text-gray-900">
              <h2 className="text-2xl font-bold mb-4">Lunch</h2>
              <ul>
                {lunch.data.map((dish) => (
                  <li
                    key={dish._id}
                    onClick={() => handleDishClick(dish.dishId)} // Add click handler
                    style={{ cursor: "pointer" }}
                    className="hover:bg-gradient-to-r from-green-300 to-green-500 transition-transform duration-300 ease-in-out transform hover:-translate-y-1"
                  >
                    • {dish.dish}
                  </li>
                ))}
              </ul>
            </div>
          )}

          
          {dinner && (
            <div className="bg-white p-6 rounded shadow-md text-gray-900">
              <h2 className="text-2xl font-bold mb-4">Dinner</h2>
              <ul>
                {dinner.data.map((dish) => (
                  <li
                    key={dish._id}
                    onClick={() => handleDishClick(dish.dishId)} // Add click handler
                    style={{ cursor: "pointer" }}
                    className="hover:bg-gradient-to-r from-green-300 to-green-500 transition-transform duration-300 ease-in-out transform hover:-translate-y-1"
                  >
                    • {dish.dish}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>

        
        <div className="mt-8 text-purple-800">
          <h2 className="text-2xl font-bold mb-4 text-white">Meal Feedback</h2>
          <textarea
            className="w-full h-32 p-4 border border-purple-300 rounded mb-4"
            placeholder="Enter your feedback here..."
            value={feedback} // Set the value of the textarea
            onChange={(e) => setFeedback(e.target.value)} // Update the state on change
          ></textarea>
          <button
            onClick={handleFeedbackSubmit}
            className="bg-green-500 hover-bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Submit Feedback
          </button>
        </div>
      </div>
    </div>
  );
}

export default MenuPage;











