var express  = require('express');
var app = express();
var server = require('http').Server(app).listen(3000);
var io = require('socket.io')(server);
var users = [];

app.use(express.static(__dirname));
app.use(express.static(require('path').join(__dirname, 'public')));
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', function(socket) {
   console.log('socket connected');
   socket.emit('displayUsers', {total : users.length, all_users : users});

   socket.on('newUser', function(data) {
     console.log("Hello, " + data);
     users.push(data);
     io.sockets.emit('appendUser', data);
   });

  socket.on('disconnect', function() {
    //users.remove()
    console.log('disconnected');
  });
});
