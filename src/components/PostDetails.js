import React, { useState, useEffect } from 'react'
import Layout from './Layout'
import AdminLayout from './AdminLayout'
import SeniorDoctorLayout from './Layout'
import ModeratorLayout from './ModeratorLayout'
import './PostCard.css'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios  from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import {url} from '../const'

function PostDetails({ postId }) {
    
    const [role, setRole] = useState('');
    const Userdetails = AsyncStorage.getItem('Role');
    async function someFunction() {
        await Userdetails.then((res) => setRole(res)); // Assuming promiseObject is your Promise
    }
    someFunction()
    console.log('User Role: ', role)
    
    const [post, setPost] = useState(null);
    useEffect(() => {
        // Fetch the post details based on postId
        const fetchPostDetails = async () => {
            try {
                axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
                const response = await axios.post(url+`forum/${postId}`);
                setPost(response.data); // Assuming the response contains the post details
            } catch (error) {
                console.error('Error fetching post details:', error);
                // Handle error
            }
        };

        fetchPostDetails();
    }, [postId]);

    if (!post) {
        return (
            <AdminLayout>
                <Link to="/deletepost" >
                    <button className='create-post'>Delete Post</button>
                </Link>
                {/* check user authentication */}
                {/* if the user is the one who posted it then edit post option should be available */}
                
                <button id="editButton" class="edit-button">Edit</button>
            
                <hr />
                Loading ...
                <h2> {postId} </h2>
                <hr />
                <div className="actions">
                    <div className="icon-container">
                        <div className={`icon-left`}>
                            <i className="ri-heart-line"></i>
                            <span className='like'> Like </span>
                        </div>
                        <div className="icon-center">
                            <i className="ri-chat-4-line"></i>
                            <span className='comment'> Comments </span>
                        </div>
                        <div className="icon-right">
                            <i className="ri-flag-2-line"></i>
                            <span>   Report   </span>
                        </div>
                    </div>
                </div>
                <hr />
                    
            </AdminLayout>
        );
    }

    return (
        <>
            {role === 'ADMIN' ? (
                <AdminLayout>
                    <button className='create-post'>Create Post</button>
                    <hr />
                    <h2>{post.text}</h2>
                    <hr />
                    <p>{post.name}</p>
                    <hr />
                    <i className="ri-heart-line">
                        <span>{post.likes} Likes</span>
                    </i>
                    <i className="ri-chat-4-line">
                        <span className='comment'> Comments</span>
                    </i>
                </AdminLayout>
            ) : role === 'SENIOR_DOCTOR' ? (
                <SeniorDoctorLayout>
                    <button className='create-post'>Create Post</button>
                    <hr />
                    <h2>{post.text}</h2>
                    <hr />
                    <p>{post.name}</p>
                    <hr />
                    <i className="ri-heart-line">
                        <span>{post.likes} Likes</span>
                    </i>
                    <i className="ri-chat-4-line">
                        <span className='comment'> Comments</span>
                    </i>                </SeniorDoctorLayout>
            ) : role === 'MODERATOR' ? (
                <ModeratorLayout>
                    <button className='create-post'>Create Post</button>
                    <hr />
                    <h2>{post.text}</h2>
                    <hr />
                    <p>{post.name}</p>
                    <hr />
                    <i className="ri-heart-line">
                        <span>{post.likes} Likes</span>
                    </i>
                    <i className="ri-chat-4-line">
                        <span className='comment'> Comments</span>
                    </i>
                </ModeratorLayout>
            ) : (
                <Layout>
                    <button className='create-post'>Create Post</button>
                    <hr />
                    <h2>{post.text}</h2>
                    <hr />
                    <p>{post.name}</p>
                    <hr />
                    <i className="ri-heart-line">
                        <span>{post.likes} Likes</span>
                    </i>
                    <i className="ri-chat-4-line">
                        <span className='comment'> Comments</span>
                    </i>
                </Layout>
            )}
        </>
    );
}

export default PostDetails;