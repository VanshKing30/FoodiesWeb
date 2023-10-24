import React, { useState } from "react";
import { Link } from "react-router-dom";
import myHotel from "../assets/myHotel.jpg"

const CanteenCard = ({ canteen  }) => {
  const [selectedRecipes, setSelectedRecipes] = useState({});

  const handleAddToMenu = (recipeId) => {
    setSelectedRecipes((prevSelectedRecipes) => ({
      ...prevSelectedRecipes,
      [canteen._id]: [...(prevSelectedRecipes[canteen._id] || []), recipeId],
    }));
  };

  return (
    <div className="max-w-sm bg-white border border-white rounded-lg shadow dark:bg-white dark:border-white my-4 mx-2 transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:shadow-green-500/50 ...">
    <div className="flex justify-center">
      <a href="#">
        <img
          className="rounded-t-lg h-48 w-full object-cover"
          src={myHotel}
          alt={canteen.name}
        />
      </a>
    </div>
    <div className="p-5">
      <a href="#">
        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-900 hover:text-green-500 transition duration-300 ease-in-out">
          {canteen.name}
        </h5>
      </a>

      <Link
        to={`/menu/${canteen._id}`}
        className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 transition duration-300 ease-in-out"
      >
        View Menu
        <svg
          className="w-3.5 h-3.5 ml-2"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 14 10"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M1 5h12m0 0L9 1m4 4L9 9"
          />
        </svg>
      </Link>
    </div>
  </div>
  );
};

export default CanteenCard;
