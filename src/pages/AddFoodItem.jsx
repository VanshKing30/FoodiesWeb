import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";

function AddFoodItem() {
  const [formData, setFormData] = useState({
    dish: "",
    dishId: "",
    mealType: "",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const canteenId = localStorage.getItem("canteenId");
    if (!canteenId) {
      toast.error("Canteen ID is missing. Please log in again.");
    }
  }, []);

  const handleChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const { mealType, dish, dishId } = formData;
    const canteenId = localStorage.getItem("canteenId");
    let apiUrl = "";

    switch (mealType) {
      case "Breakfast":
        apiUrl = `http://localhost:8000/api/v1/${canteenId}/breakfast/add`;
        break;
      case "Lunch":
        apiUrl = `http://localhost:8000/api/v1/${canteenId}/lunch/add`;
        break;
      case "Dinner":
        apiUrl = `http://localhost:8000/api/v1/${canteenId}/dinner/add`;
        break;
      default:
        toast.error("Please select a meal type.");
        setLoading(false);
        return;
    }

    // Get token from local storage or cookies
    const token = localStorage.getItem("token"); // or use cookies

    if (!token) {
      toast.error("Token is missing. Please log in again.");
      setLoading(false);
      return;
    }

    try {
      await axios.post(
        apiUrl,
        { dish, dishId },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Dish added successfully!");
      setFormData({
        dish: "",
        dishId: "",
        mealType: "",
      });
    } catch (error) {
      toast.error("Failed to add dish. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-6 rounded shadow-lg w-full max-w-sm"
      >
        <h1 className="text-xl font-bold mb-4">Add Food Item</h1>
        <div className="mb-4">
          <label className="block text-gray-700">Dish Name</label>
          <input
            type="text"
            name="dish"
            value={formData.dish}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Dish ID</label>
          <input
            type="text"
            name="dishId"
            value={formData.dishId}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Meal Type</label>
          <select
            name="mealType"
            value={formData.mealType}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
            required
          >
            <option value="" disabled hidden>
              Select Meal Type
            </option>
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
          </select>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded mt-4"
          disabled={loading}
        >
          {loading ? "Loading..." : "Add Dish"}
        </button>
      </form>
    </div>
  );
}

export default AddFoodItem;
