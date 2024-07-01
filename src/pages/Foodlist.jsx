import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader/Loader";
import Footer from "../components/Footer";
import FoodCard from "../components/FoodCard";
import Modalupdate from "../components/Modal-update";
import { ThemeContext } from "../themeContext";

const Foodlist = () => {
  const { _id } = useParams();
  const [breakfast, setBreakfast] = useState([]);
  const [lunch, setLunch] = useState([]);
  const [dinner, setDinner] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("breakfast");
  const [loading, setLoading] = useState(false);
  const [editModal, setEditModal] = useState(false);
  const [currentDish, setCurrentDish] = useState({});
  const { theme } = useContext(ThemeContext);

  const fetchData = async (mealType, setMeal) => {
    try {
      setLoading(true);
      const response = await fetch(
        `${process.env.REACT_APP_BASE_URL}/${_id}/${mealType}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const res = await response.json();
      setMeal(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (dishId, mealType) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Token is missing. Please log in.");
        return;
      }

      await axios.delete(
        `${process.env.REACT_APP_BASE_URL}/${_id}/${mealType}/remove`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          data: { _id: dishId },
        }
      );
      toast.success("Food item deleted successfully!");
      fetchData(mealType, getMealSetter(mealType));
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
      const token = localStorage.getItem("token");
      if (!token) {
        toast.error("Token is missing. Please log in.");
        return;
      }

      const formData = new FormData();
      formData.append("dishId", currentDish._id);
      formData.append("dish", updatedDish.dish);
      formData.append("description", updatedDish.description);

      if (updatedDish.dishImage) {
        const base64Image = await convertToBase64(updatedDish.dishImage);
        formData.append("dishImage", base64Image);
      }

      await axios.put(
        `${process.env.REACT_APP_BASE_URL}/${_id}/${currentDish.mealType}/updateitem`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`, // Include the token in the Authorization header
          },
        }
      );

      toast.success("Dish updated successfully!");
      setEditModal(false);
      fetchData(currentDish.mealType, getMealSetter(currentDish.mealType));
    } catch (error) {
      console.error("Error updating dish: ", error);
      toast.error("Failed to update dish.");
    }
  };


  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const getMealSetter = (mealType) => {
    switch (mealType) {
      case "breakfast":
        return setBreakfast;
      case "lunch":
        return setLunch;
      case "dinner":
        return setDinner;
      default:
        return;
    }

  };

  useEffect(() => {
    fetchData("breakfast", setBreakfast);
    fetchData("lunch", setLunch);
    fetchData("dinner", setDinner);
  }, [_id]);

  const handleDishClick = async (dishId) => {
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_SPOONACULAR_API_URL}/recipes/${dishId}/information?apiKey=${process.env.REACT_APP_API_KEY}`
      );
      const recipeUrl = response.data.spoonacularSourceUrl;
      window.open(recipeUrl, "_blank");
    } catch (error) {
      console.error("Error fetching recipe information: ", error);
    }
  };

  const renderMenuItems = () => {
    let items = [];
    switch (selectedCategory) {
      case "breakfast":
        items = breakfast;
        break;
      case "lunch":
        items = lunch;
        break;
      case "dinner":
        items = dinner;
        break;
      default:
        items = [];
    }
    if (items.length === 0) {
      return <p className="text-xl text-red-700 text-center">No {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Available Now</p>;
    }
    return items.map((dish) => (
      <FoodCard 
        key={dish._id} 
        dish={dish} 
        onClick={() => handleDishClick(dish.dishId)}   
        onEdit={() => handleEditClick(dish, selectedCategory)} 
        onDelete={() => handleDelete(dish._id, selectedCategory)}  
      />
    ));
  };
  return (
    <div className="text-purple-800 min-h-screen pt-5 bg-transparent">
      <Navbar />
      <div className="container px-8 mx-auto p-4 mt-20 min-h-screen bg-transparent">
        <div className="flex justify-center space-x-4 mb-8">
          {["breakfast", "lunch", "dinner"].map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-lg ${selectedCategory === category ? 'bg-green-300' : 'bg-gray-300'} focus:outline-none`}
              onClick={() => setSelectedCategory(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
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
              <div className="w-2/3 rounded-lg shadow-md border-blue-300 border-2 mt-5">
                <div className="text-center bg-blue-300 text-black py-3 font-xl relative">
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
                        className={`cursor-pointer relative text-start hover:bg-gradient-to-r from-green-300 to-green-500 transition-transform duration-300 ease-in-out transform hover:-translate-y-1 px-5 py-2 ${
                          theme === "dark" ? "text-white" : "text-blue-600"
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

      {editModal && (
        <Modalupdate
          dish={currentDish}
          onClose={() => setEditModal(false)}
          onUpdate={handleUpdateDish}
        />
      )}
      <Footer />
    </div>
  );
};

export default Foodlist;
