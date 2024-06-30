import React from 'react';
import CanteenCard from './CanteenCard';

const CanteenList = ({ canteenData }) => {
  if (!canteenData || !canteenData.data) {
    return <p>No canteen data available.</p>;
  }

  return (
    <div className="flex flex-wrap justify-center mt-20">
      {canteenData.data.map((canteen) => (
        <CanteenCard key={canteen._id} canteen={canteen} />
      ))}
    </div>
  );
};

export default CanteenList;
