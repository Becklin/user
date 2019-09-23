import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import './style.scss';

import Head from './components/Head.jsx';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { userList: '' };
    }

    callAPI() {
        fetch("http://localhost:3000/api/user")
            .then(res => res.json())
            .then(res => {
                this.setState({
                    userList: res
                })
            })
            .catch(err => {
                console.log(err);
            });
    }

    componentDidMount() {
        this.callAPI();
    }

    renderUsers() {
        if (this.state.userList) {
            return this.state.userList.map((user, index) => <li key={index}><span>{user.username}</span> > <span>{user.email}</span></li>)
        }
    }
    render() {
        return (
            <div>
                <Head />
                <ul>
                    {this.renderUsers()}
                </ul>
            </div>
        )
    }
}
ReactDOM.render(<App />, document.getElementById('root'));