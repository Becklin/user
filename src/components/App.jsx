import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import Login from './Login.jsx';
import SignUp from './SignUp.jsx';
import Home from './Home.jsx';


const App = () => {
    return (
        <Router>
            <nav>
                <ul>
                    <li>
                        <Link to="/">HOME</Link>
                    </li>
                    <li>
                        <Link to="/login">LOGIN</Link>
                    </li>
                    <li>
                        <Link to="/signup">SIGN UP</Link>
                    </li>
                </ul>
            </nav>
            <Route path="/" exact component={Home} />
            <Route path="/login" component={Login} />
            <Route path="/signup" component={SignUp} />
        </Router>
    );
}

export default App;