import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";

const RateUs = () => {
  const [rating, setRating] = useState('');
  const [feedback, setFeedback] = useState('');

  const handleRatingClick = (emoji) => {
    setRating(emoji);
  };

  const handleFeedbackChange = (event) => {
    setFeedback(event.target.value);
  };

  const handleSubmit = () => {
    if (rating && feedback.trim() !== '') {
      toast.success('Thank you for your feedback :)');
    } else {
      toast.error('Please fill all the details :(');
    }
  };

  return (
    <div className="flex flex-col min-h-screen" style={{ 
        backgroundImage: "url('https://images.pexels.com/photos/1640774/pexels-photo-1640774.jpeg')",
        backgroundSize: 'cover',
        backgroundAttachment: 'fixed'
      }}
    >
      <Navbar />
      <div className="flex items-center justify-center flex-grow">
        <div
          className="w-full max-w-xl mx-4 p-8 bg-white bg-opacity-90 rounded-lg shadow-lg transition-transform transform hover:scale-105 hover:shadow-2xl"
          style={{ marginBottom: '100px', marginTop: '150px', textAlign: 'center' }}
        >
          <h1 className="text-3xl font-bold mb-6 text-black">Rate Our Website</h1>
          <div className="mb-6">
            {['😢', '😡', '😐', '😊', '🤩'].map((emoji) => (
              <span
                key={emoji}
                className={`text-3xl cursor-pointer mx-2 transition-transform duration-300 ${
                  rating === emoji ? 'transform scale-150 brightness-150' : ''
                } ${rating === '😡' && emoji === '😡' ? 'filter sepia hue-rotate-180 saturate-200' : ''}`}
                onClick={() => handleRatingClick(emoji)}
              >
                {emoji}
              </span>
            ))}
          </div>
          <textarea
            className="w-full h-32 p-2 mb-6 border border-gray-300 rounded-lg shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500 resize-none"
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
        autoClose={5000} 
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
