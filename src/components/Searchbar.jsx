import React, { useState } from "react";

function Searchbar({ searchValueHandler }) {
  const [value, setValue] = useState("");

  const handleChange = (e) => {
    // Update the state with the input value
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    searchValueHandler(value); // Pass the search value to the parent component
    setValue("");
  };

  return (
    <div className="max-w-fit mx-auto ">
      <div className="absolute top-28 z-50 ">
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            className="text-center rounded-l-md p-1"
            placeholder="Search Canteens"
            onChange={handleChange}
            value={value}
            required
          />
          <button
            className="rounded-r-md hover:cursor-pointer bg-green-500 p-1 w-10 "
            type="submit"
          >
            🔍
          </button>
        </form>
      </div>
    </div>
  );
}

export default Searchbar;
