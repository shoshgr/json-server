import { useState } from 'react'
import { useNavigate } from 'react-router-dom';


function Login() {
    const navigate=useNavigate();
    const setCurUser=(user)=>{
        localStorage.setItem("cur user",JSON.stringify(user));
    }

    const verify_user = (event) => {
       
        event.preventDefault();
        debugger;
        const apiUrl = 'http://localhost:3002/users';
        const userName = event.target.querySelector('#name').value;
        const password = event.target.querySelector('#password').value;
       let u = fetch(`${apiUrl}?username=${userName}&website=${password}`
            , { method: 'GET' }).then(data=>data.json()).then(data=>{ 
                if (data.length>0) {
                alert(`welcom ${userName} `);
                setCurUser(data[0]);
                navigate("/home"); 
            }
            else { alert("error username or password ");
            event.target.querySelector('#name').value="";
            event.target.querySelector('#password').value="";
         }});
    }
    return (
        <>
        <form  onSubmit={verify_user}>
            <label htmlFor="name">name: </label>
            <input type='text' id='name' />
            <br/>
            <label htmlFor="password">password: </label>
            <input type='text' id='password' />
            <br/>
            <button type="submit"> login</button>
        </form>
         <button onClick={()=>{navigate("/register")}} > register</button>
         </>
    );

}
export default Login