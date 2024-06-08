import React, { useState } from 'react';
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "./Rateus.css";

const RateUs = () => {
  const [rating, setRating] = useState(0);
  const [feedback, setFeedback] = useState('');

  const handleRatingChange = (value) => {
    setRating(value);
    updateStars(value);
  };

  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };

  const handleSubmit = () => {
    if (rating > 0 && feedback.trim() !== '') {
      toast.success("Thanks for Your Feedback :)");
      console.log('Rating:', rating);
      console.log('Feedback:', feedback);
    } else {
      toast.error("Please Fill All The Details :(");
    }
  };

  const updateStars = (rating) => {
    const stars = document.querySelectorAll('.stars input[type="radio"]');
    stars.forEach((star, index) => {
      if (index < rating) {
        star.checked = true;
        star.nextElementSibling.style.color = '#ffcf00';
      } else {
        star.checked = false;
        star.nextElementSibling.style.color = '#ccc';
      }
    });
  };

  return (
    <div>
      <Navbar />
      <div className="container">
        <h1>Rate Our Website</h1>
        <div className="stars">
          {[1, 2, 3, 4, 5].map((value) => (
            <React.Fragment key={value}>
              <input
                type="radio"
                name="rating"
                id={`star${value}`}
                value={value}
                checked={rating === value}
                onChange={() => handleRatingChange(value)}
              />
              <label
                htmlFor={`star${value}`}
                className={rating >= value ? 'active' : ''}
                onClick={() => handleRatingChange(value)}
              >
                &#9733;
              </label>
            </React.Fragment>
          ))}
        </div>
        <textarea
          className="feedback"
          placeholder="Tell us what you think..."
          value={feedback}
          onChange={handleFeedbackChange}
        ></textarea>
        <button className="submit-btn" onClick={handleSubmit}>
          Submit
        </button>
      </div>
      <Footer />
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default RateUs;
