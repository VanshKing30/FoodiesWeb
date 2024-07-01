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

      await axios.put(
        `${process.env.REACT_APP_BASE_URL}/${_id}/${currentDish.mealType}/updateitem`,
        {
          dishId: currentDish._id,
          dish: updatedDish,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          }
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

  const getMealSetter = (mealType) => {
    switch (mealType) {
      case "breakfast":
        return setBreakfast;
      case "lunch":
        return setLunch;
      case "dinner":
        return setDinner;
      default:
        return () => {};
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
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {renderMenuItems()}
          </div>
        )}
      </div>
      {editModal && (
        <Modalupdate
          dish={currentDish.dish}
          onUpdate={(updatedDish) => handleUpdateDish(updatedDish)}
          onCancel={() => setEditModal(false)}
        />
      )}
      <Footer />
    </div>
  );
};

export default Foodlist;
