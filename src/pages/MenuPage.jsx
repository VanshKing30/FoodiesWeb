import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast } from "react-hot-toast";
import Navbar from "../components/Navbar";
import Loader from "../components/Loader/Loader";
import Footer from "../components/Footer";
import FoodCard from "../components/FoodCard";
import { ThemeContext } from '../themeContext';
import { Link } from "react-router-dom";
import { FaInstagram, FaFacebook, FaLinkedinIn, FaYoutube } from "react-icons/fa";
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
          .catch(err => console.error(err))