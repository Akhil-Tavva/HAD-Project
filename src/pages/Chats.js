import React, { useState, useEffect } from 'react';
import Layout from '../components/Layout'
import SrLayout from '../components/SrDoctorLayout';
import './Chats.css'
import { customHeaders, url } from '../const';
import axios from 'axios'
import toast from 'react-hot-toast'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ChatInputBar from '../components/ChatInputBar'; // Import the ChatInputBar component

function Chats() {
    const [userIdList, setUserIdList] = useState([]);
    const [userNameList, setUserNameList] = useState([]);
    const [chatList, setChatList] = useState([])
    // const [messages, setMessages] = useState([])
    const [role, setRole] = useState('')
    const [userId, setUserId] = useState([])

    const Userdetails = AsyncStorage.getItem('Role');
    // Function to get user role
    const getUserRole = async () => {
        const userRole = await AsyncStorage.getItem('Role');
        setRole(userRole);
    };

    const fetchName = async (userIdList) => {
        try {
            console.log('Fetching userIdlist in fetchName', userIdList);
            const promises = userIdList.map(async (userId) => {
                axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
                const response = await axios.post(url + '/auth/specific', { "id": userId }, {
                    headers: customHeaders
                });
                return { userId, username: response.data.payload };
            });

            const results = await Promise.all(promises);
            console.log("Printing Results", results);
            setUserNameList(results);
            console.log("Username list is: ", userNameList) // contains both id and username
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
    };

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
            console.log("!!!", response.data.payload)
            const responseData = response.data.payload
            console.log("Printing response data", responseData)
            await setUserIdList(responseData);
            console.log("Printing userIDlist in fetchData", userIdList);
            // fetchName(response.data.payload)
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
    };

    const fetchChats = async (userId) => {
        try {
            setUserId(userId);
            console.log('Fetching userIdlist in fetchChat', userId);
            axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
            const response = await axios.post(url + '/api/chat', { "id2": userId }, {
                headers: customHeaders
            });
            // return { messages: response.data.payload.reverse() };

            // const results = await Promise.all(promises);
            console.log("Printing Chat Results", response.data.payload.reverse());
            setChatList(response.data.payload);
            console.log("Chat list is: ", chatList)
        } catch (error) {
            if (error.response) {
                // The request was made and the server responded with a status code
                // console.error('Server responded with status:', error.response.status);
                // console.error('Response data:', error.response.data);
                // toast.error('Server Error: ' + error.response.data.message);
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

    useEffect(() => {
        fetchData();
        getUserRole();
    }, []);

    useEffect(() => {
        fetchName(userIdList);
    }, [userIdList]);

    useEffect(() => {
        fetchChats(userId);
    }, [userId]);

    const handleSendMessage = async (content) => {
        console.log('Sending message:', content);
        // add userId
        try {
            axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
            const response = await axios.post(url + '/api/chat/new', { 'receiverId': userId, 'content': content }, {
                headers: customHeaders
            });
            console.log(response.data)
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

    };

    // const chatData = [
    //     {
    //         id: 1,
    //         name: "Dharmin",
    //         messages: [
    //             { id: 1, text: "Hey, how are you?", sender: "You" },
    //             { id: 2, text: "I'm fine, thanks!", sender: "Dharmin" }
    //         ]
    //     },
    //     {
    //         id: 2,
    //         name: "Netra",
    //         messages: [
    //             { id: 3, text: "Hi there!", sender: "Netra" },
    //             { id: 4, text: "Hello!", sender: "You" }
    //         ]
    //     },
    //     {
    //         id: 3,
    //         name: "Rudransh",
    //         messages: [
    //             { id: 5, text: "How's it going?", sender: "You" },
    //             { id: 6, text: "Pretty good, and you?", sender: "Rudransh" }
    //         ]
    //     },
    //     {
    //         id: 4,
    //         name: "Akhil",
    //         messages: [
    //             { id: 7, text: "Nice to meet you!", sender: "Akhil" },
    //             { id: 8, text: "Likewise!", sender: "You" },
    //             { id: 9, text: "How have you been?", sender: "You" },
    //             { id: 10, text: "I've been good, thanks!", sender: "Akhil" }
    //         ]
    //     },
    //     {
    //         id: 5,
    //         name: "Vaibhav",
    //         messages: [
    //             { id: 11, text: "What's up?", sender: "Vaibhav" },
    //             { id: 12, text: "Not much, just chilling.", sender: "You" },
    //             { id: 13, text: "Want to catch up later?", sender: "You" },
    //             { id: 14, text: "Sure, I'd love to!", sender: "Vaibhav" }
    //         ]
    //     },
    //     // Add more chat data as needed
    // ];

    // const handleChatSelect = async(userId) => {
    //     setUserId(userId)
    //     // let messages = [];
    //     // chatList.forEach(obj => {
    //     //     obj.messages.forEach(message => {
    //     //         if (message.receiverId === userId || message.senderId ) {
    //     //             console.log(message.receiverId)
    //     //             messages.push(message);
    //     //         }
    //     //     });
    //     // })
    //     try {
    //         axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
    //         const response = await axios.post(url + '/api/chat/new', {'receiverId': userId, 'content': content}, {
    //             headers: customHeaders
    //         });
    //         console.log(response.data)
    //         // setMessages(messages);
    //         // console.log('Messages: ', messages)

    //     } catch (error) {
    //         if (error.response) {
    //             // The request was made and the server responded with a status code
    //             console.error('Server responded with status:', error.response.status);
    //             console.error('Response data:', error.response.data);
    //             toast.error('Server Error: ' + error.response.data.message);
    //         } else if (error.request) {
    //             // The request was made but no response was received
    //             console.error('No response received:', error.request);
    //             toast.error('No response from server');
    //         } else {
    //             // Something else happened while setting up the request
    //             console.error('Error setting up request:', error.message);
    //             toast.error('Error setting up request');
    //         }
    //     }
    // };

    return (
        <>
            {role === 'DOCTOR' ? (
                <Layout>
                    <div className="chat-container">
                        <div className="chat-list">
                            {userNameList.map(({ userId, username }) => (
                                <div className='chat-card' key={username} onClick={() => fetchChats(userId)}>
                                    <p>{username}</p>
                                </div>
                            ))}

                        </div>
                        <div className="chat-details">
                            {chatList && (
                                <div>
                                    {chatList.map((message) => (
                                        <div key={message.id} className="message-container">
                                            <div className={message.senderId.toString() === userId.toString() ? "sender" : "receiver"}>
                                                <p>{message.content}</p>
                                            </div>
                                            {/* <div className={message.senderId === userId ? "sender" : "receiver"}>
                                                <p>{message.content}</p>
                                            </div> */}
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
                            {userNameList.map(({ username }) => (
                                <div className='chat-card' key={username}>
                                    <p>{username}</p>
                                </div>
                            ))}
                        </div>
                        <div className="chat-details">
                            {chatList && (
                                <div>
                                    {chatList.map((message) => (
                                        <div key={message.id} className="message-container">
                                            <div className={message.sender === userId ? "sender" : "receiver"}>
                                                <p>{message.con}</p>
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
                </SrLayout>
            )}
        </>
    );
}

export default Chats;
