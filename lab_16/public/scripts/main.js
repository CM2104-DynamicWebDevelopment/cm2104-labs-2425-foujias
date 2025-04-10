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

//DISPLAYING THE MESSAGES ON THE CLIENT
 socket.on('chat message', function(msg) { 
 $('#messages').append("<li>"+msg+"</li>"); 
 window.scrollTo(0, document.body.scrollHeight); 
}); 