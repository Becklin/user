import React , { Component } from 'react';

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
    deleteUser(username) {
        fetch(`http://localhost:3000/api/user/${username}`, {
            method: 'DELETE'
        }).then(response => {
            this.callAPI();
        });
    }
    componentDidMount() {
        this.callAPI();
    }
    handleDelete(username) {
        this.deleteUser(username);
    }
    renderUsers() {
        return this.state.userList.map(
            (user, index) => <li onClick={() => this.handleDelete(user.username)} key={index}><span>{user.username}</span> > <span>{user.email}</span></li>
        )
    }
    render() {
        return (
            <>
                <ul>
                    {this.state.userList > 0 && this.renderUsers()}
                </ul>
            </>
        )
    }
}
export default App;