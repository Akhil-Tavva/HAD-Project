import React, { useState, useEffect } from 'react'
import './PostCard.css'
import { Button,Flex } from 'antd'
import { Link, useNavigate } from 'react-router-dom'

const PostCard = ({ id, content, initialLikes }) => {
    const [likes, setLikes] = useState(initialLikes);
    const navigate = useNavigate();
    const [liked, setLiked] = useState(false);

    const handleLike = () => {
        // Toggle liked state and update likes count accordingly
        console.log('liked')
        setLiked(!liked);
        setLikes(liked ? likes - 1 : likes + 1);
    };

    const handleClick = () => {
        // Navigate to the PostDetails page when clicking anywhere on the card
        navigate(`/post/${id}`);
    };

    return (
        <div className="forum-card" onClick={handleClick}>
            <h2>{content}</h2>
            <Button type="link" className="read-more-link" onClick={() => navigate(`/post/${id}`)}> Read More </Button>
            <hr />
            <div className="actions">
                <Flex justify='space-between' align='flex-end'>
                    <div className={`icon-left ${liked ? 'liked' : ''}`} onClick={handleLike}>
                        <i className={`ri-heart-line${liked ? ' liked' : ''}`}></i>
                        <span className='like'>{liked ? 'Liked' : 'Like'}</span>
                    </div>
                    <div className="icon-center">
                        <i className="ri-chat-4-line"></i>
                        <span className='comment'> Comments </span>
                    </div>
                    <div className="icon-right">
                        <i className="ri-flag-2-line"></i>
                        <span>   Report   </span>
                    </div>
                    {/* <Button
                        type="link"
                        className={`icon-left ${liked ? 'liked' : ''}`}
                        onClick={handleLike}
                        icon={<i className={`ri-heart-line${liked ? ' liked' : ''}`} />}>
                        {liked ? 'Liked' : 'Like'}
                    </Button> 
                    <Button type="link" className="icon-center" icon={<i className="ri-chat-4-line"></i>}>
                        <span className='comment'> Comments </span>
                    </Button>
                    <Button type="link" className="icon-right" icon={<i className="ri-flag-2-line"></i>}>
                        
                        <span>Report</span>
                    </Button> */}
                </Flex>
            </div>
        </div>
    );
};

export default PostCard;
