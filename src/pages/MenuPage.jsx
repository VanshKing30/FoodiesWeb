import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader/Loader";
import Footer from "../components/Footer";
import FoodCard from "../components/FoodCard";
import { ThemeContext } from '../themeContext';


const StarRating = ({ rating, onRatingChange }) => {
  const [hoverRating, setHoverRating] = useState(0);

  return (
    <div className="StarRating ">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          type="button"
          key={star}
          className={`StarRating__star ${star <= (hoverRating || rating) ? "StarRating__star--on" : "StarRating__star--off"}`}
          onClick={() => onRatingChange(star)}
          onMouseEnter={() => setHoverRating(star)}
          onMouseLeave={() => setHoverRating(0)}
        >
          &#9733;
        </button>
      ))}
    </div>
  );
};

function MenuPage() {
  const { _id } = useParams();
  const [breakfast, setBreakfast] = useState([]);
  const [lunch, setLunch] = useState([]);
  const [dinner, setDinner] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('breakfast');
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const { theme, toggleTheme } = useContext(ThemeContext);

  const getBreakfast = async () => {
    try {
      setLoading(true);
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
      setBreakfast(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getLunch = async () => {
    try {
      setLoading(true);
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
      setLunch(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const getDinner = async () => {
    try {
      setLoading(true);
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
      setDinner(res.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getBreakfast();
    getLunch();
    getDinner();
  }, []);

  useEffect(() => {
    const handleSearch = async () => {
      if (searchTerm.trim() === "") {
        setSearchResults([]);
        return;
      }

      try {
        setLoading(true);
        const [breakfastRes, lunchRes, dinnerRes] = await Promise.all([
          fetch(`${process.env.REACT_APP_BASE_URL}/${_id}/breakfast`).then(res => res.json()),
          fetch(`${process.env.REACT_APP_BASE_URL}/${_id}/lunch`).then(res => res.json()),
          fetch(`${process.env.REACT_APP_BASE_URL}/${_id}/dinner`).then(res => res.json())
        ]);

        const allDishes = [...breakfastRes.data, ...lunchRes.data, ...dinnerRes.data];
        const filteredDishes = allDishes.filter(dish =>
          dish.dish.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchResults(filteredDishes);
      } catch (error) {
        console.error("Error during search: ", error);
      } finally {
        setLoading(false);
      }
    };

    handleSearch();
  }, [searchTerm, _id]);

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

  function handleFeedbackSubmit() {
    if (feedback.trim() === '') {
      toast.error("Please provide your feedback before submitting.");
    } else {
      setFeedback('');
      toast.success('Feedback Submitted!');
    }
  }

  const renderMenuItems = () => {
    let items = [];
    switch (selectedCategory) {
      case 'breakfast':
        items = breakfast;
        break;
      case 'lunch':
        items = lunch;
        break;
      case 'dinner':
        items = dinner;
        break;
      default:
        items = [];
    }
    if (items.length === 0) {
      return <p className="absolute w-full text-xl text-red-700 text-center dark:text-red-400">No {selectedCategory.charAt(0).toUpperCase() + selectedCategory.slice(1)} Available Now</p>;
    }
    return items.map((dish) => (
      <FoodCard key={dish._id} dish={dish} onClick={() => handleDishClick(dish.dishId)} />
    ));
  };

  const renderSearchResults = () => {
    if (searchResults.length === 0) {
      return <p className="text-xl text-red-700 text-center dark:text-red-400">No Results Found</p>;
    }
    return searchResults.map((dish) => (
      <FoodCard key={dish._id} dish={dish} onClick={() => handleDishClick(dish.dishId)} />
    ));
  };

  return (
    <div className="text-purple-800 min-h-screen pt-5 bg-transparent dark:bg-slate-200">
      <Navbar />
      <div className="container px-8 mx-auto p-4 mt-20 min-h-screen bg-transparent dark:bg-slate-200">
        <div className="flex justify-center space-x-4 mb-8">
          {['breakfast', 'lunch', 'dinner'].map((category) => (
            <button
              key={category}
              className={`px-4 py-2 rounded-lg ${selectedCategory === category ? 'bg-green-300' : 'bg-gray-300'} focus:outline-none`}
              onClick={() => setSelectedCategory(category)}
            >
              {category.charAt(0).toUpperCase() + category.slice(1)}
            </button>
          ))}
        </div>
        <div className="mb-8 flex justify-center">
          <input
            type="text"
            className="w-2/3 p-2 border border-purple-300 rounded"
            placeholder="Search for a dish..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        {searchTerm ? (
          <div className="grid grid-cols-1 relative md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center">
            {loading ? <Loader /> : renderSearchResults()}
          </div>
        ) : (
          <>
            <h1 className="text-4xl font-bold mb-8 text-white text-center capitalize dark:text-black">{selectedCategory}</h1>
            {loading ? (
              <Loader />
            ) : (
              <div className="grid grid-cols-1 relative md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center">
                {renderMenuItems()}
              </div>
            )}
          </>
        )}
      </div>
      <div className="mt-8 text-purple-800 px-8 mb-4">
          <h2 className="text-2xl font-bold mb-4 text-white text-center dark:text-black">Meal Feedback</h2>
          <textarea
            className="w-full h-32 p-4 border border-purple-300 rounded mb-4"
            placeholder="Enter your feedback here..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
          ></textarea>
          <button
            onClick={handleFeedbackSubmit}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Submit Feedback
          </button>
        </div>
      <Footer />
    </div>
  );
}

export default MenuPage;
