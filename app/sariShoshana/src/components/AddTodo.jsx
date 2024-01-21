import React, { useState, useEffect } from "react";

const AddTodo = (props) => {

    let arr = []
    const [showForm, setShowForm] = useState("none");
    const user = JSON.parse(localStorage.getItem("cur_user"));
    const apiUrl = 'http://localhost:3002';
    const [id, setId] = useState();

    function fetchID() {
        fetch(`${apiUrl}/config_id?id=nextTodoId`, {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(json)
                setId(json[0].nextTodoId);

            });
    }

    useEffect(() => {
        fetchID();
    }, []);

    const add = (event) => {
        event.preventDefault();

        let todo = {
            userId: user.id,
            id: id,
            title: event.target.querySelector('#title').value,
            completed: event.target.querySelector('#completed').checked
        }

        fetch('http://localhost:3002/todos', {
            method: "POST",
            body: JSON.stringify(todo),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            }
        });

        setId(id + 1);
        const next_id = {
            "nextTodoId": id
        }

        fetch(`${apiUrl}/config_id/nextTodoId`, {
            method: "PUT",
            body: JSON.stringify(next_id),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        }).catch(error => console.error(error));

        setShowForm("none");
        props.todos.map(t => arr.push(t));
        arr.push(todo);
        props.setTodosArr(arr);
        event.target.querySelector('#title').value = "";
        event.target.querySelector('#completed').checked = false;
    }

    return (<>
        <button onClick={() => { showForm == "none" ? setShowForm("inline") : setShowForm("none") }}>add a todo</button>
        <form onSubmit={() => add(event)} style={{ display: showForm }}>
            <label htmlFor="title">title:</label>
            <input type="text" id="title" />
            <label htmlFor="completed">completed:</label>
            <input type="checkbox" id="completed" />
            <button type="submit" >add todo</button>
        </form>
    </>);
}

export default AddTodo;