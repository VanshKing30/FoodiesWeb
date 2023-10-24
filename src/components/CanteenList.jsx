
import React, { useEffect, useState } from 'react';
import CanteenCard from './CanteenCard';



const CanteenList = ({canteenData}) => {

  return (
    <div className="flex flex-wrap justify-center">
      {canteenData?.data.map(canteen => (
        <CanteenCard key={canteen.id} canteen={canteen}  />
      ))}
    </div>
  );

};

export default CanteenList;
