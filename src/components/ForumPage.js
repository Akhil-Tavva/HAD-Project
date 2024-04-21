import React, { useState, useEffect } from 'react';
import Layout from './Layout'
import { useParams } from 'react-router-dom'; // Import useParams hook to access URL parameters
import './ForumCard.css'

function ForumPage({ post }) {
//   const { postId } = useParams(); // Extract postId from URL parameters
//   const [post, setPost] = useState(null);

//   useEffect(() => {
//     // Find the post with the matching postId
//     console.log(posts)
//     const foundPost = posts.find(post => post.id === postId);
//     setPost(foundPost);
//   }, [posts, postId]);

    if (!post) {
        return (
            <Layout>
                Loading ...
            </Layout>
        );
    }

    return (
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
    );
}

export default ForumPage;
