import React, { useEffect } from 'react'
import axios from 'axios'
import Layout from '../../components/Layout'
import AdminLayout from '../../components/AdminLayout';
import ModeratorLayout from '../../components/ModeratorLayout'
import SeniorDoctorLayout from '../../components/Layout'
import { useState } from 'react';
import PostCard from '../../components/PostCard'
import { Link } from 'react-router-dom';
import '../../components/PostCard.css'; // Import the CSS file
import AsyncStorage from '@react-native-async-storage/async-storage'

function YourPost() {
    const [role, setRole] = useState('');
    const Userdetails = AsyncStorage.getItem('Role');
    async function someFunction() {
        await Userdetails.then((res) => setRole(res)); // Assuming promiseObject is your Promise
    }
    someFunction()
    console.log('User Role: ', role)
    
    return (
        <>
            {role === 'ADMIN' ? (
                <AdminLayout>
                    <div className="app">
                        <PostCard title="Example Forum Post" initialLikes={10} initialComments={5} />
                        <PostCard title=" Post 2" initialLikes={11} initialComments={6} />
                        <PostCard title=" Post 3" initialLikes={9} initialComments={4} />
                    </div>
                </AdminLayout>
            ) : role === 'SENIOR_DOCTOR' ? (
                <SeniorDoctorLayout>
                    <Link to="/deleteallposts" >
                        <button className='create-post'>Delete All Posts</button>
                    </Link>
                    <hr />

                    <div className="app">
                        <PostCard title="Example Forum Post" initialLikes={10} initialComments={5} />
                        <PostCard title=" Post 2" initialLikes={11} initialComments={6} />
                        <PostCard title=" Post 3" initialLikes={9} initialComments={4} />
                    </div>
                </SeniorDoctorLayout>
            ) : role === 'MODERATOR' ? (
                <ModeratorLayout>
                    <Link to="/deleteallposts" >
                        <button className='create-post'>Delete All Posts</button>
                    </Link>
                    <hr />

                    <div className="app">
                        <PostCard title="Example Forum Post" initialLikes={10} initialComments={5} />
                        <PostCard title=" Post 2" initialLikes={11} initialComments={6} />
                        <PostCard title=" Post 3" initialLikes={9} initialComments={4} />
                    </div>
                </ModeratorLayout>
            ) : (
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
            )}
        </>
    );
}

export default YourPost

