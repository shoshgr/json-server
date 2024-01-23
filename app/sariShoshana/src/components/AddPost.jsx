import React, { useState, useEffect } from "react";

const AddPost = (props) => {

    let tempArr = []
    const [showForm, setShowForm] = useState("none");
    const user = JSON.parse(localStorage.getItem("cur_user"));
    const url = 'http://localhost:3002';
    const [id, setId] = useState();

    function fetchID() {
        fetch(`${url}/config_id?id=nextPostId`, {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(json)
                setId(json[0].nextPostId + 1);
            });
    }

    useEffect(() => {
        fetchID();
    }, []);

    const add = (event) => {
        event.preventDefault();

        let post = {
            userId: user.id,
            id: `${id}`,
            title: event.target.querySelector('#title').value,
            body: event.target.querySelector('#body').value
        }

        fetch(`${url}/posts`, {
            method: "POST",
            body: JSON.stringify(post),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            }
        })
            .then(console.log("post"))
            .catch(error => console.error(error))
            .then(() => updateID());

        const updateID = () => {
            setId(id + 1);
            const next_id = {
                "nextPostId": id
            }

            fetch(`${url}/config_id/nextPostId`, {
                method: "PUT",
                body: JSON.stringify(next_id),
                headers: {
                    "Content-type": "application/json; charset=UTF-8",
                },
            }).catch(error => console.error(error))
        }

        setShowForm("none");
        props.posts.map(p => tempArr.push(p));
        tempArr.push(post);
        props.setPosts(tempArr);
        event.target.querySelector('#title').value = "";
        event.target.querySelector('#body').value = "";
    }

    return (<>
        <button onClick={() => { showForm == "none" ? setShowForm("inline") : setShowForm("none") }}>add a post</button>
        <form onSubmit={() => add(event)} style={{ display: showForm }}>
            <label htmlFor="title">title:</label>
            <input type="text" id="title" />
            <label htmlFor="body">body:</label>
            <input type="text" id="body" />
            <button type="submit" >add</button>
        </form>
    </>);
}

export default AddPost;