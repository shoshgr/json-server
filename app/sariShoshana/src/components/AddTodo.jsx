import React, { useState, useEffect } from "react";

const AddTodo = (props) => {

    let id = 5;
    let arr = [];
    const [showForm, setForm] = useState("none");
    const user = JSON.parse(localStorage.getItem("cur_user"));
    const add = (event) => {
        event.preventDefault();
       
        let todo = {
            userId: user.id,
            id: id,
            title: event.target.querySelector('#title').value,
            completed: event.target.querySelector('#completed').checked

        }
        fetch('http://localhost:3002/todos', {
            method: "POST", body: JSON.stringify(todo),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            }
        });
        setForm("none");
        props.todos.map(t=>arr.push(t));
        arr.push(todo);
        props.setTodosArr(arr);
        event.target.querySelector('#title').value = "";
        event.target.querySelector('#completed').checked = false;
    }

    return (<>
        <button onClick={()=>{ showForm == "none" ? setForm("inline") : setForm("none")}}>add</button>

        <form onSubmit={() => add(event)} style={{ display: showForm }}>
            <label htmlFor="title">title:</label>
            <input type="text" id="title" />
            <label htmlFor="completed">completed:</label>
            <input type="checkbox" id="completed" />
            <button type="submit" > submit</button>
        </form>
    </>
    );


}
export default AddTodo;