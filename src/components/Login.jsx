import React, { useState } from 'react';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    function handleInputChange({ target: { name, value } }) {
        switch (name) {
            case 'username': setUsername(value);
                break;
            case 'password': setPassword(value);
                break;
        }
    }
    function onSubmit(e) {
        e.preventDefault();
        fetch('http://localhost:3000/api/login', {
            method: 'POST',
            body: JSON.stringify({ username, password }),
            headers: { 'Content-type': 'application/json' }
        }).then(()=>{
            window.location.href = 'http://localhost:3000';
        })
        .catch(err => {
            console.log('login fail', err);
        });
    }
    return (
        <form onSubmit={onSubmit}>
            <h1>Login Below!</h1>
            <input
                type="text"
                name="username"
                placeholder="Enter username"
                value={username}
                onChange={handleInputChange}
                required
            />
            <input
                type="password"
                name="password"
                placeholder="Enter password"
                value={password}
                onChange={handleInputChange}
                required
            />
            <input type="submit" value="Submit" />
        </form>
    );
}

export default Login;