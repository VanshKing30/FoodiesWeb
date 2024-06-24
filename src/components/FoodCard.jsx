// components/FoodCard.js
import React from 'react';

function FoodCard({ dish, onClick }) {
  const placeholderImage = "https://www.holidify.com/blog/wp-content/uploads/2015/11/Maharashtras_Misal_Pav.jpg";
  const defaultDescription = "No description available.";
 // https://via.placeholder.com/150
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden border-2 border-gray-300 cursor-pointer transition-transform duration-300 ease-in-out transform hover:-translate-y-1" onClick={onClick}>
      <img src={dish.imageUrl || placeholderImage} alt={dish.dish || "No image available"} className="w-full h-48 object-cover"/>
      <div className="p-4">
        <h3 className="text-lg text-black font-bold mb-2">{dish.dish}</h3>
        <p className="text-gray-700">{dish.description || defaultDescription}</p>
        {/* <p className="text-gray-700 font-bold">${dish.price}</p> */}
      </div>
    </div>
  );
}

export default FoodCard;
