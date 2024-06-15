import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader/Loader";
import Footer from "../components/Footer";
import { ThemeContext } from "../themeContext";
import { toast } from "react-hot-toast";
import axios from "axios";
import Modalupdate from "../components/Modal-update"; // Import the modal component

const Foodlist = () => {
  const { _id } = useParams();
  const [breakfast, setBreakfast] = useState();
  const [lunch, setLunch] = useState();
  const [dinner, setDinner] = useState();
  const [loading, setLoading] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [currentDish, setCurrentDish] = useState({});
  const { theme } = useContext(ThemeContext);

  const getFoodData = async (mealType, setMeal) => {
    try {
      setLoading(true);
      const response = await fetch(
        `http://localhost:8000/api/v1/${_id}/${mealType}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const res = await response.json();
      setMeal(res);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (_id, mealType) => {
    try {
      const token = localStorage.getItem("token"); // Retrieve token from local storage
      if (!token) {
        toast.error("Token is missing. Please log in.");
        return;
      }

      await axios.delete(
        `http://localhost:8000/api/v1/${_id}/${mealType}/remove`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
          data: {
            _id,
          },
        }
      );
      toast.success("Food item deleted successfully!");
      // Re-fetch the data to update the list
      getFoodData("breakfast", setBreakfast);
      getFoodData("lunch", setLunch);
      getFoodData("dinner", setDinner);
    } catch (error) {
      console.error("Error deleting food item: ", error);
      toast.error("Failed to delete food item.");
    }
  };

  const handleEditClick = (dish, mealType) => {
    setCurrentDish({ ...dish, mealType });
    setEditModal(true);
  };

  const handleUpdateDish = async (updatedDish) => {
    try {
      const token = localStorage.getItem("token"); // Retrieve token from local storage
      if (!token) {
        toast.error("Token is missing. Please log in.");
        return;
      }

      await axios.put(
        `http://localhost:8000/api/v1/${_id}/${currentDish.mealType}/updateitem`,
        {
          dishId: currentDish._id,
          dish: updatedDish,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          }
        }
      );

      toast.success("Dish updated successfully!");
      setEditModal(false);
      // Re-fetch the data to update the list
      getFoodData("breakfast", setBreakfast);
      getFoodData("lunch", setLunch);
      getFoodData("dinner", setDinner);
    } catch (error) {
      console.error("Error updating dish: ", error);
      toast.error("Failed to update dish.");
    }
  };

  useEffect(() => {
    getFoodData("breakfast", setBreakfast);
    getFoodData("lunch", setLunch);
    getFoodData("dinner", setDinner);
  }, [_id]);

  const handleDishClick = async (_id) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SPOONACULAR_API_URL}/recipes/${_id}/information?apiKey=${process.env.REACT_APP_API_KEY}`
      );
      const recipeUrl = response.data.spoonacularSourceUrl;
      window.open(recipeUrl, "_blank");
    } catch (error) {
      console.error("Error fetching recipe information: ", error);
    }
  };

  return (
    <div className="text-purple-800 min-h-screen pt-5">
      <Navbar />
      <div className="container mx-auto p-4">
        <h1 className="text-4xl font-bold mb-8 text-white">Food List</h1>
        {loading ? (
          <Loader />
        ) : (
          <div className="flex flex-col gap-4 p-5 md:flex-row justify-center">
            {breakfast && (
              <div className="w-2/3 rounded-lg shadow-md border-2 border-red-300 mt-5">
                <div className="text-center bg-red-300 text-black py-3 font-xl relative">
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/5025/5025429.png"
                    alt="Breakfast Icon"
                    className="absolute top-0 left-4 h-16 w-16 -mt-8 -ml-8"
                  />
                  Breakfast
                </div>
                <div className="p-4">
                  <ul>
                    {breakfast.data.map((dish) => (
                      <li
                        key={dish._id}
                        onClick={() => handleDishClick(dish._id)}
                        className={`cursor-pointer relative text-start hover:bg-gradient-to-r from-green-300 to-green-500 transition-transform duration-300 ease-in-out transform hover:-translate-y-1 px-5 py-2 ${
                          theme === "dark" ? "text-white" : "text-red-600"
                        } hover:text-black mt-2`}
                      >
                        • {dish.dish}
                        <span
                          className="absolute right-12 top-2 opacity-0 hover:opacity-100 transition-opacity duration-300"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditClick(dish, "breakfast");
                          }}
                        >
                          <img
                            src="https://cdn-icons-png.flaticon.com/512/2921/2921222.png"
                            alt="Edit Icon"
                            className="h-6 w-6"
                          />
                        </span>
                        <span
                          className="absolute right-5 top-2 opacity-0 hover:opacity-100 transition-opacity duration-300"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(dish._id, "breakfast");
                          }}
                        >
                          <img
                            src="https://cdn-icons-png.flaticon.com/512/1214/1214428.png"
                            alt="Delete Icon"
                            className="h-6 w-6"
                          />
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            {lunch && (
              <div className="w-2/3 rounded-lg shadow-md border-green-300 border-2 mt-5">
                <div className="text-center bg-green-300 text-black py-3 font-xl relative">
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/2082/2082045.png"
                    alt="Lunch Icon"
                    className="absolute top-0 left-4 h-16 w-16 -mt-8 -ml-8"
                  />
                  Lunch
                </div>
                <div className="p-4">
                  <ul>
                    {lunch.data.map((dish) => (
                      <li
                        key={dish._id}
                        onClick={() => handleDishClick(dish._id)}
                        className={`cursor-pointer relative text-start hover:bg-gradient-to-r from-green-300 to-green-500 transition-transform duration-300 ease-in-out transform hover:-translate-y-1 px-5 py-2 ${
                          theme === "dark" ? "text-white" : "text-green-600"
                        } hover:text-black mt-2`}
                      >
                        • {dish.dish}
                        <span
                          className="absolute right-12 top-2 opacity-0 hover:opacity-100 transition-opacity duration-300"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditClick(dish, "lunch");
                          }}
                        >
                          <img
                            src="https://cdn-icons-png.flaticon.com/512/2921/2921222.png"
                            alt="Edit Icon"
                            className="h-6 w-6"
                          />
                        </span>
                        <span
                          className="absolute right-5 top-2 opacity-0 hover:opacity-100 transition-opacity duration-300"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(dish._id, "lunch");
                          }}
                        >
                          <img
                            src="https://cdn-icons-png.flaticon.com/512/1214/1214428.png"
                            alt="Delete Icon"
                            className="h-6 w-6"
                          />
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
            {dinner && (
              <div className="w-2/3 rounded-lg shadow-md border-yellow-300 border-2 mt-5">
                <div className="text-center bg-yellow-300 text-black py-3 font-xl relative">
                  <img
                    src="https://cdn-icons-png.flaticon.com/128/3321/3321601.png"
                    alt="Dinner Icon"
                    className="absolute top-0 left-4 h-16 w-16 -mt-8 -ml-8"
                  />
                  Dinner
                </div>
                <div className="p-4">
                  <ul>
                    {dinner.data.map((dish) => (
                      <li
                        key={dish._id}
                        onClick={() => handleDishClick(dish._id)}
                        className={`cursor-pointer relative text-start hover:bg-gradient-to-r from-yellow-300 to-yellow-500 transition-transform duration-300 ease-in-out transform hover:-translate-y-1 px-5 py-2 ${
                          theme === "dark" ? "text-white" : "text-yellow-600"
                        } hover:text-black mt-2`}
                      >
                        • {dish.dish}
                        <span
                          className="absolute right-12 top-2 opacity-0 hover:opacity-100 transition-opacity duration-300"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleEditClick(dish, "dinner");
                          }}
                        >
                          <img
                            src="https://cdn-icons-png.flaticon.com/512/2921/2921222.png"
                            alt="Edit Icon"
                            className="h-6 w-6"
                          />
                        </span>
                        <span
                          className="absolute right-5 top-2 opacity-0 hover:opacity-100 transition-opacity duration-300"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDelete(dish._id, "dinner");
                          }}
                        >
                          <img
                            src="https://cdn-icons-png.flaticon.com/512/1214/1214428.png"
                            alt="Delete Icon"
                            className="h-6 w-6"
                          />
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
      <Footer />

      {/* Modal for Editing Dish */}
      {editModal && (
        <Modalupdate
          dish={currentDish.dish}
          onUpdate={(updatedDish) => handleUpdateDish(updatedDish)}
          onCancel={() => setEditModal(false)}
        />
      )}
    </div>
  );
};

export default Foodlist;
