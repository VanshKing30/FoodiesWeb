import React, { useState, useEffect, useContext, useMemo } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader/Loader";
import Footer from "../components/Footer";
import FoodCard from "../components/FoodCard";
import { ThemeContext } from '../themeContext';
import { Link } from "react-router-dom";
import { FaInstagram, FaFacebook, FaLinkedinIn, FaYoutube, FaShoppingCart, FaPlus, FaMinus, FaTrash } from "react-icons/fa";
import BasicRating from "../components/Ratings";



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
  const [studentfeedback, setstudentFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [canteenData, setCanteenData] = useState({});
  const [cart, setCart] = useState({});
  const [cartOpen, setCartOpen] = useState(false);
  const [orderLoading, setOrderLoading] = useState(false);
  const { theme, toggleTheme } = useContext(ThemeContext);
  
  //feedbacks
const handlestudentFeedbackSubmit = async () => {
  if (studentfeedback.trim() === '') {
    toast.error("Please provide your feedback before submitting.");
    return;
  }

  const userId = localStorage.getItem('userid'); // Assuming the user ID is stored in local storage
  const canteenId = _id; // Canteen ID from URL params

  try {
    await axios.post(`${process.env.REACT_APP_BASE_URL}/submitFeedback`, {
      message: studentfeedback,
      canteenId,
      userId
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    setstudentFeedback('');
    toast.success('Feedback Submitted!');
  } catch (error) {
    console.error('Error submitting feedback:', error);
    toast.error('Failed to submit feedback. Please try again.');
  }
};

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
      setBreakfast(res.data)
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const fetchCanteenData = async () => {
    try {
      const getCanteen = await fetch(`${process.env.REACT_APP_BASE_URL}/canteen/${_id}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const res = await getCanteen.json();
      setCanteenData(res.data);
    } catch (error) {
      console.error("Error fetching canteen data:", error);
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
    fetchCanteenData();
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

  const handleFeedbackSubmit = async () => {
    if (feedback.trim() === '') {
      toast.error("Please provide your feedback before submitting.");
      return;
    }

    const userId = localStorage.getItem('userid');
    const canteenId = _id;

    try {
      await axios.post(`${process.env.REACT_APP_BASE_URL}/submitFeedback`, {
        message: feedback,
        canteenId,
        userId
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });
      setFeedback('');
      toast.success('Feedback Submitted!');
    } catch (error) {
      console.error('Error submitting feedback:', error);
      toast.error('Failed to submit feedback. Please try again.');
    }
  };

  const addToCart = (dish) => {
    setCart((prev) => {
      const existing = prev[dish._id];
      return {
        ...prev,
        [dish._id]: {
          dish,
          quantity: existing ? existing.quantity + 1 : 1,
        },
      };
    });
  };

  const updateQuantity = (dishId, delta) => {
    setCart((prev) => {
      const current = prev[dishId];
      if (!current) return prev;
      const newQty = current.quantity + delta;
      if (newQty <= 0) {
        const { [dishId]: _, ...rest } = prev;
        return rest;
      }
      return { ...prev, [dishId]: { ...current, quantity: newQty } };
    });
  };

  const removeFromCart = (dishId) => {
    setCart((prev) => {
      const { [dishId]: _, ...rest } = prev;
      return rest;
    });
  };

  const cartTotal = useMemo(() => {
    return Object.values(cart).reduce((sum, item) => sum + item.quantity, 0);
  }, [cart]);

  const cartPrice = useMemo(() => {
    return Object.values(cart).reduce((sum, item) => sum + item.quantity * 5, 0);
  }, [cart]);

  const handlePlaceOrder = async () => {
    if (Object.keys(cart).length === 0) {
      toast.error("Cart is empty!");
      return;
    }
    setOrderLoading(true);
    try {
      const orderItems = Object.values(cart).map((item) => ({
        dishId: item.dish._id,
        dish: item.dish.dish,
        quantity: item.quantity,
      }));
      await axios.post(
        `${process.env.REACT_APP_BASE_URL}/${_id}/order`,
        { items: orderItems },
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      toast.success("Order placed successfully!");
      setCart({});
      setCartOpen(false);
    } catch (error) {
      console.error("Error placing order:", error);
      toast.error("Failed to place order. Please try again.");
    } finally {
      setOrderLoading(false);
    }
  };

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
      <div key={dish._id} className="relative">
        <FoodCard dish={dish} onClick={() => handleDishClick(dish.dishId)} />
        <button
          onClick={(e) => { e.stopPropagation(); addToCart(dish); }}
          className="absolute top-2 right-2 bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition-colors shadow-md"
          aria-label="Add to cart"
        >
          <FaShoppingCart size={14} />
        </button>
        {cart[dish._id] && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
            {cart[dish._id].quantity}
          </span>
        )}
      </div>
    ));
  };

  const renderSearchResults = () => {
    if (searchResults.length === 0) {
      return <p className="text-xl text-red-700 text-center dark:text-red-400">No Results Found</p>;
    }
    return searchResults.map((dish) => (
      <div key={dish._id} className="relative">
        <FoodCard dish={dish} onClick={() => handleDishClick(dish.dishId)} />
        <button
          onClick={(e) => { e.stopPropagation(); addToCart(dish); }}
          className="absolute top-2 right-2 bg-green-500 text-white p-2 rounded-full hover:bg-green-600 transition-colors shadow-md"
          aria-label="Add to cart"
        >
          <FaShoppingCart size={14} />
        </button>
        {cart[dish._id] && (
          <span className="absolute top-2 left-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
            {cart[dish._id].quantity}
          </span>
        )}
      </div>
    ));
  };
  return (
    <div className="text-purple-800 min-h-screen pt-5 bg-transparent dark:bg-slate-200">

      <Navbar />
      {/* Cart toggle button */}
      <button
        onClick={() => setCartOpen(!cartOpen)}
        className="fixed bottom-6 right-6 z-50 bg-green-600 text-white p-4 rounded-full shadow-xl hover:bg-green-700 transition-colors"
        aria-label={`Cart with ${cartTotal} items`}
      >
        <FaShoppingCart size={24} />
        {cartTotal > 0 && (
          <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-6 h-6 flex items-center justify-center">
            {cartTotal}
          </span>
        )}
      </button>

      {/* Cart panel */}
      {cartOpen && (
        <div className="fixed inset-0 z-40 flex justify-end">
          <div className="absolute inset-0 bg-black opacity-50" onClick={() => setCartOpen(false)} />
          <div className="relative w-full max-w-md bg-white dark:bg-gray-800 shadow-xl p-6 overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold dark:text-white">Your Cart</h2>
              <button onClick={() => setCartOpen(false)} className="text-gray-500 hover:text-gray-700 text-2xl" aria-label="Close cart">&times;</button>
            </div>
            {Object.keys(cart).length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400 text-center py-8">Cart is empty</p>
            ) : (
              <>
                {Object.values(cart).map((item) => (
                  <div key={item.dish._id} className="flex items-center justify-between py-3 border-b dark:border-gray-600">
                    <div className="flex-1">
                      <p className="font-semibold dark:text-white">{item.dish.dish}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">$5.00 x {item.quantity}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateQuantity(item.dish._id, -1)}
                        className="bg-gray-200 dark:bg-gray-600 p-1 rounded hover:bg-gray-300 dark:hover:bg-gray-500"
                        aria-label={`Decrease quantity of ${item.dish.dish}`}
                      >
                        <FaMinus size={12} />
                      </button>
                      <span className="w-8 text-center font-semibold dark:text-white">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.dish._id, 1)}
                        className="bg-gray-200 dark:bg-gray-600 p-1 rounded hover:bg-gray-300 dark:hover:bg-gray-500"
                        aria-label={`Increase quantity of ${item.dish.dish}`}
                      >
                        <FaPlus size={12} />
                      </button>
                      <button
                        onClick={() => removeFromCart(item.dish._id)}
                        className="text-red-500 hover:text-red-700 p-1"
                        aria-label={`Remove ${item.dish.dish} from cart`}
                      >
                        <FaTrash size={14} />
                      </button>
                    </div>
                  </div>
                ))}
                <div className="mt-4 text-right">
                  <p className="text-lg font-bold dark:text-white">Total: ${cartPrice.toFixed(2)}</p>
                </div>
                <button
                  onClick={handlePlaceOrder}
                  disabled={orderLoading}
                  className="w-full mt-4 bg-green-600 text-white py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {orderLoading ? "Placing Order..." : "Place Order"}
                </button>
              </>
            )}
          </div>
        </div>
      )}

      <div className="container px-8 mx-auto p-4 mt-20 h-auto bg-transparent dark:bg-slate-200">
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
            aria-label="Search for a dish"
          />
        </div>
        {searchTerm ? (
          <div className=" grid grid-cols-1 relative md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center">
            {loading ? <Loader /> : renderSearchResults()}
          </div>
        ) : (
          <>
            <h1 className="text-4xl font-bold mb-8 text-white text-center capitalize dark:text-black">{selectedCategory}</h1>
            {loading ? (
              <Loader />
            ) : (
              <div className=" grid grid-cols-1 relative md:grid-cols-2 lg:grid-cols-3 gap-4 justify-center">
                {renderMenuItems()}
              </div>
            )}
          </>
        )}
      </div>

      <div className=" mt-20 text-purple-800 px-8 mb-4">
          <h2 className="text-2xl font-bold mb-4 text-white text-center dark:text-black">Meal Feedback</h2>
          <BasicRating/>
          <textarea
            className="w-full h-32 p-4 border border-purple-300 rounded mb-4 mt-5 "
            placeholder="Enter your feedback here..."
            value={studentfeedback}
            onChange={(e) => setstudentFeedback(e.target.value)}
            aria-label="Meal feedback"
          ></textarea>
          
          <button
            onClick={handlestudentFeedbackSubmit}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Submit Feedback
          </button>
        </div>
      
      {/* Contact Links */}

      <div className="bg-green-100 p-6 rounded-lg shadow-lg text-black font-semibold">
      <h4 className="text-2xl mb-4">Contact With Canteen</h4>

      <div className="mb-4">
        Email: <a href={`mailto:${canteenData.email}`} className="text-blue-400">{canteenData.email}</a>
      </div>

      {canteenData && canteenData.canteenSocialMediaLinks && (
        <div className="flex flex-wrap gap-5 my-2">
          {canteenData.canteenSocialMediaLinks.Facebook && (
            <Link
              to={canteenData.canteenSocialMediaLinks.Facebook}
              className="text-blue-500 text-4xl"
              target="_blank"
            >
              <FaFacebook />
            </Link>
          )}
          {canteenData.canteenSocialMediaLinks.LinkedIn && (
            <Link
              to={canteenData.canteenSocialMediaLinks.LinkedIn}
              className="text-blue-500 text-4xl"
              target="_blank"
            >
              <FaLinkedinIn />
            </Link>
          )}
          {canteenData.canteenSocialMediaLinks.Youtube && (
            <Link
              to={canteenData.canteenSocialMediaLinks.Youtube}
              className="text-red-500 text-4xl"
              target="_blank"
            >
              <FaYoutube />
            </Link>
          )}
          {canteenData.canteenSocialMediaLinks.Instagram && (
            <Link
              to={canteenData.canteenSocialMediaLinks.Instagram}
              className="text-pink-500 text-4xl"
              target="_blank"
            >
              <FaInstagram />
            </Link>
          )}
        </div>
      )}
    </div>

      <Footer />
    </div>
  );
}

export default MenuPage;
