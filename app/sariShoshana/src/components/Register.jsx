import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { curUser } from '../App';

const Register = () => {

    const url = 'http://localhost:3002/users';
    const navigate = useNavigate();
    const [message, setMessage] = useState("");
    const { cur_user, setUser } = useContext(curUser);

    const register = (name) => {
        fetch(`${url}?username=${name}`, { method: 'GET' })
            .then(data => data.json())
            .then(data => {
                if (data.length > 0) {
                    alert("user already exist, please login");
                    navigate("/login");
                }
                else {
                    navigate("./details")
                }
            })
    }

    const verify_password = (event) => {
        event.preventDefault();
        const userName = event.target.querySelector('#name').value;
        const password = event.target.querySelector('#password').value;
        const verify_password = event.target.querySelector('#verify_password').value;

        if (verify_password != password) {
            setMessage("Password verification failed, please try again");
            event.target.querySelector('#verify_password').value = "";
        }
        else {
            setMessage("");
            setUser({ name: userName, password: password });
            register(userName);
        }
    }

    return (
        <div className='getInForm' id="register">
            <form onSubmit={verify_password}>
                <label htmlFor="name">name: </label>
                <input type='text' id='name' required />
                <br />
                <label htmlFor="password">password: </label>
                <input type='text' id='password' required />
                <br />
                <label htmlFor="verify_password">verify password: </label>
                <input type='text' id='verify_password' required />
                <br />
                <h3>{message}</h3>
                <button type="submit"> register</button>
            </form>
            <button onClick={() => { navigate("/login") }} > login</button>
        </div>
    );
}

export default Register;