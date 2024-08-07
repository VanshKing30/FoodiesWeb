// src/components/ChatSupport.jsx
import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
// Socket server URL
const SOCKET_SERVER_URL = 'http://localhost:3000'; 
const ChatSupport = () => {
  const [socket, setSocket] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [username, setUsername] = useState('');
  useEffect(() => {
    // Initialize socket connection
    const socketIo = io(SOCKET_SERVER_URL);
    setSocket(socketIo);
    // Listen for incoming messages
    socketIo.on('message', (message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
    });
    // Clean up on unmount
    return () => {
      socketIo.disconnect();
    };
  }, []);
  const handleSendMessage = () => {
    if (newMessage.trim() && socket) {
      socket.emit('message', { username, text: newMessage });
      setNewMessage('');
    }
  };
  return (
    <div className="chat-support">
      <div className="chat-window">
        <div className="messages">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.username === username ? 'self' : ''}`}>
              <strong>{msg.username}:</strong> {msg.text}
            </div>
          ))}
        </div>
        <div className="message-input">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
          />
          <button onClick={handleSendMessage}>Send</button>
        </div>
      </div>
    </div>
  );
};
export default ChatSupport;
