
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


// Route to fetch related artists for a given artist ID
app.get('/relatedArtists/:artistId', function(req, res) {
    // Extract the artistId from the request parameters
    var artistId = req.params.artistId;
    
    // Call the getRelated function to retrieve and send related artists
    getRelated(artistId, res);
});



// Route to search for tracks using a query parameter
app.get('/searchAPI', function (req, res) {
    // Extract the search term from the query string (?searchterm=...)
    var searchterm = req.query.searchterm;
    
    // Call the getTracks function to fetch track data from Spotify
    getTracks(searchterm, res);
});




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



async function getRelated(artistId, res) {
    // Call the Spotify API to get related artists
    spotifyApi.getArtistRelatedArtists(artistId)
        .then(function (data) {
            var artists = data.body.artists; // Extract related artists from the response
            
            // Start building the HTML response
            var HTMLResponse = "<div class='container'>";
            HTMLResponse += "<h1>Related Artists</h1>";
            HTMLResponse += "<a href='javascript:history.back()' class='btn btn-secondary mb-3'>Back to Search</a>";
            HTMLResponse += "<div class='row'>";

            // Loop through each related artist and add their details to the HTML response
            for (var i = 0; i < artists.length; i++) {
                var artist = artists[i];

                HTMLResponse +=
                    "<div class='col-md-4 mb-4'>" +
                    "<div class='card'>" +
                    // Check if the artist has an image, otherwise use a placeholder
                    "<img src='" + (artist.images.length > 0 ? artist.images[0].url : 'https://via.placeholder.com/150') + 
                    "' class='card-img-top' alt='" + artist.name + "'>" +
                    "<div class='card-body'>" +
                    "<h5 class='card-title'>" + artist.name + "</h5>" +
                    // Display the number of followers, formatted with commas
                    "<p class='card-text'>Followers: " + artist.followers.total.toLocaleString() + "</p>" +
                    // Link to the artist's Spotify page
                    "<a href='" + artist.external_urls.spotify + "' class='btn btn-success' target='_blank'>View on Spotify</a>" +
                    "</div></div></div>";
            }

            HTMLResponse += "</div></div>"; // Close the row and container divs
            res.send(HTMLResponse); // Send the HTML response to the client
        })
        .catch(function (err) {
            console.log('Something went wrong!', err);
            // Send a user-friendly error message to the client
            res.send("<div class='container'><div class='alert alert-danger'>Error fetching related artists: " + err.message + "</div></div>");
        });
}



async function getTracksAPI(searchterm, res) { 
 spotifyApi.searchTracks(searchterm) 
 .then(function (data) { 
 //first lets get the tracks. 
 //these are stored in the 
 //JSON under an array called Items 
 var tracks = data.body.tracks.items 
 //lets set up a empty json array 
//to act as the response 
 var JSONResponse = []; 
 //now lets run through all the items 
 //this is a for loop 
//(you could use a for each loop if you like.) 
 for(var i=0; i<tracks.length;i++) 
 { 
 var track = tracks[i]; 
//here we push the details we need about 
//this track to the array 
 JSONResponse.push( 
 { 
 trackname:track.name, 
 artist:track.artists[0].name, 
 image:track.album.images[0].url, 
 url:track.external_urls.spotify, 
 } 
 ); 
 } 
 res.send(JSONResponse) 
 }, function (err) { 
 console.error(err); 
 }); 
} 








app.listen(8080);