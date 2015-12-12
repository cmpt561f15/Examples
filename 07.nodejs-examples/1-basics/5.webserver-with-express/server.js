//To run this app you need to run 'npm install' on
var express = require('express');
var app = express();

app.get('/', function(req,res) {
  res.send('Hello world');
});

app.listen(3040, function() {
  console.log('Web server listening @ http://localhost:3040');
});
