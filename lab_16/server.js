const express = require('express'); 
const app = express(); 
const http = require('http').Server(app); 
const io = require('socket.io')(http); 
//code to define the public "static" folder 
app.use(express.static('public')) 
// set the view engine to ejs 
app.set('view engine', 'ejs'); 
// Render the 'index' page when visiting the root URL
app.get('/', function(req, res){ 
 res.render('pages/index'); 
}); 


/*io.on('connection', function(socket){ 
  console.log('a user connected'); 
*}); 
http.listen(8080, function(){ 
 console.log('listening on *:8080'); 
}); */

//TESTING DISCONNECT page 13 
/*io.on('connection', function (socket) { 
 console.log('a user connected'); 
 socket.on('disconnect', function () { 
 console.log('user disconnected'); 
 }); */

//Update server.js io.on ('connection') 

// Socket.IO connection and events handling
io.on('connection', function (socket) { 
 console.log('a user connected'); 

 // Handle chat message event from the client
 socket.on('chat message', function (msg) { 
  io.emit('chat message', msg); // Emit the message to all connected clients
  $('#messages').append("<li>"+msg+"</li>"); 
  window.scrollTo(0, document.body.scrollHeight); 
 }); 

// Handle disconnection
 socket.on('disconnect', function () { 
 console.log('user disconnected'); 
 });
}); 

// Start the HTTP server on port 8080
 http.listen(8080, function(){ 
 console.log('listening on *:8080'); 
}); 
