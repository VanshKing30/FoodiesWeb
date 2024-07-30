import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader/Loader";
import { ThemeContext } from "../themeContext";

const FeedbackList = () => {
  const { _id } = useParams();
  const { theme } = useContext(ThemeContext);
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFeedbacks = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/feedbacks/${_id}`);
        setFeedbacks(response.data);
      } catch (error) {
        console.error("Error fetching feedbacks:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchFeedbacks();
  }, [_id]);

  if (loading) return <Loader />;

  return (
    <div className={`min-h-screen ${theme === "dark" ? "bg-[#131b33] text-white" : "bg-white text-gray-900"}`}>
      <h1 className="text-4xl font-bold mb-8 text-center">Feedbacks</h1>
      {feedbacks.length > 0 ? (
        feedbacks.map((feedback) => (
          <div key={feedback._id} className="border border-gray-300 rounded p-4 mb-4">
            <p>{feedback.message}</p>
            <p className="text-gray-500">User ID: {feedback.userId}</p>
          </div>
        ))
      ) : (
        <p className="text-center">No feedback available.</p>
      )}
    </div>
  );
};

export default FeedbackList;
