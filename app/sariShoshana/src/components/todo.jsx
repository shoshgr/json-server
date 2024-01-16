import recat from "react"
import Todos from "./Todos";

const Todo=(props)=>{

return(
    <>
    {props.todos&& props.todos.map((t) => (
        <div key={t.id}>
          <h3>id: {t.id}</h3>
          <h3>title: {t.title}</h3>
          <h3>completed:</h3>
          <input type="checkbox" readOnly checked={t.completed}></input>
        </div>
      ))}
      </>
);
}
export default Todo;
