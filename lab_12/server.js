
var express = require('express');
var app = express();
 app.use(express.static('public'))

 app.get('/', function(req, res){
 //res.send("Hello world! by express");
 res.sendFile(__dirname+"/public/form.html")
 });


//route for love in tracks, artists and albums 
app.get('/searchLove', function (req, res) { 
 getTracks('love', res); 
});


//route for searching in tracks, artists and albums 
app.get('/search', function (req, res) { 
 var searchterm = req.query.searchterm; 
 getTracks(searchterm, res); 
}); 


app.get('/topTracks/:artistId', function(req, res){
    var artistId = req.params.artistId;
    getTopTracks(artistId, res)
})



var SpotifyWebApi=require('spotify-web-api-node');
app.use(express.static('public'))

var spotifyApi = new SpotifyWebApi ({

    clientId:'ce49c9b47cec4aa48285ce2e2cda1e60',
    clientSecret:'f12897e53fe0464dbee99217de7968b2'

});


// Retrieve an access token 
spotifyApi.clientCredentialsGrant().then( 
 function (data) { 
 console.log('The access token expires in ' + data.body['expires_in']); 
 console.log('The access token is ' + data.body['access_token']); 
 // Save the access token so that it's used in future calls 
 spotifyApi.setAccessToken(data.body['access_token']); 
 }, 
 function (err) { 
 console.log( 
 'Something went wrong when retrieving an access token', 
 err.message 
 ); 
 } 
); 


async function getTracks(searchterm, res) { 
 spotifyApi.searchTracks(searchterm) 
 .then(function (data) { 
 var tracks = data.body.tracks.items 
 //lets set up a empty string to act as the response 
 var HTMLResponse = ""; 
 //now lets run through all the items 
 //this is a for loop 
 for(var i=0; i<tracks.length;i++){ 
 
 var track = tracks[i]; 
 console.log(track.name); 
 HTMLResponse = HTMLResponse + 
 "<div>" + 
 "<h2>"+track.name+"</h2>"+ 
 "<h4>"+track.artists[0].name+"</h4>"+ 
 "<img src='"+track.album.images[0].url +"'>"+ 
 "<a href='"+track.external_urls.spotify+"'> Track Details </a>"+ 
 "</div>"; 
 console.log(HTMLResponse); 
 } 
 res.send(HTMLResponse) 
 }, function (err) { 
 console.error(err); 
 });
}

// Get top tracks function for a specific artist
async function getTopTracks(artistId, res) {
   spotifyApi.getArtistTopTracks(artistId, 'GB')
       .then(function (data) {
           var tracks = data.body.tracks;
           var HTMLResponse = "<div class='container'>";
           HTMLResponse += "<h1>Top Tracks</h1>";
           HTMLResponse += "<a href='javascript:history.back()' class='btn btn-secondary mb-3'>Back to Search</a>";
           HTMLResponse += "<div class='row'>";

            // Run through all the tracks
           for (var i = 0; i < tracks.length; i++) {
               var track = tracks[i];
               HTMLResponse +=
                   "<div class='col-md-4 mb-4'>" +
                   "<div class='card'>" +
                   "<img src='" + track.album.images[0].url + "' class='card-img-top' alt='" + track.name + "'>" +
                   "<div class='card-body'>" +
                   "<h5 class='card-title'>" + track.name + "</h5>" +
                   "<p class='card-text'>Artist: " + track.artists[0].name + "</p>" +
                   "<a href='" + track.external_urls.spotify + "' class='btn btn-success' target='_blank'>Listen on Spotify</a>" +
                   "</div></div></div>";
           }
           HTMLResponse += "</div></div>";
           res.send(HTMLResponse);
       }, function (err) {
           console.log('Something went wrong!', err);
           res.send("<div class='container'><div class='alert alert-danger'>Error getting top tracks: " + err.message + "</div></div>");
       });
}




app.listen(8080);