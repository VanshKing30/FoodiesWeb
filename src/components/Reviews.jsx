import React, { useState, useEffect } from 'react';

const Reviews = ({ productId }) => {
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(0);

    useEffect(() => {
        fetch(`/reviews/${productId}`)
            .then(response => response.json())
            .then(data => {
                setReviews(data);
                if (data.length > 0) {
                    const avgRating = data.reduce((acc, review) => acc + review.rating, 0) / data.length;
                    setRating(avgRating);
                }
            });
    }, [productId]);

    return (
        <div>
            <h2>Average Rating: {rating.toFixed(1)} / 5</h2>
            <ul>
                {reviews.map(review => (
                    <li key={review.review_id}>
                        <p><strong>Rating:</strong> {review.rating} / 5</p>
                        <p>{review.review_text}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Reviews;
