const MongoClient = require('mongodb-legacy').MongoClient;
const url = 'mongodb://127.0.0.1:27017';
const client = new MongoClient(url);
const dbname = 'star_wars_quotes';
//code to link to the express module
const express = require('express');
const app = express();
//code to define the public 
app.use(express.static('public'))
//
app.use(express.urlencoded({extended:true}))

var db;
//run the connect method.
connectDB();
async function connectDB() {
 // Use connect method to connect to the server
 await client.connect();
 console.log('Connected successfully to server');
 db = client.db(dbname);
 //everything is good lets start
 app.listen(8080);
 console.log('8080 is the magic port');
}

// server.js
// load the things we need
// var express = require('express');
// var app = express();
// set the view engine to ejs
app.set('view engine', 'ejs');
// use res.render to load up an ejs view file

//Comment out your current '/' route in server.js and replace it with this new one. 

// // index page 
//app.get('/', function(req, res) {
 //res.render('pages/index');
//});

// index page 
app.get('/', function(req, res) {
    db.collection('quotes').find().toArray(function(err, result) {
        if (err) throw err;
        var drinks = [
            { name: 'Bloody Mary', drunkness: 3 },
            { name: 'Martini', drunkness: 5 },
            { name: 'Scotch', drunkness: 10 }
        ];
        var tagline = "Any code of your own that you haven\'t looked at for six or more months might as well have been written by someone else.";
        res.render('pages/index', {
            drinks: drinks,
            tagline: tagline,
            quotes: result
        });
    });
});


// about page 
app.get('/about', function(req, res) {
 res.render('pages/about');
});


//add page
app.get('/add', function(req, res) {
    res.render('pages/add');
});

//add page
app.get('/delete', function(req, res) {
    res.render('pages/delete');
});

//add page
app.get('/filter', function(req, res) {
    res.render('pages/filter');
});

//add page
app.get('/update', function(req, res) {
    res.render('pages/update');
});

// app.listen(8080);
