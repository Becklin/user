const express = require('express');
const app = express();
const router = express.Router();
console.log(__dirname);

var mysql      = require('mysql');
var connection = mysql.createConnection({
  host     : '127.0.0.1',
  user     : 'root',
  password : 'Imtheking2',
  database : 'user2'
});

connection.connect();
connection.query('SELECT * FROM user', function (error, results, fields) {
  if (error) throw error;
  console.log('The results is: ', results);
});
connection.on('error', function(err) {
  console.log("[mysql error]",err);
});

router.get('/login', function (req, res) {
  res.send('login');
  const { username, password } = req.query;
  const dbUser = {
    username: 'admin',
    password: '123456',
  };
  if(username === dbUser.username && password === dbUser.password) {
    console.log('正確');
    res.cookie("user", { username: username });
    res.redirect('index');
  } else {
    console.log('帳密有錯');
  }
});

app.use('/static', express.static('public'));

app.get('/', function (req, res) {
  if(req.cookies.user !== null){
    req.user = req.cookies.user;
  }
  console.log(`成功${req.user}`);
  res.send(`Hello World!${req.user}`);
});

app.use('/api/user', router);
app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
}); 