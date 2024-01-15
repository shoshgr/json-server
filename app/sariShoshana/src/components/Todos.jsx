import { useState, useEffect} from 'react'

const Todos =  ()  => {
    let user = JSON.parse( localStorage.getItem("cur_user"));
    const apiUrl = 'http://localhost:3002/todos';
    const[todos,setTodosArr]=useState(null);
    function fetchArr(){
        fetch(`${apiUrl}?userId=${user.id}`)
          .then(response => response.json())
          .then(data=>setTodosArr(data))
        }
        
        useEffect(()=>{fetchArr()},[]); 
    return (
                    <>
                        <h3>Todos:</h3>
                        {todos && todos.map(t=>{
                       <div key={t.id}>
                        <h3>id:{t.id}</h3>
                        <h3>title:{t.title}</h3>
                        <h3>completed:</h3>
                        <input type="checkbox" checked={t.completed}></input>
                        </div>
                    })}
            
                    </>
            );
   
}

export default Todos;