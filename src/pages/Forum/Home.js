import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
import AdminLayout from '../../components/AdminLayout'
import ModeratorLayout from '../../components/ModeratorLayout'
import SeniorDoctorLayout from '../../components/SrDoctorLayout'
import '../../components/PostCard.css'
import AsyncStorage from '@react-native-async-storage/async-storage'
import ForumCard from '../../components/ForumCard';
import toast from 'react-hot-toast'
import axios from 'axios';
import {url} from '../../const'

function Home() {
    const navigate = useNavigate();
    const [role, setRole] = useState('');
    const [groups, setGroups] = useState([])

    const getData = async () => {
        try {
            axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
            // const response = await axios.get('http://localhost:8080/forum/')
            const response = await axios.get(url+'/forum/');
            console.log(response.data)
            setGroups(response.data.payload)
            console.log(groups)
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

    useEffect(() => {
        getData()
    }, [])

    const Userdetails = AsyncStorage.getItem('Role');
    async function someFunction() {
        await Userdetails.then((res) => setRole(res)); 
    }
    someFunction()
    console.log('User Role: ', role)

    return (
        <>
            {role === 'ADMIN' ? (
                <AdminLayout>
                    {/* {groups.map(post => ( <ForumCard name={post.name} /> ))} */}

                    <ForumCard name={'Group Name1'}/>
                    <ForumCard name={'Group Name1'}/>
                    <ForumCard name={'Group Name1'}/>
                    <ForumCard name={'Group Name1'}/>
                </AdminLayout>
            ) : role === 'DOCTOR' ? (
                <Layout>
                    
                    <ForumCard name={'Group Name1'}/>
                    <ForumCard name={'Group Name2'}/>
                    <ForumCard name={'Group Name3'}/>
                    <ForumCard name={'Group Name4'}/>

                </Layout>
            ) : role === 'MODERATOR' ? (
                <ModeratorLayout>
                    <Link to='/createforum' >
                        <button className='create-post'> Create Forum</button>
                    </Link>
                    <Link to='/deleteforum' >
                        <button className='create-post'> Delete Forum</button>
                    </Link>
                    <Link to='/deleteforum' >
                        <button className='create-post'> See Flags</button>
                    </Link>
                    <hr />

                    {/* {groups.map(post => ( <ForumCard name={post.name} /> ))} */}
                    
                    <ForumCard name={'Group Name1'}/>
                    <ForumCard name={'Group Name2'}/>
                    <ForumCard name={'Group Name3'}/>
                    <ForumCard name={'Group Name4'}/>
                </ModeratorLayout>
            ) : (
                <SeniorDoctorLayout>
                    <h2>Forums</h2>
                    <hr />
                    <ForumCard name={'Group Name1'}/>
                    <ForumCard name={'Group Name2'}/>
                    <ForumCard name={'Group Name3'}/>
                    <ForumCard name={'Group Name4'}/>

                </SeniorDoctorLayout>
            )}
        </>
    );
}

export default Home;



