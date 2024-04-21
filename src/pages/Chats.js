import React, { useState } from 'react';
import Layout from '../components/Layout';
import './Chats.css';

function Chats() {
    const [selectedChat, setSelectedChat] = useState(null);

    const chatData = [
        { 
            id: 1, 
            name: "Dharmin", 
            messages: [
                { id: 1, text: "Hey, how are you?", sender: "You" },
                { id: 2, text: "I'm fine, thanks!", sender: "Dharmin" }
            ] 
        },
        { 
            id: 2, 
            name: "Netra", 
            messages: [
                { id: 3, text: "Hi there!", sender: "Netra" },
                { id: 4, text: "Hello!", sender: "You" }
            ] 
        },
        { 
            id: 3, 
            name: "Rudransh", 
            messages: [
                { id: 5, text: "How's it going?", sender: "You" },
                { id: 6, text: "Pretty good, and you?", sender: "Rudransh" }
            ] 
        },
        { 
            id: 4, 
            name: "Akhi", 
            messages: [
                { id: 7, text: "Nice to meet you!", sender: "Akhi" },
                { id: 8, text: "Likewise!", sender: "You" },
                { id: 9, text: "How have you been?", sender: "You" },
                { id: 10, text: "I've been good, thanks!", sender: "Akhi" }
            ] 
        },
        { 
            id: 5, 
            name: "Vaibhav", 
            messages: [
                { id: 11, text: "What's up?", sender: "Vaibhav" },
                { id: 12, text: "Not much, just chilling.", sender: "You" },
                { id: 13, text: "Want to catch up later?", sender: "You" },
                { id: 14, text: "Sure, I'd love to!", sender: "Vaibhav" }
            ] 
        },
        // Add more chat data as needed
    ];

    const handleChatSelect = (chat) => {
        setSelectedChat(chat);
    };

    return (
        <Layout>
            <div className="chat-container">
                <div className="chat-list">
                    {chatData.map(chat => (
                        <div key={chat.id} className="chat-card" onClick={() => handleChatSelect(chat)}>
                            <p>{chat.name}</p>
                        </div>
                    ))}
                </div>
                <div className="chat-details">
                    {selectedChat && (
                        <div>
                            {selectedChat.messages.map((message) => (
                                <div key={message.id} className="message-container">
                                    <div className={message.sender === "You" ? "sender" : "receiver"}>
                                        <p>{message.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </Layout>
    );
}

export default Chats;
