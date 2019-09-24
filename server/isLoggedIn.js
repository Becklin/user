function isLoggedIn(req, res, next) {
  const dbUser = {
    username: 'admin',
  };
  if (req.cookies['user'] &&
    req.cookies['user'].username === dbUser.username) {
    return next();
  } else {
    console.log('帳密有錯');
  }
}

module.exports = isLoggedIn;