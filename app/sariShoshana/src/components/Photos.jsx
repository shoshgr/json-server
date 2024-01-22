import React, { useState, useEffect } from 'react';
import Photo from './Photo';
import AddPhoto from './AddPhoto';
import { useParams } from 'react-router-dom';

const Photos = (props) => {

    const { albumId } = useParams();
    const [photos, setPhotos] = useState();
    const [click, setClick] = useState(0);
    const [currentPhoto, setcurrentPhoto] = useState();
    const [nextBtn, setNextBtn] = useState("inline");
    const [prevBtn, setPrevBtn] = useState("none");
    const url = "http://localhost:3002";

    const fetchArr = (offset, limit) => {
        fetch(`${url}/photos?albumId=${albumId}&_start=${offset}&_limit=${limit}`, {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data);
                if (!photos) {
                    setPhotos(data);
                    setcurrentPhoto(data[click]);
                    setClick(click + 1);
                    if (data.length == 0 || data.length == 1) {
                        setNextBtn("none");
                    }
                }
                else {
                    let arr = []
                    photos.map(p => arr.push(p))
                    data.map(p => arr.push(p))

                    setPhotos(arr);
                } console.log(photos);
            });
    };

    useEffect(() => {
        fetchArr(0, 10);
    }, []);

    const next = async () => {
        if (photos[photos.length - 2].id == currentPhoto.id) {
            setNextBtn("none");
            setcurrentPhoto(photos[photos.length - 1]);
        }
        else {
            setClick(click + 1);
            console.log(photos)
            await setcurrentPhoto(photos[click]);
            console.log(currentPhoto);
            if (currentPhoto.id == photos[photos.length - 3].id)
                fetchArr(click + 2, click + 12);
        }
        setPrevBtn("inline");
    }

    const prev = () => {
        if (photos[1].id == currentPhoto.id) {
            setPrevBtn("none");
            setcurrentPhoto(photos[0]);
            setClick(0);
        }
        else {
            setcurrentPhoto(photos[click - 1]);
            setClick(click - 1);
        }
        setNextBtn("inline");
    }


    return (
        <>
            <h3>album id {albumId} :photos</h3>
            <AddPhoto albumId={albumId} photos={photos} setPhotos={setPhotos} /><br />
            <div>
                <button style={{ display: prevBtn }} onClick={() => prev()}>prev</button>
                {currentPhoto && <Photo setClick={setClick} setcurrentPhoto={setcurrentPhoto} click={click} key={currentPhoto.id} photos={photos} setPhotos={setPhotos} photo={currentPhoto} />}
                <button style={{ display: nextBtn }} onClick={() => next()}>next</button>
            </div>
        </>
    );
}

export default Photos;