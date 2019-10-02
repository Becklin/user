import React, { useState, useEffect } from 'react';

const Home = () => {
    const [userList, setUserList] = useState();
    const [isLoading, setIsLoading] = useState(false);
    function callAPI() {
        console.log('call api');
        setIsLoading(true);
        fetch("http://localhost:3000/api/users")
            .then(res => res.json())
            .then(res => {
                console.log(res);
                setUserList(res);
                setIsLoading(false);
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
    useEffect(() => {
            callAPI();
        }, []
    );
    return (
        <>
            {isLoading ? (
                <div>Loading...</div>
            ) : (
                <ul className="userlist" >
                    {userList && userList.length > 0 ? userList.map(
                        (user, index) =>
                            <li className="userlist-item" key={index}>
                                <span className="userlist-username" >{user.username}</span>
                                <span className="userlist-email" >{user.email}</span>
                                <button className="userlist-delete" onClick={() => deleteUser(user.id)} >DELETE</button>
                            </li>
                    ) : 'Please Login'}
                </ul>
            )}
        </>
    );
}

export default Home;
