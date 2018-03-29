var socket = io.connect();
var name = "";

$(function() {
  $('#chat').hide();
  $('#formJoin').submit(function(e) {
    e.preventDefault();
    if($('#input-name').val() != "")
    {
      name = $('#input-name').val();
      socket.emit('newUser', name);
      $('#formJoin').hide();
      $('#empty').addClass('jumbotron');
      $('#chat').show();
    }
  });

  function addUser(name)
  {
    $('#active-users').append('<li class="list-group-item">'+name+'</li>');
  }

  socket.on('displayUsers', function(data) {
    var size = data.total;
    for(var key in data.all_users)
      addUser(data.all_users[key]);
  });

  socket.on('appendUser', function(data) {
    addUser(data);
  });

  socket.on('updateUsers', function(data) {
    $('#active-users').empty();
    for(var key in data)
      addUser(data[key]);
  });

  $('#submitMessage').submit(function(e) {
    e.preventDefault();
    var userInput = $('#input-message').val();
    socket.emit('newMessage', {username: name, message: userInput});
    $('#input-message').val('');
  });

  socket.on('appendMessage', function(data) {
    $('#messages').append('<li class="list-group-item"><span class="name">'
                           + data.username + ': </span>' + data.message + '</li>');
  });
});
