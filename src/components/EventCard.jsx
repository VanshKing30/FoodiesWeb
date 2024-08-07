// src/components/EventCard.jsx
import React from 'react';
import './EventCard.css'; // Optional: for styling
const EventCard = ({ event }) => {
  const { title, date, description, imageUrl } = event;
  return (
    <div className="event-card">
      {imageUrl && (
        <img src={imageUrl} alt={title} className="event-image" />
      )}
      <div className="event-content">
        <h2 className="event-title">{title}</h2>
        <p className="event-date">{new Date(date).toLocaleDateString()}</p>
        <p className="event-description">{description}</p>
      </div>
    </div>
  );
};
export default EventCard;
