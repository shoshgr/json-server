import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import AddAlbum from './AddAlbum';
import Album from './Album';

const Albums = () => {

    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("cur_user"));
    const url = 'http://localhost:3002/albums';
    const [albums, setAlbums] = useState([]);
    const [albumsDiv, setAlbumsDiv] = useState(null);
    const [searchArr, setSearch] = useState([]);
    const [showSearchForm, setShowSearchForm] = useState({ status: 0, type: "" });

    const setAlbumsScreen = () => {
        setAlbumsDiv(albums && albums.map((a) => (
            <Album albums={albums} setAlbums={setAlbums} album={a} />)))
    }

    function fetchArr() {
        fetch(`${url}?userId=${user.id}`)
            .then(response => response.json())
            .then(data => setAlbums(data))
    }

    useEffect(() => {
        fetchArr();
    }, []);

    const search = (event) => {
        event.preventDefault();
        let input_value = event.target.querySelector('#search').value;

        switch (showSearchForm.type) {
            case "id":

                albums.map(a => {

                    if(input_value==a.id ){
                     setSearch(searchArr.push(a));
                    } 
                });
                break;
            case "title":
                albums.map(a => {
                    (a.title == input_value) ? setSearch(searchArr.push(a)) : null;
                });
                break;
            default:
                break;
        }

        if (searchArr.length) {
            setAlbumsDiv(searchArr.map((a) => (
                <Album albums={albums} setAlbums={setAlbums} album={a} />)))
            navigate(`?${showSearchForm.type}=${input_value}`);
        }
        else
            alert(`album with ${showSearchForm.type}: ${input_value} does not exist`);
        event.target.querySelector('#search').value = ''
        setShowSearchForm({ status: 0, type: "" });
    }

    const handleSearchSelect = (value) => {
        switch (value) {
            case "id":
                setShowSearchForm({ status: 1, type: "id" });
                break;
            case "title":
                setShowSearchForm({ status: 1, type: "title" });
                break;
            default:
                setShowSearchForm({ status: 0, type: "none" });
                setAlbumsScreen();
                navigate("");
        }
        setSearch([]);
    };

    const searchOptions = ["none", "id", "title"]

    return (
        <>

            <h2>albums:</h2>
            <h2>click on any album to see it's photos</h2>

             <AddAlbum albums={albums} setAlbumsArr={setAlbums} /><br /> 
        
            <label htmlFor="search_selection">search by: </label>
            <select id='search_selection' onChange={(e) => handleSearchSelect(e.target.value)}>
                {searchOptions.map(option => <option key={option} value={option}>{option}</option>)}
            </select><br />

            <form style={{ display: showSearchForm.status ? "inline" : "none" }} id="searchForm" onSubmit={search}>
                <input id="search" type="text" />
                <button type="submit" >search</button>
            </form>

            <div>
                {(!albumsDiv && albums) ? albums.map((a) => (
                    <Album key={a.id} albums={albums} setAlbums={setAlbums} album={a} />)) : albumsDiv}
            </div>
        </>
    );
}




export default Albums;