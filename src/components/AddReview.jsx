import React, { useState } from 'react';

const AddReview = ({ productId }) => {
    const [rating, setRating] = useState(1);
    const [reviewText, setReviewText] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch('/reviews', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${yourAuthToken}` // Replace with your auth token logic
            },
            body: JSON.stringify({ product_id: productId, rating, review_text: reviewText })
        });

        if (response.ok) {
            // Handle success (e.g., refresh reviews)
        } else {
            // Handle error
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Rating:
                <select value={rating} onChange={(e) => setRating(e.target.value)}>
                    {[1, 2, 3, 4, 5].map(n => <option key={n} value={n}>{n}</option>)}
                </select>
            </label>
            <label>
                Review:
                <textarea value={reviewText} onChange={(e) => setReviewText(e.target.value)} />
            </label>
            <button type="submit">Submit</button>
        </form>
    );
};

export default AddReview;
