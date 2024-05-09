import React from 'react';
import { useParams } from 'react-router-dom';
import PostDetails from '../../components/PostDetails'

function PostDetailsPage() {
    const { postId } = useParams() // Fetch the postId from URL params
    // Fetch the post details based on postId, you can use Redux, Axios, or any other method
    console.log(postId)
    return (
        <div> 
            {/* <h2>Post Details</h2> */}
            <PostDetails postId={postId} />
        </div>
    );
}

export default PostDetailsPage;
