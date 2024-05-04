import React, { useState, useEffect } from 'react'
import './PostCard.css'
import { Form, Button, Input } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux' 


const PostCard = ({ id, content, initialLikes}) => {
    const [likes, setLikes] = useState(initialLikes);
    // const [comments, setComments] = useState(initialComments);
    const navigate = useNavigate()
    // console.log(id)
    const [liked, setLiked] = useState(false);

    // const handleLike = () => {
    //     setLiked(!liked);
    // };

    const handleLike = () => {
        setLikes(likes + 1);
    };

    // const handleComment = () => {
    //     setComments(comments + 1);
    // };

    const handleClick = () => {
        // Navigate to the desired route when clicking anywhere on the page
        navigate(`/post/${id}`);
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
        // when clicking anywhere on this forum card it should navigate to PostDetails.js file
        <div className="forum-card">
            {/* <Link to={`/post/id`} >  */}
                <h2> {content} </h2>
                {/* <Link to={`/post/${id}`} className="read-more-link">Read More</Link> */}
                <Button type="link" className="read-more-link" onClick={() => navigate(`/post/${id}`)}> Read More </Button>
                <hr />
                <div className="actions">
                    <div className="icon-container">
                        <div className={`icon-left ${liked ? 'liked' : ''}`} onClick={handleLike}>
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
            {/* </Link> */}
        </div>
    );
};

export default PostCard;
