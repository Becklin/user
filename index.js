var express = require('express');
var app = express();
console.log(__dirname);
app.use('/static', express.static('public'));

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
}); 