import React, { useState } from "react";

const Comment = (props) => {

    const cur_comment = props.comment;
    const [form, setUpdateForm] = useState();
    const url = "http://localhost:3002";
    let user = JSON.parse(localStorage.getItem("cur_user"));

    const delete_comment = () => {
        fetch(`${url}/comments/${cur_comment.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Request failed with status: ${response.status}`);
                }
                const updatedArr = props.comments.filter(p => p.id != cur_comment.id);
                props.setComments(updatedArr);
            })
            .catch(error => {
                console.error(error);
            });
    }

    const update = (event) => {
        event.preventDefault()

        let comment = {
            postId: cur_comment.postId,
            id: cur_comment.id,
            name: event.target.querySelector('#name').value == "" ? cur_comment.name : event.target.querySelector('#name').value,
            email: user.email,
            body: event.target.querySelector('#body').value == "" ? cur_comment.body : event.target.querySelector('#body').value
        }

        fetch(`${url}/comments/${cur_comment.id}`, {
            method: "PUT",
            body: JSON.stringify(comment),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Request failed with status: ${response.status}`);
                }
                let updatedArr = [];
                props.comments.map(c => c.id != cur_comment.id ? updatedArr.push(c) : updatedArr.push(comment));
                props.setComments(updatedArr);
            })
            .then(setUpdateForm(null)).catch(error => {
                console.error(error);
            });

    }

    const update_comment = () => {
        (user.email == cur_comment.email) ?
            (form ? setUpdateForm(null) : setUpdateForm(<form onSubmit={() => update(event)}>
                <label htmlFor="name">name: </label>
                <input type="text" id="name" /><br />

                <label htmlFor="completed"> body:</label>
                <input type="text" id="body" /><br />
                <button style={{ height: "25px", padding: "0" }} type="submit" >update</button>
            </form>)) : alert("can not update not your comment");
    }

    return (
        <div >
            <div>
                <h3>id: {cur_comment.id}</h3>
                <h3 >name: {cur_comment.name}</h3>
                <h3 >body: {cur_comment.body}</h3>
                <br />
            </div>

            <button onClick={() => {
                user.email == cur_comment.email ? delete_comment() : alert("can not delete not your comment")
            }} >delete</button>

            <button onClick={() => { update_comment() }}>update</button>
            
            <div>{form}</div>
        </div>
    );
};

export default Comment
