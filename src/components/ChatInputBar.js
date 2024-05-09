import React, { useState } from 'react';
import './ChatCard.css';

const ChatInputBar = ({ onSendMessage }) => {
    const [message, setMessage] = useState('');

    const handleMessageChange = (e) => {
        setMessage(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (message.trim() === '') return;
        onSendMessage(message);
        setMessage('');
    };

    return (
        <form onSubmit={handleSubmit} className="input-bar-container">
            <input
                type="text"
                value={message}
                onChange={handleMessageChange}
                className='input-bar'
                placeholder="Type a message..."
            />
            <button type="submit" className='chat-button'>Send</button>
        </form>
    );
};

export default ChatInputBar;
