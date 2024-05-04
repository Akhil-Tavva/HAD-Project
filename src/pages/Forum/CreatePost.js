import React, { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import Layout from '../../components/AdminLayout'
import {useNavigate} from "react-router-dom";
import Editor from './Editor'
import '../../components/PostCard.css'
import axios from 'axios'
import toast from 'react-hot-toast'



const CreatePost = ({ addPost }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [forumName, setforumName] = useState('');
    const [redirect, setRedirect] = useState(false);
    const navigate = useNavigate()

    async function createPost(ev) {
        ev.preventDefault();
        try {
            axios.defaults.headers.common['Authorization'] = `Bearer ${localStorage.getItem('token')}`;
            const response = await axios.post('http://localhost:8080/forum/create-post', {
                forumName: forumName,
                title: title,
                content: content
            },);
            if (response.status === 200) {
                setRedirect(true);
            }
        } catch (error) { 
            console.error('Error creating post:', error);
            toast.error('Failed to create post. Please try again later.');
        }
    }
    
    if (redirect) {
        toast.success('Succesfully created post');
        return navigate('/home')
    }
    
    // const handleSubmit = e => {
    //     e.preventDefault();
    //     // addPost({ title, content });
    //     setTitle('');
    //     setContent('');
    // };

    return (
        <Layout>
            <h1 className='new-post'>Create New Post</h1>
            <form onSubmit={createPost}>
                <input type="forumName" 
                        placeholder={"Forum Name"} 
                        value={forumName} 
                        onChange={e => setforumName(e.target.value)}/>

                <input type="title" 
                        placeholder={"Title"} 
                        value={title} 
                        onChange={e => setTitle(e.target.value)}/>

                <Editor value={content} onChange={setContent} />
                <button type="submit" className='submit' style={{marginTop:'5px'}}> Submit </button>
            </form>
        </Layout>
    );
};

export default CreatePost;
