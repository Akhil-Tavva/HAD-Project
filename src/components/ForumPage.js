import React, { useState, useEffect } from 'react'
import Layout from './Layout'
// import ForumCard from '../../components/ForumCard'

// IF THE POST IS THE USER, THEN THE OPTIONS SHOULD BE
// 1. EDIT POST
// 2. DELETE POST
// 3. ADD COMMENT, LIKE
// ELSE IF THE POST IS NOT THE USER, THEN THE OPTIONS SHOULD BE
// 1. ADD COMMENT, LIKE
// 2. 
// IN YOUR POSTS, THE USER CAN SEE ALL THE POSTS THE USER HAS MADE. 
// THEY CAN DELETE ALL THE POSTS IF THEY WANT(IN YOUR POST).

function ForumPage({post}){
    return (
        <div>
            <h1> {post.name}</h1>
            <hr />
            <h2>{post.text}</h2>
            <p>{post.content}</p>
            <hr />
            <p>Author: {post.author}</p>
            <p>Posted on: {post.date}</p>
        </div>
    );
};

export default ForumPage;
