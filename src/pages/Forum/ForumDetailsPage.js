import React from 'react';
import { useParams } from 'react-router-dom';
import ForumDetails from './ForumDetails'

function PostDetailsPage() {
    const { name } = useParams(); // Fetch the forum name from URL params
    // Fetch the post details based on postId, you can use Redux, Axios, or any other method
    console.log("Forum Details page: ", name)
    return (
        <div>
            {/* <h2>Post Details</h2> */}
            <ForumDetails ForumName={ name } />
        </div>
    );
}

export default PostDetailsPage;
