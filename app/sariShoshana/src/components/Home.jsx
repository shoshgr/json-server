import React from 'react'
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Home = () => {

    const navigate = useNavigate();
    let user = JSON.parse(localStorage.getItem("cur_user"));

    const logout = () => {
        localStorage.removeItem("cur_user")
    }

    return (
        <>
            {/* <button onClick={()=>navigate("posts")}>posts</button> */}
            <h3>{user.name}</h3>
            <Link to={"info"}>Info  |  </Link>
            <Link to={"todos"}>Todos  |  </Link>
            <Link to={"posts"}>Posts  |  </Link>
            <Link to={'albums'}>Albums  |  </Link>
            <Link onClick={logout} to={'/login'}>Logout</Link>
        </>
    );
}

export default Home;