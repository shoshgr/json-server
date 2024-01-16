import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

const Todos = () => {

    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("cur_user"));
    const apiUrl = 'http://localhost:3002/todos';

    const [todos, setTodosArr] = useState(null);
    const [todosDiv, setTodosDiv] = useState(null);
    const [searchArr, setSearch] = useState([]);
    const [showSearchForm, setShowSearchForm] = useState(0);

    const setTodosScreen = () => {
        setTodosDiv(todos && todos.map((t) => (
            <div key={t.id}>
                <h3>id: {t.id}</h3>
                <h3>title: {t.title}</h3>
                <h3>completed:</h3>
                <input type="checkbox" readOnly checked={t.completed}></input>
            </div>)))
    }

    function fetchArr() {
        fetch(`${apiUrl}?userId=${user.id}`)
            .then(response => response.json())
            .then(data => setTodosArr(data))
    }

    useEffect(() => {
        fetchArr();
    }, []);

    const search = (event) => {
        event.preventDefault();
        let id_search = event.target.querySelector('#search').value;
        todos.map(t => {
            (t.id == id_search) ? setSearch(searchArr.push(t)) : null;
        });
        if (searchArr.length) {
            setTodosDiv(searchArr.map((t) => (
                <div key={t.id}>
                    <h3>id: {t.id}</h3>
                    <h3>title: {t.title}</h3>
                    <h3>completed:</h3>
                    <input type="checkbox" readOnly checked={t.completed}></input>
                </div>)))
            navigate(`?id=${id_search}`);
        }
        else
            alert(`todo with id: ${id_search} does not exist`)
    }

    const handleSearchSelect = (value) => {
        switch (value) {
            case "id":
                setShowSearchForm(1);
                break;
            case "title":
                setTodosArr(todos.sort((a, b) => (a.title < b.title) ? 1 : -1));
                setTodosScreen();
                console.log(todos);
                break;
            case "completed (true/false)":
                setTodosArr(todos.sort((a, b) => (b.completed - a.completed)));
                setTodosScreen();
                break;
            default:
        }
    };

    const handleSortSelect = (value) => {
        switch (value) {
            case "id":
                setTodosArr(todos.sort((a, b) => a.id - b.id));
                setTodosScreen();
                break;
            case "a-z":
                setTodosArr(todos.sort((a, b) => (a.title > b.title) ? 1 : -1));
                setTodosScreen();
                console.log(todos);
                break;
            case "z-a":
                setTodosArr(todos.sort((a, b) => (a.title < b.title) ? 1 : -1));
                setTodosScreen();
                console.log(todos);
                break;
            case "completed":
                setTodosArr(todos.sort((a, b) => (b.completed - a.completed)));
                setTodosScreen();
                break;
            default:
        }
    };

    const sortOptions = ["none", "id", "a-z", "z-a", "completed"]
    const searchOptions = ["none", "id", "title", "completed (true/false)"]

    return (
        <>

            <h3>Todos:</h3>

            <div>
                {(!todosDiv && todos) ? todos.map((t) => (
                    <div key={t.id}>
                        <h3>id: {t.id}</h3>
                        <h3>title: {t.title}</h3>
                        <h3>completed:</h3>
                        <input type="checkbox" readOnly checked={t.completed}></input>
                    </div>)) : todosDiv}
            </div>

            {todos && (
                <select onChange={(e) => handleSortSelect(e.target.value)}>
                    {sortOptions.map(option => <option key={option} value={option}>{option}</option>)}
                </select>
            )}

            <form style={{ display: showSearchForm ? "inline" : "none" }} id="searchForm" onSubmit={search}>
                <input id="search" type="text" />
                <button type="submit" >search</button>
            </form>

            <select onChange={(e) => handleSearchSelect(e.target.value)}>
                {searchOptions.map(option => <option key={option} value={option}>{option}</option>)}
            </select>
        </>
    );
};

export default Todos;
