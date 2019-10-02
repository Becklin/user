import React, { useState } from 'react';

const SignUp = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    function handleInputChange({ target: { name, value } }) {
        switch (name) {
            case 'username': setUsername(value);
                break;
            case 'password': setPassword(value);
                break;
            case 'email': setEmail(value);
                break;
        }
    }
    function onSubmit(e) {
        e.preventDefault();
        fetch('http://localhost:3000/api/users', {
            method: 'POST',
            body: JSON.stringify({ username, password, email, userStatus: 'away'}),
            headers: { 'Content-type': 'application/json' }
        }).then(()=>{
            window.location.href = 'http://localhost:3000';
        })
        .catch(err => {
            console.log('signup fail', err);
        });
    }
    return (
        <form onSubmit={onSubmit}>
            <h1>Sign Up</h1>
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
            <input
                type="email"
                name="email"
                placeholder="Enter email"
                value={email}
                onChange={handleInputChange}
            />
            <input type="submit" value="Submit" />
        </form>
    );
}

export default SignUp;