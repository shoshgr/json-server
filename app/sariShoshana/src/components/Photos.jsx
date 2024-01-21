import React, { useState, useEffect } from 'react';
import Photo from './Photo';
import AddPhoto from './AddPhoto';
import { useParams } from 'react-router-dom';
const Phothos = (props) => {
    const { albumId } = useParams();
    const [photos, setPhotos] = useState();
    const [click, setClick] = useState(0);
    const [currentPhoto, setcurrentPhoto] = useState();
    const url = "http://localhost:3002";

    const fetchArr = (offset, limit) => {
        fetch(`${url}/photos?albumId=${albumId}&_start=${offset}&_limit=${limit}`, {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                if (!photos)
                    setPhotos(data);
                else
{                  
    let arr =[]
    photos.map(p=>arr.push(p))  
    data.map(p => arr.push(p))
    setPhotos(arr);

}                console.log(photos)
            });
    };

    useEffect(() => {
        fetchArr(0, 10);
    }, []);



    const next = async () => {
        setClick(click + 1);
        console.log(photos)
        await setcurrentPhoto(photos[click]);
        console.log(currentPhoto);
        if (click % 10 == 8)
            fetchArr(click + 2, click + 12);
    }
    const prev = () => {
        setClick(click - 1);
        setcurrentPhoto(photos[click]);
    }


    return (
        <>
            <h2>album id {albumId} :photos</h2>
            <AddPhoto albumId={albumId} photos={photos} setPhotos={setPhotos} /><br />


            <div>
                <button onClick={() => prev()}>prev</button>
                {currentPhoto && <Photo key={currentPhoto.id} photos={photos} setPhotos={setPhotos} photo={currentPhoto} />}
                <button onClick={() => next()}>next</button>
            </div>
        </>
    );
}



export default Phothos;