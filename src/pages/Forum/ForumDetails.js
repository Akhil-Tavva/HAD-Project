import React, { useState, useEffect } from 'react'
import axios from 'axios'
import Layout from '../../components/Layout'
import SeniorDoctorLayout from '../../components/SrDoctorLayout'
import AdminLayout from '../../components/AdminLayout'
import ModeratorLayout from '../../components/ModeratorLayout'
import PostCard from '../../components/PostCard'
import { Link } from 'react-router-dom'
import '../../components/PostCard.css'
// import { hideLoading, showLoading } from '../../redux/alertsSlice'
// import { useDispatch } from 'react-redux'
import toast from 'react-hot-toast'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { url, customHeaders } from '../../const'


function Forum({ ForumName }) {
    const [posts, setPosts] = useState([]);
    // const [selectedPost, setSelectedPost] = useState(null);
    const [role, setRole] = useState('');
    // const dispatch = useDispatch()

    // const handlePostSelect = (post) => {
    //     console.log('handle post')
    //     // setSelectedPost(post);
    // };

    const addPost = newPost => {
        setPosts([...posts, { ...newPost, id: posts.length + 1 }]);
    };



    useEffect(() => {
        const fetchForumDetails = async () => {
            try {

                axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
                // const response = await axios.get('http://localhost:8080/forum/')
                const response = await axios.get(url + `/forum/` + ForumName, {
                    headers: customHeaders
                });
                console.log(response.data)
                setPosts(response.data.payload)
                console.log(posts)
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
    }, [ForumName]);

    const Userdetails = AsyncStorage.getItem('Role');
    async function someFunction() {
        await Userdetails.then((res) => setRole(res));
    }
    someFunction()
    // console.log('User Role: ',role)

    // ADD post content
    const postData = [
        { id: 1, content: "Hey, how are you?", like: 0 },
        { id: 2, content: "Hi there!", like: 1 },
        { id: 3, content: "How's it going?", like: 1 },
        { id: 4, content: "Nice to meet you!", like: 1 },
        { id: 5, content: "What's up?", like: 1 },
        { id: 6, content: "Good day!", like: 1 },
        { id: 7, content: "Bye!", like: 1 },
        { id: 8, content: "Pleased to meet you.", like: 1 },
        { id: 9, content: "How are you doing?", like: 1 },
        { id: 10, content: "Nice weather we're having.", like: 1 }
    ];

    return (
        <>
            {role === 'ADMIN' ? (
                <AdminLayout>
                    <Link to="/newpost" addPost={addPost} >
                        <button className='create-post'>Create Post</button>
                    </Link>
                    <Link to="/yourposts" >
                        <button className='create-post'>Your Posts</button>
                    </Link>
                    <p>{ForumName}</p>
                    <hr />
                    <div className="post-list">
                        {postData.map(post => (
                            <PostCard
                                id={post.id}
                                name={post.name}
                                content={post.content}
                                initialLikes={post.like}
                            // onClick={() => handlePostSelect(post)}
                            />
                        ))}
                    </div>

                    {/* <div>
                            {selectedPost && <PostDetails post={selectedPost} />}
                        </div> */}

                </AdminLayout>
            ) : role === 'DOCTOR' ? (
                <Layout>

                    <Link to="/newpost" addPost={addPost} >
                        <button className='create-post'>Create Post</button>
                    </Link>
                    <Link to="/yourposts" >
                        <button className='create-post'>Your Posts</button>
                    </Link>
                    <hr />
                    <div className="post-list">
                        {postData.map(post => (
                            <PostCard
                                key={post.id}
                                name={post.name}
                                content={post.content}
                                initialLikes={post.like}
                            // onClick={() => handlePostSelect(post)}
                            />
                        ))}
                    </div>

                    {/* <div>
                            {selectedPost && <PostDetails post={selectedPost} />}
                        </div> */}


                </Layout>
            ) : role === 'MODERATOR' ? (
                <ModeratorLayout>
                    <Link to="/newpost" addPost={addPost} >
                        <button className='create-post'>Create Post</button>
                    </Link>
                    <Link to="/yourposts" >
                        <button className='create-post'>Your Posts</button>
                    </Link>

                    <Link to="/newpost" addPost={addPost} >
                        <button className='create-post'>delete forum </button>
                    </Link>

                    <hr />
                    <div className="post-list">
                        {postData.map(post => (
                            <PostCard
                                key={post.id}
                                name={post.name}
                                content={post.content}
                                initialLikes={post.like}
                            // onClick={() => handlePostSelect(post)}
                            />
                        ))}
                    </div>

                    {/* <div>
                            {selectedPost && <PostDetails post={selectedPost} />}
                        </div> */}

                </ModeratorLayout>
            ) : (
                <SeniorDoctorLayout>

                    <Link to="/newpost" addPost={addPost} >
                        <button className='create-post'>Create Post</button>
                    </Link>
                    <Link to="/yourposts" >
                        <button className='create-post'>Your Posts</button>
                    </Link>
                    <hr />
                    <div className="post-list">
                        {postData.map(post => (
                            <PostCard
                                key={post.id}
                                name={post.name}
                                content={post.content}
                                initialLikes={post.like}
                            // onClick={() => handlePostSelect(post)}
                            />
                        ))}
                    </div>

                    {/* <div>
                            {selectedPost && <PostDetails post={selectedPost} />}
                        </div> */}

                </SeniorDoctorLayout>
            )}
        </>
    );
}

export default Forum

// IF THE POST IS THE USER, THEN THE OPTIONS SHOULD BE
// 1. EDIT POST
// 2. DELETE POST
// 3. ADD COMMENT, LIKE
// ELSE IF THE POST IS NOT THE USER, THEN THE OPTIONS SHOULD BE
// 1. ADD COMMENT, LIKE
// 2. 
// IN YOUR POSTS, THE USER CAN SEE ALL THE POSTS THE USER HAS MADE. 
// THEY CAN DELETE ALL THE POSTS IF THEY WANT(IN YOUR POST).

