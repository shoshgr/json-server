import React, { useState, useEffect } from 'react';

const Todos = () => {
  const user = JSON.parse(localStorage.getItem("cur_user"));
  const apiUrl = 'http://localhost:3002/todos';
  const [todos, setTodosArr] = useState(null);


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
        console.log(todos);
        break;
      case "title":
        setTodosArr(todos.sort((a, b) => (a.title > b.title) ? 1 : -1));
        console.log(todos);
        break;
      case "completed":
        setTodosArr(todos.sort((a) => (a.completed ? 1 : -1)));
        break;
      default:
       
    }

   
  };

  return (
    <>
      <h3>Todos:</h3>
      {todos && todos.map((t) => (
        <div key={t.id}>
          <h3>id: {t.id}</h3>
          <h3>title: {t.title}</h3>
          <h3>completed:</h3>
          <input type="checkbox" readOnly checked={t.completed}></input>
        </div>
      ))}
      {todos && (
        <select onChange={(e) => handleSortSelect(e.target.value)}>
          <option value="none">None</option>
          <option value="id">ID</option>
          <option value="title">Title</option>
          <option value="completed">Completed</option>
        </select>
      )}
    </>
  );
};

export default Todos;
