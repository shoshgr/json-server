import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';

const Album = (props) => {


    const cur_album = props.album;
    const [form, setUpdateForm] = useState();
    const url = "http://localhost:3002";
    const navigate = useNavigate();

    const delete_album = () => {
        fetch(`${url}/albums/${cur_album.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Request failed with status: ${response.status}`);
                }
                const updatedArr = props.albums.filter(a => a.id != cur_album.id);
                props.setAlbums(updatedArr);
            })
            .catch(error => {
                console.error(error);
            });
    }

    const update = (event) => {
        event.preventDefault()

        let album = {
            userId: cur_album.userId,
            id: cur_album.id,
            title: event.target.querySelector('#title').value == "" ? cur_album.title : event.target.querySelector('#title').value
        }

        fetch(`${url}/albums/${cur_album.id}`, {
            method: "PUT",
            body: JSON.stringify(album),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Request failed with status: ${response.status}`);
                }
                let updatedArr = [];
                props.albums.map(a => a.id != cur_album.id ? updatedArr.push(a) : updatedArr.push(album));
                props.setAlbums(updatedArr);
            })
            .then(setUpdateForm(null)).catch(error => {
                console.error(error);
            });
    }

    // const showPhotos = () => {
    //     navigate(`${cur_album.id}/photos`);
    // }

    return (
        <div className="item">


            <h3>id: <small>{cur_album.id}</small> </h3>
            <h3 >title: <small> {cur_album.title}</small> </h3>

            <div className="btnDiv">
                <button onClick={() => delete_album()}>delete</button>
                {/* <button onClick={() => showPhotos()}>show photos</button> */}
                <button onClick={() => {
                    form ? setUpdateForm(null) : setUpdateForm(<form onSubmit={() => update(event)}>
                        <label htmlFor="title">title: </label>
                        <input type="text" id="title" /><br />
                        <button style={{ height: "25px", padding: "0" }} type="submit" >update</button>
                    </form>)
                }}>update</button>
                <div>{form}</div>
            </div>


            <a href={`albums/${cur_album.id}/photos`}>see photos</a>
        </div>
    )
}

export default Album;