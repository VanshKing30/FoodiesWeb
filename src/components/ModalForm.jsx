import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const ModalForm = ({ onSubmit  , sectionName , canteenData , id}) => {
  const [formData, setFormData] = useState({
    minCalories: "",
    maxCalories: "",
    minProtein: "",
    maxProtein: "",
    cuisine: "",
  });
  const [recipes, setRecipes] = useState([]);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.get(
        `${process.env.REACT_APP_API_URL}`,
        {
          params: {
            minCalories: formData.minCalories,
            maxCalories: formData.maxCalories,
            minProtein: formData.minProtein,
            maxProtein: formData.maxProtein,
            cuisine: formData.cuisine,
            apiKey: `${process.env.REACT_APP_API_KEY}`,
            number: 9,
          },
        }
      );

      setRecipes(response.data.results);
      toast.success("Recipes Fetched Successfully");
    } catch (error) {
      console.error("Error fetching recipes:", error);
      toast.error("Error Fetching Recipes");
    }

    setFormData({
      minCalories: "",
      maxCalories: "",
      minProtein: "",
      maxProtein: "",
      cuisine: "",
    });
  };


  const handleAddToMenu = (dishId , dish) => {


    const foodDetails = {dish , dishId};

    if(sectionName === "Breakfast"){

      const apiUrl = `${process.env.REACT_APP_BASE_URL}/${id}/breakfast/add`;

      axios.post(apiUrl , foodDetails)
      .then((response)=>{
        toast.success("Added to menu");
      })
      .catch((error )=>{

        toast.error("Failed to add dish");
      })


    }
    else if(sectionName === "Lunch"){

      const apiUrl = `${process.env.REACT_APP_BASE_URL}/${id}/lunch/add`;

      axios.post(apiUrl , foodDetails)
      .then((response)=>{

        toast.success("Added to menu");
      })
      .catch((error)=>{
  
        toast.error("Faild to add dish");
      })



    }
    else{
     
      const apiUrl = `${process.env.REACT_APP_BASE_URL}/${id}/dinner/add`;

      axios.post(apiUrl , foodDetails)
      .then((response)=>{
   
        toast.success("Added to menu");
      })
      .catch((error)=>{
 
        toast.error("Faild to add dish");
      })


    }
  };

  return (
    <div>
      <form className="mb-4" onSubmit={handleFormSubmit}>
       
        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-600">
            Cuisine
          </label>
          <select
            required
            className="border border-gray-300 p-2 rounded w-full"
            name="cuisine"
            value={formData.cuisine}
            onChange={handleInputChange}
          >
            <option value="" disabled selected hidden>
              Select Cuisine
            </option>
            <option value="Indian">Indian</option>
            <option value="Chinese">Chinese</option>
            <option value="Italian">Italian</option>
            <option value="American">American</option>
            <option value="Asian">Asian</option>
            <option value="European">European</option>
            <option value="Mexican">Mexican</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-600">
            Minimum Calories
          </label>
          <input
            required
            type="number"
            className="border border-gray-300 p-2 rounded w-full"
            name="minCalories"
            value={formData.minCalories}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-600">
            Maximum Calories
          </label>
          <input
            required
            type="number"
            className="border border-gray-300 p-2 rounded w-full"
            name="maxCalories"
            value={formData.maxCalories}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-600">
            Minimum Protein
          </label>
          <input
            required
            type="number"
            className="border border-gray-300 p-2 rounded w-full"
            name="minProtein"
            value={formData.minProtein}
            onChange={handleInputChange}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-semibold text-gray-600">
            Maximum Protein
          </label>
          <input
            required
            type="number"
            className="border border-gray-300 p-2 rounded w-full"
            name="maxProtein"
            value={formData.maxProtein}
            onChange={handleInputChange}
          />
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>

      {/* Render recipes */}
      {recipes.length > 0 && (
        <div className="mt-4">
          <h2 className="text-xl font-semibold mb-2">Recipes</h2>
          <div className="flex flex-wrap">
            {recipes.map((recipe) => (
              <div key={recipe.id} className="w-1/3 p-2">
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full h-32 object-contain "
                />
                <h3 className="text-base font-semibold mb-1">
                  {" "}
                 
                  {recipe.title}
                </h3>
                <button
                  onClick={() => handleAddToMenu(recipe.id , recipe.title)}
                  className="bg-green-500 hover:bg-green-700 text-white py-1 px-2 rounded transition duration-300 ease-in-out transform hover:scale-105"
                >
                  Add to Menu
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ModalForm;
