import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { toast } from "react-hot-toast";
import { ThemeContext } from "../themeContext";

function AddFoodItem() {
  const { theme } = useContext(ThemeContext);
  const [formData, setFormData] = useState({
    dish: "",
    dishId: "",
    mealType: "",
    dishImage: "", // New field for dish image URL or base64 string
    description: "", // New field for dish description
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

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData((prevData) => ({
          ...prevData,
          dishImage: reader.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);

    const { mealType, dish, dishId, dishImage, description } = formData;
    const canteenId = localStorage.getItem("canteenId");
    let apiUrl = "";

    switch (mealType) {
      case "Breakfast":
        apiUrl = `${process.env.REACT_APP_BASE_URL}/${canteenId}/breakfast/add`;
        break;
      case "Lunch":
        apiUrl = `${process.env.REACT_APP_BASE_URL}/${canteenId}/lunch/add`;
        break;
      case "Dinner":
        apiUrl = `${process.env.REACT_APP_BASE_URL}/${canteenId}/dinner/add`;
        break;
      default:
        toast.error("Please select a meal type.");
        setLoading(false);
        return;
    }

    // Get token from local storage or cookies
    const token = localStorage.getItem("token");

    if (!token) {
      toast.error("Token is missing. Please log in again.");
      setLoading(false);
      return;
    }

    try {
      await axios.post(
        apiUrl,
        { dish, dishId, dishImage, description },
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
        dishImage: "", // Reset image field
        description: "", // Reset description field
      });
    } catch (error) {
      toast.error("Failed to add dish. Please try again.");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`flex justify-center items-center h-[auto] ${theme === 'dark' ? 'bg-[#131b33]' : 'bg-white'}`}>
      <form
        onSubmit={handleSubmit}
        className={`p-6 rounded shadow-lg w-full max-w-sm mt-[40px] mb-[20px] border-2 ${theme === 'dark' ? 'bg-gray-300' : 'bg-white'}`}
      >
        <h1 className="text-xl font-bold mb-4 text-black">Add Food Item</h1>

        <div className="mb-4">
          <label className="block text-gray-700">Dish Name</label>
          <input
            type="text"
            name="dish"
            value={formData.dish}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
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
            className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Meal Type</label>
          <select
            name="mealType"
            value={formData.mealType}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-1 text-black "
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
        <div className="mb-4">
          <label className="block text-gray-700">Description</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded mt-1 text-black"
            rows="3"
          ></textarea>
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Dish Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 border border-gray-300 rounded mt-1"
          />
          {formData.dishImage && (
            <img
              src={formData.dishImage}
              alt="Dish"
              className="mt-4 w-32 h-32 object-cover rounded"
            />
          )}
        </div>
      
        <button
          type="submit"
          className="w-full bg-green-500 text-white p-2 rounded-full mt-4"
          disabled={loading}
        >
          {loading ? "Loading..." : "Add Dish"}
        </button>
      </form>
    </div>
  );
}

export default AddFoodItem;
