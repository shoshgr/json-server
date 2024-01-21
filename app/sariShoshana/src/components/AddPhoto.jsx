import React, { useState, useEffect } from "react";

const AddPhoto = (props) => {


    let arr = []
    const [showForm, setShowForm] = useState("none");
    const user = JSON.parse(localStorage.getItem("cur_user"));
    const apiUrl = 'http://localhost:3002';
    const [id, setId] = useState();
    function fetchID() {
        fetch(`${apiUrl}/config_id?id=nextPhotoId`, {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(json)
                setId(json[0].nextPhotoId);

            });
    }

    useEffect(() => {
        fetchID();
    }, []);
    const add = (event) => {
        event.preventDefault();
        let photo = {
            albumId: props.albumId,
            id: `${id}`,
            title: event.target.querySelector('#title').value,
            url: event.target.querySelector('#url').value,
            thumbnailUrl: event.target.querySelector('#thumbnailUrl').value
        }
        fetch(`${apiUrl}/photos`, {
            method: "POST",
            body: JSON.stringify(photo),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            }
        });
        setId(id + 1);
        const next_id = {
            "nextPhotoId": id
        }
        fetch(`${apiUrl}/config_id/nextPhotoId`, {
            method: "PUT",
            body: JSON.stringify(next_id),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        }).catch(error => console.error(error))
        setShowForm("none");
        props.photos.map(p => arr.push(p));
        arr.push(photos);
        props.setPhotos(arr);
        event.target.querySelector('#title').value = "";
        event.target.querySelector('#url').value = "";
        event.target.querySelector('#thumbnailUrl').value="";
    }

    return (<>
        <button onClick={() => { showForm == "none" ? setShowForm("inline") : setShowForm("none") }}>add a photo</button>
        <form onSubmit={() => add(event)} style={{ display: showForm }}>
            <label htmlFor="title"> title:</label>
            <input type="text" id="title" /><br />
            <label htmlFor="url"> url:</label>
            <input type="text" id="url" /><br />
            <label htmlFor="thumbnailUrl"> thumbnailUrl:</label>
            <input type="text" id="thumbnailUrl" /><br />
            <button style={{ height: "25px", padding: "0" }} type="submit" >add photo</button>
        </form>
    </>
    );
}

export default AddPhoto;