import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import fetchRandomRestaurantImage from "../utils/unsplash";
import { ClipLoader } from "react-spinners"; // Import ClipLoader from react-spinners

const CanteenCard = ({ canteen }) => {
  const [selectedRecipes, setSelectedRecipes] = useState({});
  const [imageSrc, setImageSrc] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getImage = async () => {
      try {
        const imageUrl = await fetchRandomRestaurantImage();
        setImageSrc(imageUrl);
      } catch (error) {
        console.error('Error fetching image:', error);
        setImageSrc('default-image-url');
      } finally {
        setLoading(false);
      }
    };
    getImage();
  }, []);

  const handleAddToMenu = (recipeId) => {
    setSelectedRecipes((prevSelectedRecipes) => ({
      ...prevSelectedRecipes,
      [canteen._id]: [...(prevSelectedRecipes[canteen._id] || []), recipeId],
    }));
  };

  const truncatedName = canteen.name.length > 14 ? canteen.name.substring(0, 14) + "..." : canteen.name;

  return (
    <div className="sm:w-64 w-[80vw] px-5 bg-white flex flex-col  border pt-5 h-[320px] border-white rounded-lg shadow dark:bg-none dark:border-white my-4 mx-2 transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:shadow-green-500/50 ... md:justify-center h-[380px]">
      {loading ? (
        <div className="flex justify-center items-center h-48 w-full">
          <ClipLoader size={50} color={"#123abc"} loading={loading} />
        </div>
      ) : (
        <div className="flex justify-center">
          <a href="#">
            <div className=""><img
              className="rounded-t-lg h-48 w-full object-cover"
              src={canteen.canteenImage ? canteen.canteenImage : imageSrc}
              alt={canteen.name}
            /></div>
          </a>
        </div>
      )}
      <div className="p-5">
        <a href="#">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-gray-900 hover:text-green-500 transition duration-300 ease-in-out overflow-x-hidden">
            {truncatedName}
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
