import React, { useState, useEffect} from 'react';
import './ForumCard.css'; // Import the CSS file
import {Form, Button, Input} from 'antd'
import { Link, useNavigate} from 'react-router-dom'
import { useDispatch} from 'react-redux'


const ForumCard = ({ id, name, content, initialLikes, onClick}) => {
    const [likes, setLikes] = useState(initialLikes);
    // const [comments, setComments] = useState(initialComments);
    const navigate = useNavigate()
    // console.log(id)
    const handleLike = () => {
        setLikes(likes + 1);
    };

    // const handleComment = () => {
    //     setComments(comments + 1);
    // };

    const handleClick = () => {
        // Navigate to the desired route when clicking anywhere on the page
        navigate('/post/id');
    };

    useEffect(() => {
        // const handleClick = () => {
        //   // Navigate to the desired route when clicking anywhere on the page
        //     navigate('/forum-page');
        // };
    
        // document.addEventListener('click', handleClick);
    
        // return () => {
        //     document.removeEventListener('click', handleClick);
        // };
    }, []);

    return (
        // when clicking anywhere on this forum card it should navigate to ForumPage.js file
        <div className="forum-card" onClick={onClick}>
            <Link to={`/post/id`} > <h2> {content} </h2> </Link> 
            {/* <h2> {content} </h2> */}
            <hr />
            <div className="actions">
                <i class="ri-heart-line" onClick={handleLike}> 
                    <span>{likes} Likes</span> 
                </i>
                <i class="ri-chat-4-line"> 
                    <span className='comment'> Comments</span> 
                </i>
                <i class="ri-flag-2-line">
                    <span> Report </span>
                </i>
            </div>
        </div>
    );
};

export default ForumCard;
