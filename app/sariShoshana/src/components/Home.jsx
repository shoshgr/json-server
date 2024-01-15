import React, { useState } from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';


const Home = () => {
    const navigate = useNavigate();
let user = JSON.parse( localStorage.getItem("cur_user"));
const logout=()=>{
    localStorage.removeItem("cur_user")

}

    return (
        <>
            <h3>{user.name}</h3>
            <button onClick={()=>{navigate("info")}}>Info  | </button>
            <Link to={"info"}>Info  |  </Link>
            <Link to={"/home/users/:id/todos"}>Todos  |  </Link>
            <Link to={"posts"}>Posts  |  </Link>
            <Link to={'albums'}>Albums  |  </Link>
            <Link onClick={logout} to={'/login'}>Logout</Link>
        </>
    );
}

export default Home;