import React, {useEffect} from 'react'
import axios from 'axios'
import Layout from '../../components/Layout'
import { useState } from 'react';
import PostCard from '../../components/PostCard'
import { Link } from 'react-router-dom';
import '../../components/PostCard.css'; // Import the CSS file

function YourPost() {
    return (
        <Layout>
            <Link to="/deleteallposts" >
                <button className='create-post'>Delete All Posts</button>
            </Link>
            <hr />
            
            <div className="app">
                <PostCard title="Example Forum Post" initialLikes={10} initialComments={5} />
                <PostCard title=" Post 2" initialLikes={11} initialComments={6} />
                <PostCard title=" Post 3" initialLikes={9} initialComments={4} />
            </div>
        </Layout>
    )
}

export default YourPost