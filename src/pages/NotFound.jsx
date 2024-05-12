import React from 'react';
import { useNavigate } from 'react-router-dom';


const NotFound = () => {
  const navigate = useNavigate();

  const handleDashboard = () => {
    navigate('/home');
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center">
      <h1 className="text-9xl font-extrabold text-gray-800 mb-4 relative">
  <span className="text-transparent bg-gradient-to-r from-indigo-900 to-gray-900 bg-clip-text">Oops!</span>
  
</h1>

      <p className="text-2xl text-gray-600 mb-8 font-bold mt-4">404 - PAGE NOT FOUND</p>
      <p className="text-xl text-black mb-8 mx-3 ">
        The page you're looking for doesn't exist. Please go back by clicking the link below.
      </p>
      <button
        onClick={handleDashboard}
        className="flex justify-center border-gray-400 bg-blue-700 text-white hover:text-white hover:bg-black rounded-full text-2xl items-center"
        style={{ padding: '1rem 2rem' }}
      >
        Go to Dashboard
      </button>
    </div>
  );
};

export default NotFound;
