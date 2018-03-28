var express = require('express');
var app = express();
var server = require('http').Server(app).listen(3000, function(){
  console.log("listening on port 3000");
});
var io = require('socket.io')(server);

app.get('/', function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

io.on('connection', function(socket){
  console.log("Socket connected");
  socket.on('disconnect', function() {
    console.log("disconnected");
  });
});
