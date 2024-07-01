import React, { useState } from "react";

const Modalupdate = ({ dish, onUpdate, onCancel }) => {
  const [updatedDish, setUpdatedDish] = useState({
    dish: dish.dish,
    description: dish.description || "",
    dishImage: null, // For the new image file
  });

  const handleFileChange = (e) => {
    setUpdatedDish({ ...updatedDish, dishImage: e.target.files[0] });
  };

  const handleUpdate = () => {
    onUpdate(updatedDish);
  };

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl mb-4">Edit Dish</h2>
        <input
          type="text"
          value={updatedDish.dish}
          onChange={(e) => setUpdatedDish({ ...updatedDish, dish: e.target.value })}
          className="border border-gray-300 p-2 w-full mb-4"
        />
        <textarea
          value={updatedDish.description}
          onChange={(e) => setUpdatedDish({ ...updatedDish, description: e.target.value })}
          className="border border-gray-300 p-2 w-full mb-4"
          placeholder="Description"
        />
        <input
          type="file"
          onChange={handleFileChange}
          className="border border-gray-300 p-2 w-full mb-4"
        />
        <div className="flex justify-end">
          <button
            onClick={onCancel}
            className="bg-gray-300 text-black px-4 py-2 rounded mr-2"
          >
            Cancel
          </button>
          <button
            onClick={handleUpdate}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modalupdate;
