import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AddTodo from './AddTodo';
import Todo from './Todo';

const Todos = () => {
    const navigate = useNavigate();
    const user = JSON.parse(localStorage.getItem("cur_user"));
    const apiUrl = 'http://localhost:3002/todos';

    const [todos, setTodosArr] = useState(null);
    const [todosDiv, setTodosDiv] = useState(null);
    const [searchArr, setSearch] = useState([]);
    const [showSearchForm, setShowSearchForm] = useState({ status: 0, type: "" });

    const setTodosScreen = () => {
        setTodosDiv(todos && todos.map((t) => (
           <Todo todos={todos} setTodosArr={setTodosArr}  todo={t}/>)))
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
        let input_value = event.target.querySelector('#search').value;
        switch (showSearchForm.type) {
            case "id":
                todos.map(t => {
                    (t.id == input_value) ? setSearch(searchArr.push(t)) : null;
                });
                break;
            case "title":
                todos.map(t => {
                    (t.title == input_value) ? setSearch(searchArr.push(t)) : null;
                });
                break;
            case "completed":
                todos.map(t => {
                    (t.completed == (input_value=="true")?true:false) ? setSearch(searchArr.push(t)) : null;
                });
                break;

            default:
                break;
        }
        if (searchArr.length) {
            setTodosDiv(searchArr.map((t) => (
                <div key={t.id}>
                    <h3>id: {t.id}</h3>
                    <h3>title: {t.title}</h3>
                    <h3>completed:</h3>
                    <input type="checkbox" readOnly checked={t.completed}></input>
                </div>)))
            navigate(`?${showSearchForm.type}=${input_value}`);
        }
        else
            alert(`todo with ${showSearchForm.type}: ${input_value} does not exist`);
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
            case "completed (true/false)":
                setShowSearchForm({ status: 1, type: "completed" });
                break;
            default:
                setTodosScreen();
                navigate("");
        }
        setSearch([]);
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
            <AddTodo todos={todos}  setTodosArr={setTodosArr}/>
            
  

            <div>
                {(!todosDiv && todos) ? todos.map((t) => (
                    <Todo  todos={todos} setTodosArr={setTodosArr} todo={t}/>)) : todosDiv}
            </div>

            {todos && (
                <select onChange={(e) => handleSortSelect(e.target.value)}>
                    {sortOptions.map(option => <option key={option} value={option}>{option}</option>)}
                </select>
            )}

            <form style={{ display: showSearchForm.status ? "inline" : "none" }} id="searchForm" onSubmit={search}>
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
