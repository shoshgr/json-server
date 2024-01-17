import React, { useState, useEffect } from "react";

const AddTodo = (props) => {

    let id;
    let arr = []
    const [showForm, setShowForm] = useState("none");
    const user = JSON.parse(localStorage.getItem("cur_user"));
    const apiUrl = 'http://localhost:3002';

    function fetchID() {
        fetch(`${apiUrl}/config_id`, {
            method: 'GET'
        })
            .then((response) => response.json())
            .then((json) => {
                console.log(json[0].nextTodoId)
                id = json[0].nextTodoId
            });
    }

    // useEffect(() => {
    //     fetchID();
    // }, []);

    const add = (event) => {
        event.preventDefault();
        fetchID();

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


        const next_id = {
            "nextTodoId": id + 1
        }

        fetch(`${apiUrl}/config_id/nextUserId`, {
            method: "PUT",
            body: JSON.stringify(next_id),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        }).then((response) => response.json()).then((json) => console.log(json));

        setShowForm("none");
        props.todos.map(t => arr.push(t));
        arr.push(todo);
        props.setTodosArr(arr);
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
    </>
    );
}

export default AddTodo;