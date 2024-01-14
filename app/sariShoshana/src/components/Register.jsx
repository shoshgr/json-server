import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Register = () => {

    const apiUrl = 'http://localhost:3002/users';
    const navigate = useNavigate();
    const [message, setMessage] = useState("");

    const register = (name, password) => {
        fetch(`${apiUrl}?username=${name}`
            , { method: 'GET' }).then(data => data.json()).then(data => {
                if (data.length > 0) {
                    alert("user already exist, please login");
                    navigate("/login");
                }
                else
                    navigate("/details")
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
            register(userName, password);
        }
    }

    return (
        <>
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
                <button type="submit"> register</button>
                <h3>{message}</h3>
            </form>
            <button onClick={() => { navigate("/login") }} > login</button>
        </>
    );
}

export default Register;