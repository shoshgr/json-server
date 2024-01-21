import React, { useState, useEffect } from 'react';
import Comment from './Comment';
import AddComment from './AddComment';
import { useParams } from 'react-router-dom';

const Comments = (props) => {

    const { postId } = useParams();
    const user = JSON.parse(localStorage.getItem("cur_user"));
    const [comments, setComments] = useState();
    const url = "http://localhost:3002";

    const fetchArr = () => {
        fetch(`${url}/comments?postId=${postId}`, {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data)
                setComments(data)
            });
    }

    useEffect(() => {
        fetchArr();
    }, []);

    return (
        <>
            <h2>post id {postId} :comments</h2>
            <AddComment postId={postId} comments={comments} setComments={setComments} /><br />
            <div>
                {comments && comments.map((c) => (
                    <Comment email={user.email} key={c.id} comments={comments} setComments={setComments} comment={c} />))}
            </div>
        </>
    );
}



export default Comments;