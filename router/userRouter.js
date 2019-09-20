const express = require('express');
const userRouter = express.Router();
const mysql = require('mysql');
const isLoggedIn = require('../isLoggedIn');
const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'Imtheking2',
    database: 'user2'
});
connection.connect();
connection.on('error', function (err) {
    if (!err)
        console.log('連線connection success');
    else
        console.log("連線connection fail : ", err);
});
//get User list
userRouter.get('/',isLoggedIn , function (req, res) {
    const Read = 'SELECT * FROM user';
    connection.query(Read, (error, list, fields) => {
        if (error) throw error;
        res.send(list);
    });
});
//get User By username
userRouter.get('/:username',isLoggedIn , function (req, res) {
    const ReadUser = `SELECT * FROM user WHERE username = '${req.params.username}'`;
    connection.query(ReadUser, (error, info, fields) => {
        if (error) throw error;
        const data = {
            username: info[0].username,
            email: info[0].email,
        };
        res.send(data);
    });
});
//insert User
userRouter.post('/', function (req, res) {
    const Create = `INSERT INTO user (username, email, password, userStatus) 
    VALUES ('${req.body.username}', '${req.body.email}', '${req.body.password}', '${req.body.userStatus}')`;
    const CheckExist = `SELECT * FROM user WHERE username = ${req.body.username}`;
    if (CheckExist) return res.end('please change another name');
    connection.query(Create),
        function (error, info, fields) {
            if (error) throw error;
            res.send(info);
        };
});
userRouter.put('/:username', function (req, res) {
    const Update = `UPDATE user
            SET username = '${req.body.username}', email = '${req.body.email}', password = '${req.body.password}', userStatus = '${req.body.userStatus}'
            WHERE username = '${req.body.username}'`;

    connection.query(Update), (error, info, fields) => {
        if (error) throw error;
        res.send(info);
    };
});
userRouter.delete('/:username', function (req, res) {
    const Delete = `DELETE FROM user WHERE username = '${req.params.username}'`;
    connection.query(Delete, (error, info, fields) => {
        if (error) throw error;
        res.send('Delete success');
    });
});

module.exports = userRouter;