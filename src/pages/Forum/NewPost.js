import React, { useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import Layout from '../../components/Layout'
import ForumCard from '../../components/ForumCard'
import {Navigate} from "react-router-dom";
// import '../../Layout.css';
import Editor from './Editor'

const NewPost = ({ addPost }) => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState('');
    const [redirect, setRedirect] = useState(false);

    // async function createNewPost(ev) {
    //     const data = new FormData();
    //     data.set('title', title);
    //     data.set('summary', summary);
    //     data.set('content', content);
    //     data.set('file', files[0]);
    //     ev.preventDefault();
    //     const response = await fetch('http://localhost:4000/post', {
    //         method: 'POST',
    //         body: data,
    //         credentials: 'include',
    //     });
    //     if (response.ok) {
    //         setRedirect(true);
    //     }
    // }
    
    // if (redirect) {
    //     return <Navigate to={'/'} />
    // }
    
    const handleSubmit = e => {
        e.preventDefault();
        addPost({ title, content });
        setTitle('');
        setContent('');
    };

    return (
        <Layout>
            <h1 className='new-post'>Create New Post</h1>
            <form onSubmit={handleSubmit}>
                <input type="title" 
                        placeholder={"Title"} 
                        value={title} 
                        onChange={e => setTitle(e.target.value)}/>
                <input type='file'
                        onChange={e => setFiles(e.target.files)}/>
                
                <Editor value={content} onChange={setContent} />
                <button type="submit" className='submit' style={{marginTop:'5px'}}> Submit </button>
                {/*if click on button then it should direct to Home.js file*/}
            </form>
        </Layout>
    );
};

export default NewPost;
