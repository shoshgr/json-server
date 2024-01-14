import { useState } from 'react'
import { Link } from 'react-router-dom';

const Home = () => {

const logout=()=>{
    localStorage.removeItem("cur_user")
}

    return (
        <>
            <h3>home</h3>
            <Link to={'/home/info'}>Info  |  </Link>
            <Link to={'/home/todos'}>Todos  |  </Link>
            <Link to={'/home/posts'}>Posts  |  </Link>
            <Link to={'/home/albums'}>Albums  |  </Link>
            <Link onClick={logout} to={'/login'}>Logout</Link>
        </>
    );
}

export default Home;