// src/components/NotificationBell.jsx
import React, { useState } from 'react';
import './NotificationBell.css'; // Optional: for styling
const NotificationBell = () => {
  const [notifications, setNotifications] = useState([
    { id: 1, text: 'New comment on your post' },
    { id: 2, text: 'New follower' },
  ]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const handleBellClick = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const handleNotificationClick = (id) => {
    // Handle notification click (e.g., mark as read, navigate to detail page)
    console.log(`Notification ${id} clicked`);
  };
  return (
    <div className="notification-bell">
      <button className="bell-icon" onClick={handleBellClick}>
        <span className="bell">&#128276;</span> {/* Bell icon */}
        {notifications.length > 0 && (
          <span className="notification-count">{notifications.length}</span>
        )}
      </button>
      {isDropdownOpen && (
        <div className="dropdown-menu">
          {notifications.length === 0 ? (
            <div className="no-notifications">No notifications</div>
          ) : (
            notifications.map((notification) => (
              <div
                key={notification.id}
                className="notification-item"
                onClick={() => handleNotificationClick(notification.id)}
              >
                {notification.text}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
};
export default NotificationBell;
