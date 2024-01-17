
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import AddPost from './AddPost';
import Comment from './Comment';
import AddComment from './AddComment';

const Comments = (props) => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("cur_user"));
    const [posts, setPosts] = useState(null);
    

    const setPostsScreen = () => {
        setPostsDiv(posts && posts.map((c) => (
            <Comment key={c.id} comments={props.comments} setComments={props.setComments} comment={c} />)))
    }

    

    




    return (
        <>
             <AddComment postId={props.id}  comments={props.comments} setComments={props.setComments} /><br /> 
         

            <div>
                { posts.map((c) => (
                    <Comment email={user.email} key={c.id} comments={props.comments} setComments={props.setComments} comment={c} />)) : commentsDiv}
            </div>
        </>
    );
}



export default Comments;