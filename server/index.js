const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const cookieParser = require('cookie-parser');
const userRouter = require('./router/userRouter');

app.use(bodyParser.json());
app.use(cookieParser());

const port = process.env.PORT || 3000;
const DIST_DIR = path.join(__dirname, '../dist');
const HTML_FILE = path.join(DIST_DIR, 'index.html');
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.get('/api/login', function (req, res) {
  res.render('login.ejs', { title: 'Express' });
});
app.post('/api/login', (req, res) => {
  const { username, password } = req.body;
  const dbUser = {
    username: 'admin',
    password: '123456',
  };
  if (username === dbUser.username && password === dbUser.password) {
    res.cookie("user", { username: username }, { maxAge: 900000, httpOnly: true });
    res.status(200).send('登入成功');
  } else {
    res.status(401).send('帳密有錯');
  }
});

app.get('/api/logout', (req, res) => {
    for (var prop in req.cookies) {
        if (!req.cookies.hasOwnProperty(prop)) {
            continue;
        }    
        res.cookie(prop, '', {expires: new Date(0)});
    }
    res.status(200).redirect('/');
});

//可設定多個靜態資產目錄
app.use('/static', express.static('public')); //虛擬目錄static
app.use(express.static(DIST_DIR)); 

app.get('/', (req, res) => {
  res.send(HTML_FILE);
  if (!req.cookies || !req.cookies.user) {
    res.send('please login');
  }
});

app.use('/api/user', userRouter);
app.listen(port, function () {
  console.log('Example app listening on port 3000!');
}); 