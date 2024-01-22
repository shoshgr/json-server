import React, { useState, useEffect } from "react";

const AddAlbum = (props) => {

    let tempArr = []
    const [showForm, setShowForm] = useState("none");
    const user = JSON.parse(localStorage.getItem("cur_user"));
    const url = 'http://localhost:3002';
    const [id, setId] = useState();

    function fetchID() {
        fetch(`${url}/config_id?id=nextAlbumId`, {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(json)
                setId(json[0].nextAlbumId + 1);
            });
    }

    useEffect(() => {
        fetchID();
    }, []);

    const add = (event) => {
        event.preventDefault();

        let album = {
            userId: user.id,
            id: `${id}`,
            title: event.target.querySelector('#title').value,
        }

        fetch('http://localhost:3002/albums', {
            method: "POST",
            body: JSON.stringify(album),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            }
        });

        setId(id + 1);
        const next_id = {
            "nextAlbumId": id
        }

        fetch(`${url}/config_id/nextAlbumId`, {
            method: "PUT",
            body: JSON.stringify(next_id),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        }).catch(error => console.error(error));

        setShowForm("none");
        props.albums.map(a => tempArr.push(a));
        tempArr.push(album);
        props.setAlbumsArr(tempArr);
        event.target.querySelector('#title').value = "";
    }

    return (<>
        <button onClick={() => { showForm == "none" ? setShowForm("inline") : setShowForm("none") }}>add a album</button>
        <form onSubmit={() => add(event)} style={{ display: showForm }}>
            <label htmlFor="title">title:</label>
            <input type="text" id="title" />
            <button type="submit" >add</button>
        </form>
    </>);
}

export default AddAlbum;