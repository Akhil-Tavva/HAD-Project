import React from 'react'
import Layout from './Layout'
import AdminLayout from './AdminLayout'
import ModeratorLayout from './ModeratorLayout'
import './PostCard.css'
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'

function ForumCard() {
    const navigate = useNavigate() 
    const dispatch = useDispatch()

    const handleGroupCardClick = () => {
        // Navigate to the Forum page
        navigate('/forum');
    };
    return (
        <div className="group-card" onClick={handleGroupCardClick}>
            <div className="group-avatar">
                {/* <!-- Group Avatar Image --> */}
            </div>
            <div className="group-info">
                <h1 className="group-name">Group Name</h1>
                <p className="group-description">Group Description Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                <p className="group-members">Members: 100</p>
            </div>
        </div>
    )
}

export default ForumCard