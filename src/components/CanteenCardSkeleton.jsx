import React from 'react';

const CanteenCardSkeleton = () => {
  return (
    <div className="sm:w-64 w-[80vw] px-5 bg-white flex flex-col border pt-5 h-[320px] border-white rounded-lg shadow dark:bg-none dark:border-white my-4 mx-2 transition duration-300 ease-in-out transform hover:scale-105 hover:shadow-lg hover:shadow-green-500/50 ... md:justify-center">
      {/* Image Skeleton */}
      <div className="flex justify-center items-center h-48 w-full bg-gray-300 dark:bg-gray-300 rounded-t-lg animate-pulse">
        {/* You can add an icon or leave it empty */}
      </div>
      
      <div className="p-5 space-y-3">
        {/* Title Skeleton */}
        <div className="h-6 bg-gray-300 dark:bg-gray-300 rounded animate-pulse"></div>
        
        {/* Button Skeleton */}
        <div className="h-8 flex justify-center items-center w-24 bg-blue-300 dark:bg-blue-700 rounded-lg animate-pulse"></div>
      </div>
    </div>
  );
};

export default CanteenCardSkeleton;
