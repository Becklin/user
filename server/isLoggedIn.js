function isLoggedIn (req, res, next) {
  console.log('驗證登入');
  console.log(req.cookies['user']);
  const dbUser = {
    username: 'admin',
  };
  if (req.cookies['user'] && req.cookies['user'].username === dbUser.username ) {
    console.log('正確');
    return next();
  } else {
    console.log('帳密有錯');
  }
}

module.exports = isLoggedIn;