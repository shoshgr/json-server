import React, { useState } from "react";

const Todo = (props) => {

    const cur_todo = props.todo;
    const [form, setUpdateForm] = useState();
    const url = "http://localhost:3002/todos";

    const delete_todo = () => {
        event.preventDefault();
        fetch(`${url}/${cur_todo.id}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            }
        }).then(response => {
            if (!response.ok) {
                throw new Error(`Request failed with status: ${response.status}`);
            }
            const updatedTodos = props.todos.filter(t => t.id != cur_todo.id);
            props.setTodosArr(updatedTodos);
        }).catch(error => {
            console.error(error);
        });
    }

    const update = (event) => {
        event.preventDefault()
        let todo = {
            userId: cur_todo.userId,
            id: cur_todo.id,
            title: event.target.querySelector('#title').value == "" ? cur_todo.title : event.target.querySelector('#title').value,
            completed: event.target.querySelector('#completed').checked == true ? !cur_todo.completed : cur_todo.completed
        }
        fetch(`${url}/${cur_todo.id}`, {
            method: "PUT",
            body: JSON.stringify(todo),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            }
        }).then(response => {
            if (!response.ok) {
                throw new Error(`Request failed with status: ${response.status}`);
            }
            let updatedTodos = [];
            props.todos.map(t => t.id != cur_todo.id ? updatedTodos.push(t) : updatedTodos.push(todo));
            props.setTodosArr(updatedTodos);
        }).then(setUpdateForm(null)).catch(error => {
            console.error(error);
        });
    }

    return (<>
        <div>
            <h3>id: {cur_todo.id}</h3>
            <h3>title: {cur_todo.title}</h3>
            <h3>completed:</h3>
            <input type="checkbox" readOnly checked={cur_todo.completed}></input>
            <button onClick={() => delete_todo()}>delete</button>
            <button onClick={() => {
                setUpdateForm(<form onSubmit={() => update(event)}>
                    <label htmlFor="title">title:</label>
                    <input type="text" id="title" />
                    <label htmlFor="completed">change status:</label>
                    <input type="checkbox" id="completed" />
                    <button type="submit" >update</button>
                </form>)
            }}>update</button>
            <div>{form}</div>
        </div >
    </>)
}

export default Todo;