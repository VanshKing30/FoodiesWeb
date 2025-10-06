import React from 'react';

const Button = ({ text, onClick, type = 'button', className = '' }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 
      bg-blue-600 text-white hover:bg-blue-700 active:scale-95 ${className}`}
    >
      {text}
    </button>
  );
};

export default Button;
