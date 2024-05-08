import React, { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import ModeratorLayout from '../../components/ModeratorLayout'
import {useNavigate} from "react-router-dom";
import Editor from './Editor'
import '../../components/PostCard.css' 
import axios from 'axios'
import toast from 'react-hot-toast' 
import {url, customHeaders} from '../../const' 
import AsyncStorage from '@react-native-async-storage/async-storage';

const CreateForum = ({ addPost }) => {
    // const [title, setTitle] = useState('');
    // const [content, setContent] = useState('');
    const [forumName, setforumName] = useState('');
    const [redirect, setRedirect] = useState(false);
    const navigate = useNavigate()

    async function createPost(ev) {
        ev.preventDefault();
        try {
            // axios.defaults.headers.common['Authorization'] = `Bearer ${AsyncStorage.getItem('token')}`;
            const token = await AsyncStorage.getItem('token')
            const response = await axios.post(url + '/mod/forum/create', {"name":forumName}, {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    customHeaders,
                }
            });
            if (response.status === 200) {
                setRedirect(true);
            }
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
    
    if (redirect) {
        toast.success('Succesfully created Category');
        return navigate('/home')
    }
    
    // const handleSubmit = e => {
    //     e.preventDefault();
    //     // addPost({ title, content });
    //     setTitle('');
    //     setContent('');
    // };

    return (
        <ModeratorLayout>
            <h1 className='new-post'>Create New Group</h1>
            <form onSubmit={createPost}>
                <input type="groupname" 
                        placeholder={"Group Name"} 
                        value={forumName} 
                        onChange={e => setforumName(e.target.value)}/>

                <button type="submit" className='submit' style={{marginTop:'5px'}}> Submit </button>
            </form>
        </ModeratorLayout>
    );
};

export default CreateForum;
