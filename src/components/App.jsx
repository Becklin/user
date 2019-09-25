import React , { useState, useEffect }  from 'react';
const App = () => {
    const [userList, setUserList] = useState();
    function callAPI() {
        fetch("http://localhost:3000/api/users")
            .then(res => res.json())
            .then(res => {
                console.log(res);
                setUserList(res);
            })
            .catch(err => {
                console.log(err);
            });
    }
    function deleteUser(username) {
        fetch(`http://localhost:3000/api/users/${username}`, {
            method: 'DELETE'
        }).then(response => {
            callAPI();
        });
    }
    useEffect(() => callAPI(), []);
    return (
        <ul>
            { userList && userList.length > 0 ? userList.map(
             (user, index) => <li onClick={() => deleteUser(user.id)} key={index}><span>{user.username}</span> > <span>{user.email}</span></li>
         ) : 'NO USERS'}
        </ul>
    );
}

export default App;