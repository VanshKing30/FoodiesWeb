import React, { useState, useEffect } from 'react';

const Reviews = ({ productId }) => {
    const [reviews, setReviews] = useState([]);
    const [rating, setRating] = useState(0);

    useEffect(() => {
        fetch(`/reviews/${productId}`)
            .then(response => response.json())
            .catch(err => console.error(err))