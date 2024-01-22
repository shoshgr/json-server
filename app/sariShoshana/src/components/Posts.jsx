import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; 
import AddPost from './AddPost';
import Post from './Post';

const Posts = () => {
    
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("cur_user"));
    const url = 'http://localhost:3002/posts';
    const [posts, setPosts] = useState(null);
    const [postsDiv, setPostsDiv] = useState(null);
    const [searchArr, setSearch] = useState([]);
    const [showSearchForm, setShowSearchForm] = useState({ status: 0, type: "" });

    const setPostsScreen = () => {
        setPostsDiv(posts && posts.map((p) => (
            <Post posts={posts} setPosts={setPosts} post={p} />)))
    }

    function fetchArr() {
        fetch(`${url}?userId=${user.id}`)
            .then(response => response.json())
            .then(data => setPosts(data))
    }

    useEffect(() => {
        fetchArr();
    }, []);

    const search = (event) => {
        event.preventDefault();
        let input_value = event.target.querySelector('#search').value;

        switch (showSearchForm.type) {
            case "id":
                posts.map(p => {
                    (p.id == input_value) ? setSearch(searchArr.push(p)) : null;
                });
                break;
            case "title":
                posts.map(p => {
                    (p.title == input_value) ? setSearch(searchArr.push(p)) : null;
                });
                break;
            default:
                break;
        }

        if (searchArr.length) {
            setPostsDiv(searchArr.map((p) => (
                <Post posts={posts} setPosts={setPosts} post={p} />)))
            navigate(`?${showSearchForm.type}=${input_value}`);
        }
        else
            alert(`post with ${showSearchForm.type}: ${input_value} does not exist`);
        event.target.querySelector('#search').value = "";
        document.getElementById('search_selection').value = "none";
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
                setPostsScreen();
                navigate("");
        }
        setSearch([]);
    };

    const searchOptions = ["none", "id", "title"]

    return (
        <>

            <h3>posts:</h3>
            <h4>click on any post to see his body</h4>
            <div className='listOption'>

           
        

            <label htmlFor="search_selection"><strong>search by: </strong> </label>
            <select id='search_selection' onChange={(e) => handleSearchSelect(e.target.value)}>
                {searchOptions.map(option => <option key={option} value={option}>{option}</option>)}
            </select><br />

            <form style={{ display: showSearchForm.status ? "inline" : "none" }} id="searchForm" onSubmit={search}>
                <input id="search" type="text" />
                <button type="submit" >search</button>
            </form>
            <AddPost posts={posts} setPosts={setPosts} /><br /> 
            </div>

            <div className='itemList'>
                {(!postsDiv && posts) ? posts.map((p) => (
                    <Post key={p.id} posts={posts} setPosts={setPosts} post={p} />)) : postsDiv}
            </div>
        </>
    );
}

export default Posts;