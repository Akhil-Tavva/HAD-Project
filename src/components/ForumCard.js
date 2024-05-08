import React from 'react'
import './PostCard.css'
import { Link, useNavigate } from 'react-router-dom'

const ForumCard = ({ name }) => {
    const navigate = useNavigate()
    const handleGroupCardClick = () => {
        onForumClick(name);
    };
    const onForumClick = (name) => {
        navigate(`/forum/${name}`)
    };

    return (
        <div className="group-card" onClick={handleGroupCardClick}>
            <div className="group-avatar">
                {/* <!-- Group Avatar Image --> */}
            </div>
            <div className="group-info">
                <h1 className="group-name">{name}</h1>
                {/* <p className="group-description">Group Description: Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <p className="group-members">Max Members: 100</p> */}
            </div>
        </div>
    )
}

export default ForumCard