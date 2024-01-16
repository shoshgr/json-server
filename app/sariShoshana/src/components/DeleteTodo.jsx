import React,{useState} from "react";
const Todo = (props) => {
   
    const id=props.t.id;
 
   
    const[form,setUpdateForm]=useState();
    const url = "http://localhost:3002/todos";
    const del = () => {
        fetch(`${url}/${id}`, {
        method: 'DELETE',
        headers: {
        'Content-Type': 'application/json',
        }}).then(response => {
        if (!response.ok) {
            throw new Error(`Request failed with status: ${response.status}`);
        }
        const updatedTodos = props.todos.filter(t => t.id !== props.t.id);
        props.setTodosArr(updatedTodos);
        }).catch(error => {
        console.error(error);
        });
        console.log(id);   
    }     
    const update = (event) => {

        let todo={
            userId: props.t.userId,
            id:id,
            title:event.target.querySelector('#title').value==""?props.t.title:event.target.querySelector('#title').value,
            completed:event.target.querySelector('#completed').checked==true?event.target.querySelector('#completed').checked:props.t.completed
        }
        fetch(`${url}/${id}`, {
            method: "PUT",
            body:JSON.stringify(todo) ,
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            }
        }).then(response => {
            if (!response.ok) {
                throw new Error(`Request failed with status: ${response.status}`);
            }
            let updatedTodos=[]; 
            props.todos.map(t => t.id != id?updatedTodos.push(t):updatedTodos.push(todo));
            props.setTodosArr(updatedTodos);
            }).then( setUpdateForm(null)).catch(error => {
            console.error(error);
            });
          
    }
    return (<>
        <div key={props.t.id}>
            <h3>id: {props.t.id}</h3>
            <h3>title: {props.t.title}</h3>
            <h3>completed:</h3>
            <input type="checkbox" readOnly checked={props.t.completed}></input>
            <button onClick={()=>del()}>delete</button>
            <button onClick={() =>{ setUpdateForm(<form  onSubmit={()=>update(event)}>
            <label htmlFor="title">title:</label>
            <input type="text" id="title" />
            <label htmlFor="completed">change status:</label>
            <input type="checkbox" id="completed" />
            <button type="submit" >update</button>
        </form>)}}>update</button>
<div>{form}</div>
        </div>
        
    </>);
}
export default Todo;