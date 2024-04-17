import React, { useState } from 'react';
import Layout from '../components/Layout';
import ChatCard from '../components/ChatCard';
import ChatDetails from '../components/ChatDetails';
import './Chats.css';

function Chats() {
    const [selectedChat, setSelectedChat] = useState(null);

    const handleChatSelect = (chat) => {
        setSelectedChat(chat);
    };

    const chatData = [
        { id: 1, name: "John Doe", text: "Hey, how are you?" },
        { id: 2, name: "Jane Smith", text: "Hi there!" },
        { id: 3, name: "Michael Johnson", text: "How's it going?" },
        { id: 4, name: "Emily Davis", text: "Nice to meet you!" },
        { id: 5, name: "David Brown", text: "What's up?" },
        { id: 6, name: "Sarah Wilson", text: "Good day!" },
        { id: 7, name: "James Lee", text: "Bye!" },
        { id: 8, name: "Olivia Martinez", text: "Pleased to meet you." },
        { id: 9, name: "Robert Anderson", text: "How are you doing?" },
        { id: 10, name: "Emma Taylor", text: "Nice weather we're having." }
    ];

    return (
        <Layout>
            <div className="chat-container">
                <div className="chat-list">
                    {chatData.map(chat => (
                        <ChatCard
                            key={chat.id}
                            name={chat.name}
                            text={chat.text}
                            onClick={() => handleChatSelect(chat)}
                        />
                    ))}
                </div>
                <div className="chat-details">
                    {selectedChat && <ChatDetails chat={selectedChat} />}
                </div>
            </div>
        </Layout>
    );
}

export default Chats;
