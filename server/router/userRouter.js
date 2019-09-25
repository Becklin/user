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
connection.on('error', err => {
    if (!err)
        console.log('連線connection success');
    else
        console.log("連線connection fail : ", err);
});
//get User list
userRouter.get('/', isLoggedIn, function (req, res) {
    const Read = 'SELECT * FROM user';
    connection.query(Read, (error, list) => {
        if (error) throw error;
        res.status(200).send(list);
    });
});
//get User By username
userRouter.get('/:id', isLoggedIn, (req, res) => {
    const ReadUser = `SELECT * FROM user WHERE id = '${req.params.id}'`;
    connection.query(ReadUser, (error, info) => {
        if(info.length == 0) res.status(404).send('user does not exist');
        const data = {
            id: info[0].id,
            email: info[0].email,
        };
        res.status(200).send(data);
    });
});
//insert User
userRouter.post('/', (req, res) => {
    const Create = `INSERT INTO user (username, email, password, userStatus)
    VALUES ('${req.body.username}', '${req.body.email}', '${req.body.password}', '${req.body.userStatus}')`;
    connection.query(Create, (error, info) => {
            console.log('err', error);
            if (error) {
                res.status(400).send({"message": error.sqlMessage});
            }
            res.status(201).send(info);
        });
});

userRouter.put('/:id', (req, res) => {
    const Select = `SELECT * FROM user WHERE id = '${req.params.id}'`;
    connection.query(Select, (error, info) => {
        console.log('info', info);
        if(info.length == 0) res.status(404).send('user does not exist');
    });
    const Update = `UPDATE user
            SET username = '${req.body.username}', email = '${req.body.email}', password = '${req.body.password}', userStatus = '${req.body.userStatus}'
            WHERE id = '${req.params.id}'`;
    connection.query(Update, (error, info) => {
        if (error) throw error;
        res.status(201).send(info);
    });
});

userRouter.delete('/:id', (req, res) => {
    const Select = `SELECT * FROM user WHERE id = '${req.params.id}'`;
    connection.query(Select, (error, info) => {
        console.log('info', info);
        if(info.length == 0) res.status(404).send('user does not exist');
    });
    const Delete = `DELETE FROM user WHERE id = '${req.params.id}'`;
    connection.query(Delete, error => {
        if (error) throw error;
        res.status(200).send('Delete success');
    });
});

module.exports = userRouter;