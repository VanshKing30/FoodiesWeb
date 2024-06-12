import React, { useState, useRef, useEffect } from 'react';
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
    <div style={{ 
        backgroundImage: "url('https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg')",
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column'
      }}
    >
      <Navbar />
      <div className="flex items-center justify-center flex-grow">
        <div
          className="w-full max-w-xl mx-0 p-4 bg-white bg-opacity-90 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl"
          style={{ marginBottom: '100px', marginTop: '150px', textAlign: 'center' }}
        >
          <h1 className="text-3xl font-bold mb-0 text-black">Rate Our Website</h1>
          <div className="stars mb-7">
            {[1, 2, 3, 4, 5].map((value) => (
              <React.Fragment key={value}>
                <input
                  type="radio"
                  name="rating"
                  id={`star${value}`}
                  value={value}
                  checked={rating === value}
                  onChange={() => handleRatingChange(value)}
                  className="hidden"
                />
                <label
                  htmlFor={`star${value}`}
                  className={`cursor-pointer text-3xl ${rating >= value ? 'text-yellow-400' : 'text-gray-400'}`}
                  onClick={() => handleRatingChange(value)}
                >
                  &#9733;
                </label>
              </React.Fragment>
            ))}
          </div>
          <textarea
            className="w-full h-32 p-2 mb-7 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
            placeholder="Tell us what you think..."
            value={feedback}
            onChange={handleFeedbackChange}
          ></textarea>
          <div>
            <button
              className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transform hover:scale-105 transition"
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>
        </div>
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
