import React from 'react';
import './ChatCard.css';

function ChatCard({ name, photo, text, onClick }) {
    return (
        <div className="chat-card" onClick={onClick}> 
            <div className="chat-box">
                <img className="avatar" src={photo} alt={name} />
                <div className="chat-info">
                    <h3>{name}</h3>
                    <p>{text}</p>
                </div>
            </div>
        </div>
    );
}

export default ChatCard;
