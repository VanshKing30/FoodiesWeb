import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Reviews = () => {
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_BASE_URL}/reviews`); // Adjust URL based on your backend route
        setReviews(response.data);
      } catch (error) {
        console.error('Error fetching reviews:', error);
      }
    };

    fetchReviews();
  }, []);

  const renderStars = (rating) => {
    const totalStars = 5;
    const filledStars = '★'.repeat(rating);
    const emptyStars = '☆'.repeat(totalStars - rating);
    return (
      <span className="stars">
        {filledStars}
        {emptyStars}
      </span>
    );
  };

  return (
    <div className="Reviews__container">
      {reviews.map(review => (
        <div key={review._id} className="Reviews__card ">
          <p className='Feedback__name'>{review.studentName}</p>
          <div className="Feedback__standard">
            <h3>Rating: {renderStars(review.rating)}</h3>
            <p>{review.comment}</p>
            <p><strong>Canteen:</strong> {review.canteenName}</p>
            <p><small>{new Date(review.createdAt).toLocaleString()}</small></p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Reviews;
