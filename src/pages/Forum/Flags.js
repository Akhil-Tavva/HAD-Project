import React, { useEffect } from 'react'
import ModeratorLayout from '../../components/ModeratorLayout'
import { useState } from 'react';
import PostCard from '../../components/PostCard'
import { Link } from 'react-router-dom';
import '../../components/PostCard.css'; // Import the CSS file
import AsyncStorage from '@react-native-async-storage/async-storage'

function Flags() {
    const [role, setRole] = useState('');
    const Userdetails = AsyncStorage.getItem('Role');
    async function someFunction() {
        await Userdetails.then((res) => setRole(res)); // Assuming promiseObject is your Promise
    }
    someFunction()
    console.log('User Role: ', role)

    return (
        <ModeratorLayout>
            <Link to="/deleteallposts" >
                <button className='create-post'>Delete All Posts</button>
            </Link>
            <hr />

            <div className="app">
                <PostCard content={'Hey, how are you?'}/>
                <PostCard content={'Nice to meet you!'}/>
            </div>
        </ModeratorLayout>
    );
}

export default Flags

