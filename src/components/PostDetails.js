import React, { useState, useEffect } from 'react';
import Layout from './Layout'
import AdminLayout from './AdminLayout';
import SeniorDoctorLayout from './Layout'
import ModeratorLayout from './ModeratorLayout'
import { useParams } from 'react-router-dom'; // Import useParams hook to access URL parameters
import './PostCard.css'
import AsyncStorage from '@react-native-async-storage/async-storage'

function PostDetails({ post }) {
    const [role, setRole] = useState('');

    //   const { postId } = useParams(); // Extract postId from URL parameters
    //   const [post, setPost] = useState(null);

    //   useEffect(() => {
    //     // Find the post with the matching postId
    //     console.log(posts)
    //     const foundPost = posts.find(post => post.id === postId);
    //     setPost(foundPost);
    //   }, [posts, postId]);
    const Userdetails = AsyncStorage.getItem('Role');
    async function someFunction() {
        await Userdetails.then((res) => setRole(res)); // Assuming promiseObject is your Promise
    }
    someFunction()
    console.log('User Role: ', role)
    if (!post) {
        return (
            <AdminLayout>
                Loading ...
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
