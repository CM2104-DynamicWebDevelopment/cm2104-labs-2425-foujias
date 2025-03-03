
var express = require('express');
var app = express();
 app.use(express.static('public'))
 app.get('/', function(req, res){
 res.send("Hello world! by express");
 });



var SpotifyWebApi=require('spotify-web-api-node');
app.use(express.static('public'))

var spotifyApi = new SpotifyWebApi ({
    clientId:'ce49c9b47cec4aa48285ce2e2cda1e60'
    clientSecret:'f12897e53fe0464dbee99217de7968b2'

});


app.listen(8080);