import React,{useState,useEffect} from 'react';
import Photo from './Photo';
import AddPhoto from './AddPhoto';
import { useParams } from 'react-router-dom';
const Phothos = (props) => {
  const { albumId } = useParams();
  const[photos,setPhotos]=useState();
  const url = "http://localhost:3002";
  const fetchArr=()=>{
    fetch(`${url}/photos?albumId=${albumId}`, {
        method: 'GET'
      })
        .then((response) => response.json())
        .then((data) => {
          console.log(data)
          setPhotos(data)
        });
    }
        useEffect(() => {
            fetchArr();
        }, []);



    return (
        <>
   <h2>album id {albumId} :photos</h2>
             <AddPhoto albumId={albumId}  photos={photos} setPhotos={setPhotos} /><br /> 
         

            <div>
                {photos&& photos.map((p) => (
                    <Photo  key={p.id} photos={photos} setPhotos={setPhotos} photo={p} />))}
            </div>
        </>
    );
}



export default Phothos;