var socket = io();

//send messages to the server
$('#form').submit(function () { 
 var message = $('#input').val(); 
 if (message) { 
 socket.emit('chat message', message); 
 $("#input").val(""); 
 } 
 return false; 
 }) 

$('#form').submit(function () { 
 var message = $('#input').val(); 
 if (message) { 
 socket.emit('chat message', message); 
 $("#input").val(""); 
 } 
 return false; 
 })