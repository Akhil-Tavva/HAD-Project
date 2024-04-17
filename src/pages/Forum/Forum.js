import React, {useEffect} from 'react'
// import axios from 'axios'
import Layout from '../../components/Layout'
import { useState } from 'react';
import ForumCard from '../../components/ForumCard';
import ForumPage from '../../components/ForumPage';
import { Link } from 'react-router-dom';
import '../../components/ForumCard.css'; // Import the CSS file


function Forum() {
    const [posts, setPosts] = useState([]);
    const [selectedPost, setSelectedPost] = useState(null);

    const handlePostSelect = (post) => {
        setSelectedPost(post);
    };
    const addPost = newPost => {
        setPosts([...posts, { ...newPost, id: posts.length + 1 }]);
    };

    // const getData = async()=> {
    //     try{
    //         const response = await axios.post('/api/user/get-user-info-by-id', {}, {
    //             headers:{
    //                 Authorization: 'Bearer' + localStorage.getItem('token'),
    //             }
    //         })
            
    //     } catch(error) {
            
    //     }
    // }

    const postData = [
        { id: 1, name: "John Doe", text: "Hey, how are you?",like: 0 },
        { id: 2, name: "Jane Smith", text: "Hi there!",like: 1 },
        { id: 3, name: "Michael Johnson", text: "How's it going?",like: 1 },
        { id: 4, name: "Emily Davis", text: "Nice to meet you!",like: 1 },
        { id: 5, name: "David Brown", text: "What's up?",like: 1 },
        { id: 6, name: "Sarah Wilson", text: "Good day!",like: 1 },
        { id: 7, name: "James Lee", text: "Bye!",like: 1 },
        { id: 8, name: "Olivia Martinez", text: "Pleased to meet you.",like: 1 },
        { id: 9, name: "Robert Anderson", text: "How are you doing?",like: 1 },
        { id: 10, name: "Emma Taylor", text: "Nice weather we're having.",like: 1 }
    ];

    // useEffect(() => {
    //     getData()
    // },[])

    return (
        <Layout>
            <div className='post-container'>
                <Link to="/newpost" addPost={addPost} >
                    <button className='create-post'>Create Post</button>
                </Link>
                <Link to="/yourposts" addPost={addPost} >
                    <button className='create-post'>Your Posts</button>
                </Link>
                <hr />

                <div className="post-list">
                    {postData.map(post => (
                            <ForumCard
                                key={post.id}
                                name={post.name}
                                text={post.text}
                                initialLikes={post.like}
                                // initialComments={post.initialComments}
                                onClick={() => handlePostSelect(post)}
                            />
                        ))}
                </div>
                {/* DOUBT */}
                <div className='chat-details'>
                    {selectedPost && <ForumPage post={selectedPost} />}
                </div>
            </div>
        </Layout>
    )
}

export default Forum

// import React from 'react';

// const ForumList = ({ posts }) => {
//     return (
//         <div>
//             <h1> Forum List</h1>
//             <ul>
//                 {posts.map(post => (
//                     <li key={post.id}>{post.title}</li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default ForumList;
