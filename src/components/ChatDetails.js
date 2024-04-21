import React from 'react';

function ChatDetails({ chat }) { 
    return (
        <div className="chat-details-container">
            <h2>{chat.name}</h2>
            <img className="avatar" src={chat.photo} alt={chat.name} />
            <p>{chat.text}</p>
        
        </div>
    );
}

export default ChatDetails;
