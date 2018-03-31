var express  = require('express');
var app = express();
var server = require('http').Server(app).listen(process.env.PORT || 3000);
var io = require('socket.io')(server);
var users = ["No Active Users"];
var messages = [];
var name = "";

app.use(express.static(__dirname));
app.use(express.static(require('path').join(__dirname, 'public')));
app.get('/', function(req, res) {
  res.sendFile(__dirname + '/public/index.html');
});

io.on('connection', function(socket) {
   console.log('socket connected');
   socket.emit('displayUsers', {total : users.length, all_users : users});

   socket.on('newUser', function(data) {
     if(users[0] === "No Active Users")
     {
       users.splice(0, 1);
       users.push(data);
       io.sockets.emit('updateUsers', users);
     }
     else
     {
       users.push(data);
       name = data;
       io.sockets.emit('appendUser', data);
    }
    //io.sockets.emit('loadMessages', messages);
    //load previous messages when a new user connects
   });

   socket.on('newMessage', function(data) {
     messages.push(data.message);
     io.sockets.emit('appendMessage', data);
   });

   socket.on('disconnect', function() {
     var index = users.indexOf(name);
     users.splice(index, 1);
     if(users.length === 0) users[0] = "No Active Users";
     io.sockets.emit('updateUsers', users);
     console.log('disconnected');
  });
});
