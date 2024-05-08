import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout'
import SrLayout from '../components/SrDoctorLayout';
import './Chats.css'
import { url } from '../const';
import axios from 'axios'
// import { showLoading, hideLoading } from '../redux/alertsSlice';
// import { Link, useNavigate } from 'react-router-dom'
// import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast'
import AsyncStorage from '@react-native-async-storage/async-storage'

function Chats() {
    // const dispatch = useDispatch();
    // const navigate = useNavigate();
    const [chats, setChats] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null)
    const [role, setRole] = useState('')
    const Userdetails = AsyncStorage.getItem('Role');
    async function someFunction() {
        await Userdetails.then((res) => setRole(res)); // Assuming promiseObject is your Promise
    }
    someFunction()
    console.log('User Role: ', role)

    const getData = async () => {
        try {
            axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
            // const response = await axios.get('http://localhost:8080/forum/')
            const response = await axios.get(url + '/api/chat');
            console.log(response.data)
            setChats(response.data.payload)
            console.log(chats)
        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                console.error('Server responded with status:', error.response.status);
                console.error('Response data:', error.response.data);
                toast.error('Server Error: ' + error.response.data.message);
            } else if (error.request) {
                // The request was made but no response was received
                console.error('No response received:', error.request);
                toast.error('No response from server');
            } else {
                // Something else happened while setting up the request
                console.error('Error setting up request:', error.message);
                toast.error('Error setting up request');
            }
        }
    }

    // useEffect(() => {
    //     getData()
    // }, [])

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
            name: "Akhil",
            messages: [
                { id: 7, text: "Nice to meet you!", sender: "Akhil" },
                { id: 8, text: "Likewise!", sender: "You" },
                { id: 9, text: "How have you been?", sender: "You" },
                { id: 10, text: "I've been good, thanks!", sender: "Akhil" }
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
        <>
            {role === 'DOCTOR' ? (
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
            ) : (
                <SrLayout>
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
                </SrLayout>
            )}
        </>
    );
}

export default Chats;
