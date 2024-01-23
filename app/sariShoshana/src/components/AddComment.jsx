import React, { useState, useEffect } from "react";

const AddComment = (props) => {

    let tempArr = []
    const [showForm, setShowForm] = useState("none");
    const user = JSON.parse(localStorage.getItem("cur_user"));
    const url = 'http://localhost:3002';
    const [id, setId] = useState();

    function fetchID() {
        fetch(`${url}/config_id?id=nextCommentId`, {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(json)
                setId(json[0].nextCommentId + 1);
            });
    }

    useEffect(() => {
        fetchID();
    }, []);

    const add = (event) => {
        event.preventDefault();

        let comment = {
            postId: props.postId,
            id: `${id}`,
            name: event.target.querySelector('#name').value,
            email: user.email,
            body: event.target.querySelector('#body').value
        }

        fetch(`${url}/comments`, {
            method: "POST",
            body: JSON.stringify(comment),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            }
        });

        setId(id + 1);
        const next_id = {
            "nextCommentId": id
        }

        fetch(`${url}/config_id/nextCommentId`, {
            method: "PUT",
            body: JSON.stringify(next_id),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        }).catch(error => console.error(error))

        setShowForm("none");
        props.comments.map(c => tempArr.push(c));
        tempArr.push(comment);
        props.setComments(tempArr);
        event.target.querySelector('#name').value = "";
        event.target.querySelector('#body').value = "";
    }

    return (<>
        <button onClick={() => { showForm == "none" ? setShowForm("inline") : setShowForm("none") }}>add a comment</button>
        <form onSubmit={() => add(event)} style={{ display: showForm }}>
            <label htmlFor="name">name: </label>
            <input type="text" id="name" /><br />
            <label htmlFor="body"> body:</label>
            <input type="text" id="body" /><br />
            <button style={{ height: "25px", padding: "0" }} type="submit" >add</button>
        </form>
    </>);
}

export default AddComment;