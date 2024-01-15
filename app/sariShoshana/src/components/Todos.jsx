import React, { useState, useEffect } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
const Todos = () => {
    const navigate=useNavigate();
    const user = JSON.parse(localStorage.getItem("cur_user"));
    const apiUrl = 'http://localhost:3002/todos';
    const [todos, setTodosArr] = useState(null);
    const [div, setDive] = useState();
const [searchDiv,setSearch]=useState();
    const todoDive = () => {
        setDive(todos && todos.map((t) => (
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

    const handleSortSelect = (value) => {


        switch (value) {
            case "id":
                setTodosArr(todos.sort((a, b) => a.id - b.id));
                todoDive();
                break;
            case "title":
                setTodosArr(todos.sort((a, b) => (a.title < b.title) ? 1 : -1));
                todoDive();
                console.log(todos);

                break;
            case "completed":
              
                setTodosArr(todos.sort((a,b) => (b.completed-a.completed)));
                todoDive();

                break;
            default:

        }


    };
    const search=(type)=>{

    }
    const handleSearchSelect = (value) => {

        switch (value) {
            case "id":
                setSearch(
                <form onSubmit={(event)=>{navigate(`?id=${event.target.querySelector('#search').value}`);}}>
                <input id="search" type="text" /> 
                <button type="submit" >search</button>
                </form>)
                
                
                todoDive();
                break;
            case "a-z":
                setTodosArr(todos.sort((a, b) => (a.title > b.title) ? 1 : -1));
                todoDive();
                console.log(todos);
                break;
            case "z-a":
                setTodosArr(todos.sort((a, b) => (a.title < b.title) ? 1 : -1));
                todoDive();
                console.log(todos);

                break;
            case "completed":
              
                setTodosArr(todos.sort((a,b) => (b.completed-a.completed)));
                todoDive();

                break;
            default:

        }


    };


    return (
        <>
            <h3>Todos:</h3>
            <div>  {(!div && todos) ? todos.map((t) => (
                <div key={t.id}>
                    <h3>id: {t.id}</h3>
                    <h3>title: {t.title}</h3>
                    <h3>completed:</h3>
                    <input type="checkbox" readOnly checked={t.completed}></input>
                </div>)) : div}</div>
            {todos && (
                <select onChange={(e) => handleSortSelect(e.target.value)}>
                    <option value="none">None</option>
                    <option value="id">ID</option>
                    <option value="z-a">Title: z-a</option>
                    <option value="a-z">Title: a-z</option>
                    <option value="completed">Completed</option>
                </select>
                
            )}
  <div>{searchDiv}</div>
              <select onChange={(e) => handleSearchSelect(e.target.value)}>
                    <option value="none">None</option>
                    <option value="id">ID</option>
                    <option value="title">Title:</option>
                    <option value="completed">Completed</option>
                </select>
        </>
    );
};

export default Todos;
