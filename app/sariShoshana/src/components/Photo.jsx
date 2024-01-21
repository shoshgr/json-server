import React, { useState } from "react";

const Photo = (props) => {

    const cur_photo = props.photo;
    const [form, setUpdateForm] = useState();
    const url = "http://localhost:3002";

    const delete_photo = () => {
        fetch(`${url}/photos/${cur_photo.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => {
                if (!response.ok)
                    throw new Error(`Request failed with status: ${response.status}`);
                const updatedArr = props.photos.filter(p => p.id != cur_photo.id);
                props.setcurrentPhoto(props.photos[props.click - 1]);
                props.setClick(props.click - 1);
                props.setPhotos(updatedArr);
            })
            .catch(error => {
                console.error(error);
            });
    }

    const update = (event) => {
        event.preventDefault()

        let photo = {
            albumId: cur_photo.albumId,
            id: cur_photo.id,
            title: event.target.querySelector('#title').value == "" ? cur_photo.title : event.target.querySelector('#title').value,
            url: event.target.querySelector('#url').value == "" ? cur_photo.url : event.target.querySelector('#url').value,
            thumbnailUrl: event.target.querySelector('#thumbnailUrl').value == "" ? cur_photo.thumbnailUrl : event.target.querySelector('#thumbnailUrl').value
        }

        fetch(`${url}/photos/${cur_photo.id}`, {
            method: "PUT",
            body: JSON.stringify(photo),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            }
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Request failed with status: ${response.status}`);
                }
                let updatedArr = [];
                props.photos.map(p => p.id != cur_photo.id ? updatedArr.push(p) : updatedArr.push(photo));
                props.setPhotos(updatedArr);
                props.setcurrentPhoto(photo);

            })
            .then(setUpdateForm(null)).catch(error => {
                console.error(error);
            });

    }

    const update_photo = () => {
        (form ? setUpdateForm(null) : setUpdateForm(<form onSubmit={() => update(event)}>
            <label htmlFor="title"> title:</label>
            <input type="text" id="title" /><br />
            <label htmlFor="url"> url:</label>
            <input type="text" id="url" /><br />
            <label htmlFor="thumbnailUrl"> thumbnailUrl:</label>
            <input type="text" id="thumbnailUrl" /><br />
            <button style={{ height: "25px", padding: "0" }} type="submit" >submit</button>
        </form>))
    }

    return (
        <div >
            <div>
                <img src={`${cur_photo.thumbnailUrl}`} />
                <h3>id: {cur_photo.id}</h3>
                <br />
            </div>

            <button onClick={() => delete_photo()}>delete</button>
            <button onClick={() => { update_photo() }}>update</button>

            <div>{form}</div>
        </div>
    );
};
export default Photo