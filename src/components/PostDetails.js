import React, { useState, useEffect } from 'react'
import Layout from './Layout'
import AdminLayout from './AdminLayout'
import SeniorDoctorLayout from './SrDoctorLayout'
import ModeratorLayout from './ModeratorLayout'
import './PostCard.css'
import AsyncStorage from '@react-native-async-storage/async-storage'
import axios from 'axios'
import { Link, useParams } from 'react-router-dom'
import { url, customHeaders } from '../const'
import toast from 'react-hot-toast'

function PostDetails() {
    const { id } = useParams()
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
    // setPost(response.data); 
    useEffect(() => {
        const fetchForumDetails = async () => {
            try {
                axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
                // const response = await axios.get('http://localhost:8080/forum/')
                // const token = await AsyncStorage.getItem('token')
                const response = await axios.get(url + `/forum/` + id, {
                    headers: customHeaders
                });
                console.log(response.data)
                // setPosts(response.data.payload)
                // console.log(posts)
                setPost(response.data);
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
        fetchForumDetails();
    }, [id]);
    
    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        try {
            // Make API call to submit the comment
            const response = await axios.post(url + `forum/${id}/comments`, { comment: newComment });
            setComments([...comments, response.data]); // Add the new comment to the state
            setNewComment(''); // Clear the input field
        } catch (error) {
            console.error('Error submitting comment:', error);
            // Handle error
        }
    };

    if (!post) {
        return (
            <Layout>
                <Link to="/deletepost" >
                    <button className='create-post'>Delete Post</button>
                </Link>
                {/* check user authentication */}
                {/* if the user is the one who posted it then edit post option should be available */}

                <button id="editButton" class="edit-button">Edit</button>

                <hr />
                Loading ...
                <h2> {id} </h2>
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
            </Layout>
        );
    }

    return (
        <>
            {role === 'ADMIN' ? (
                <AdminLayout>
                    <button className='create-post'>Create Post</button>
                    <hr />
                    <h2> {id} </h2>
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
                </AdminLayout>
            ) : role === 'DOCTOR' ? (
                <Layout>
                    <button className='create-post'>Create Post</button>
                    <hr />
                    <h2> {id} </h2>
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
                </Layout>
            ) : role === 'MODERATOR' ? (
                <ModeratorLayout>
                    <button className='create-post'>Create Post</button>
                    <hr />
                    <h2> {id} </h2>
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
                </ModeratorLayout>
            ) : (
                <SeniorDoctorLayout>
                    <button className='create-post'>Create Post</button>
                    <hr />
                    <h2> {id} </h2>
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
            )}
            {/* <div className="comments-section">
                <h3>Comments</h3>
                <ul className="comments-list">
                    {comments.map((comment, index) => (
                        <li key={index}>{comment.text}</li>
                    ))}
                </ul>
                
                <form onSubmit={handleCommentSubmit}>
                    <textarea
                        value={newComment}
                        onChange={(e) => setNewComment(e.target.value)}
                        placeholder="Write your comment..."
                        required
                    ></textarea>
                    <button type="submit">Add Comment</button>
                </form>
            </div> */}
        </>
    );
}

export default PostDetails;