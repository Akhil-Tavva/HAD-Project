import React, { useState, useEffect } from 'react'
import Layout from './Layout'
import AdminLayout from './AdminLayout'
import SeniorDoctorLayout from './SrDoctorLayout'
import ModeratorLayout from './ModeratorLayout'
import './PostCard.css'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { url } from '../const'

function PostDetails({ postId }) {
    const [role, setRole] = useState('');
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState('');

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
                axios.defaults.headers.common['Authorization'] = `Bearer ${AsyncStorage.getItem('token')}`;
                const response = await axios.post(url + `forum/${postId}`);
                setPost(response.data); // Assuming the response contains the post details
            } catch (error) {
                console.error('Error fetching post details:', error);
                // Handle error 
            }
        };
        fetchPostDetails();
    }, [postId]);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        try {
            // Make API call to submit the comment
            const response = await axios.post(url + `forum/${postId}/comments`, { comment: newComment });
            setComments([...comments, response.data]); // Add the new comment to the state
            setNewComment(''); // Clear the input field
        } catch (error) {
            console.error('Error submitting comment:', error);
            // Handle error
        }
    };

    if (!post) {
        return (
            <SeniorDoctorLayout>
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

                <div className="comments-section">
                    <h3>Comments</h3>
                    <ul className="comments-list">
                        {comments.map((comment, index) => (
                            // have to show comments 
                            <li key={index}>{comment.text}</li>
                        ))}
                    </ul>
                    {/* Add Comment Form */}
                    <form onSubmit={handleCommentSubmit}>
                        <textarea
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            placeholder="Write your comment..."
                            required
                        ></textarea>
                        <button type="submit">Add Comment</button>
                    </form>
                </div>
            </SeniorDoctorLayout>
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
            ) : role === 'DOCTOR' ? (
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
                    </i>                </Layout>
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
                    </i>
                </SeniorDoctorLayout>
            )}
            <div className="comments-section">
                <h3>Comments</h3>
                <ul className="comments-list">
                    {comments.map((comment, index) => (
                        <li key={index}>{comment.text}</li>
                    ))}
                </ul>
                {/* Add Comment Form */}
                <form onSubmit={handleCommentSubmit}>
                    <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Write your comment..."
                        required
                    ></textarea>
                    <button type="submit">Add Comment</button>
                </form>
            </div>
        </>
    );
}

export default PostDetails;