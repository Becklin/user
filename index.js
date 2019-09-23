const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const cookieParser = require('cookie-parser');
const userRouter = require('./router/userRouter');

app.use(bodyParser.json());
app.use(cookieParser());

const port = process.env.PORT || 3000;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.get('/api/login', function (req, res) {
  res.render('login.ejs', { title: 'Express' });
});
app.post('/api/login', function (req, res) {
  const { username, password } = req.body;
  const dbUser = {
    username: 'admin',
    password: '123456',
  };
  if (username === dbUser.username && password === dbUser.password) {
    res.cookie("user", { username: username }, { maxAge: 900000, httpOnly: true });
    res.status(200).send('登入成功');
  } else {
    console.log('帳密有錯');
  }
});

// app.get('/signup', function(req, res) {
//   res.render('signup.ejs');
// });
// app.post('/signup', function(req, res) {

// });

app.use('/static', express.static('public'));

app.get('/api', function (req, res) {
  if (req.cookies && req.cookies.user !== null) {
    req.user = req.cookies.user;
    res.send(`Hello World! ${req.user.username}`);
  } else {
    console.log('haha');
  }
});

app.use('/api/user', userRouter);
app.listen(port, function () {
  console.log('Example app listening on port 3000!');
}); 