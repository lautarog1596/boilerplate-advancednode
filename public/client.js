$(document).ready(() =>{

  // Form submittion with new message in field with id 'm'
  $('form').submit(() => {
    var messageToSend = $('#m').val();

    socket.emit('chat message', messageToSend);

    $('#m').val('');
    return false; // prevent form submit from refreshing page
  });

  /*global io*/
  let socket = io();

  socket.on('user', data => {
    $('#num-users').text(data.currentUsers + ' users online');
    let message = data.name;
    if (data.connected) {
      message += ' has joined the chat';
    } else {
      message += ' has left the chat';
    }
    $('#messages').append($('<li>').html('<b>' + message + '</b>'));
  });

  socket.on('chat message', data => {
    $('#messages').append($('<li>').text(data.name + ': ' + data.message));
  });

});
