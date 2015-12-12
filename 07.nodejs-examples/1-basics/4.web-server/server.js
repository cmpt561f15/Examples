var http = require('http');

var server = http.createServer(function (request, response) {
  var json = '';
  switch (request.url) {
    case '/' :
      response.write('<h1> Hello Node </h1>');
      response.write('<p>Method: ' + request.method + '</p>');
      response.write('<p>URL: ' + request.url + '</p>');
      response.write('<p><a href="source">Source code</a></p>');
      response.write('<p><a href="customers">Customers</a></p>');
      response.write('<p><a href="orders">Orders</a></p>');
      response.end();
      break;
    case '/source' :
      var fs = require('fs');
      //Send the source code of this server
      fs.createReadStream('server.js').pipe(response);
      break;
    case '/customers':
          response.writeHead(200, {"Content-Type": "application/json"});
          json = '[{"firstName":"Ahmed", "lastName":"Saghir"},{"firstName":"Fatima", "lastName":"Kabir"}]';
          response.write(json);
          response.end();
          break;
    case '/orders':
          response.writeHead(200, {"Content-Type": "application/json"});
          json = '[{"orderID":"1","quantity":"20"},{"orderID":"2","quantity":"10"}]';
          response.write(json);
          response.end();
          break;
    default:
      response.writeHead(404);
      response.write('<p>URL: ' + request.url + ' not found<p>');
      response.end();
  }
});

// Uncomment this line to echo some information about the request
server.listen(3000, function() {
  console.log('Web server listening @ http://localhost:3000');
});