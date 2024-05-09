import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout'
import SrLayout from '../components/SrDoctorLayout';
import './Chats.css'
import { customHeaders, url } from '../const';
import axios from 'axios'
import toast from 'react-hot-toast'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ChatInputBar from '../components/ChatInputBar'; // Import the ChatInputBar component

// accepted friends chats
// 
function Chats() {
    const [userIdList, setUserIdList] = useState([]);
    const [userNameList, setUserNameList] = useState([]);
    const [selectedChat, setSelectedChat] = useState(null)
    const [role, setRole] = useState('')
    const Userdetails = AsyncStorage.getItem('Role');

    // Function to get user role
    const getUserRole = async () => {
        const userRole = await AsyncStorage.getItem('Role');
        setRole(userRole);
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                // Fetch chat data from API
                axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
                const response = await axios.get(url + '/api/helper/accepted', {
                    headers: customHeaders
                });
                console.log(response.data)
                // setGroups(response.data.payload)
                response.headers = JSON.parse(JSON.stringify(response));
                setUserIdList(response.data.payload);
                // console.log('User Id List: ', userIdList)
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
            
            userIdList.forEach(async userId => {
                // Set authorization header for each request
                axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
                try {
                    // Make the Axios GET request for each user ID
                    const response = await axios.get(url+'/auth/specific', userId, {
                        headers: customHeaders
                    });
                    console.log('Response for user ID', userId, ':', response.data);
                    setUserNameList(prevList => [...prevList, response.data.payload]);
                    // console.log('User Name List: ', userNameList)
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
            });

        };
        fetchData();
        getUserRole();
        // console.log('User Id List: ', userIdList)
        // console.log('User Name List: ',userNameList)
    }, [userNameList]);

    const handleFetchError = (error) => {
        if (error.response) {
            console.error('Server responded with status:', error.response.status);
            console.error('Response data:', error.response.data);
            toast.error('Server Error: ' + error.response.data.message);
        } else if (error.request) {
            console.error('No response received:', error.request);
            toast.error('No response from server');
        } else {
            console.error('Error setting up request:', error.message);
            toast.error('Error setting up request');
        }
    };

    const handleSendMessage = (message) => {
        // Implement sending message functionality here
        console.log('Sending message:', message);
    };

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
                            {/* {chatData.map(chat => (
                                <div key={chat.id} className="chat-card" onClick={() => handleChatSelect(chat)}>
                                    <p>{chat.name}</p>
                                </div>
                            ))} */}
                            {userNameList.map(name => (
                                <div className='chat-card'>
                                    <p> {name}</p>
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
                            <div className='footer'>
                                <ChatInputBar onSendMessage={handleSendMessage} />
                            </div>
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
                            <ChatInputBar className='chat-input-bar' onSendMessage={handleSendMessage} />
                        </div>
                    </div>
                </SrLayout>
            )}
        </>
    );
}

export default Chats;
