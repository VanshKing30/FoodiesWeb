import React, { useState, useEffect } from 'react';
import CanteenCard from './CanteenCard';
import CanteenCardSkeleton from './CanteenCardSkeleton';

const CanteenList = ({ canteenData }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000); // Set the loading state to false after 1 second

    return () => clearTimeout(timer); // Clean up the timer on component unmount
  }, []);

  if (!canteenData || !canteenData.data) {
    return <p>No canteen data available.</p>;
  }

  return (
    <div className="flex flex-wrap lg:px-28 gap-5 justify-center mt-20">
      {loading
        ? Array(canteenData.data.length).fill().map((_, index) => <CanteenCardSkeleton key={index} />)
        : canteenData.data.map((canteen) => (
            <CanteenCard key={canteen._id} canteen={canteen} />
          ))}
    </div>
  );
};

export default CanteenList;
