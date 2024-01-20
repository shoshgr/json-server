import React, { useState} from "react";

import { useNavigate } from 'react-router-dom'; 


const Album = (props) => {

 
const[bodyDisplay,setDisplay]=useState("none");
    const cur_album =props.album;
    const [form, setUpdateForm] = useState();
  
    const url = "http://localhost:3002";


const navigate=useNavigate();
    const delete_album = () => {
        // event.preventDefault();
        fetch(`${url}/albums/${cur_album.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(response => {
            if (!response.ok) {
                throw new Error(`Request failed with status: ${response.status}`);
            }
            const updatedArr = props.albums.filter(a => a.id != cur_album.id);
            props.setAlbums(updatedArr);
        }).catch(error => {
            console.error(error);
        });
    }

    const update = (event) => {
        event.preventDefault()
        let album = {
            userId: cur_post.userId,
            id: cur_post.id,
            title: event.target.querySelector('#title').value == "" ? cur_post.title : event.target.querySelector('#title').value
        }
        fetch(`${url}/albums/${cur_album.id}`, {
            method: "PUT",
            body: JSON.stringify(post),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            }
        }).then(response => {
            if (!response.ok) {
                throw new Error(`Request failed with status: ${response.status}`);
            }
            let updatedArr = [];
            props.albums.map(a => a.id != cur_album.id ? updatedArr.push(a) : updatedArr.push(album));
            props.setAlbums(updatedArr);
        }).then(setUpdateForm(null)).catch(error => {
            console.error(error);
        });
    }
const showPhotos=()=>{
    navigate(`${cur_album.id}/photos`);
}
    return (
    <div style={{backgroundColor:bodyDisplay=="none"?"white":"lightpink",padding:"15px"}}>
        <div onClick={()=>{setDisplay(bodyDisplay=="none"?"inline":"none")}} key={cur_album.id} >
            <h3>id: {cur_album.id}</h3>
            <h3 >title: {cur_album.title}</h3>
        </div >
        <button  onClick={() => delete_album()}>delete</button>
 <button onClick={()=>showPhotos()}>show photos</button>
            <button  onClick={() => {
                form ? setUpdateForm(null) : setUpdateForm(<form onSubmit={() => update(event)}>
                    <label htmlFor="title">title: </label>
                    <input  type="text" id="title" /><br />
                    <button style={{height:"25px",padding:"0"}} type="submit" >update</button>
                </form>)
            }}>update</button>
            <div>{form}</div>
           
            </div>
    )
}

export default Album;