
var express = require('express'); 
var app = express(); 

//Route 1
app.get('/', function(req, res){ 
 res.send("Hello world! by express");
});


//Route 2
app.get('/test', function(req, res){ 
    res.send("this is route 2"); 
   });
   
//query parameters
app.get('/add', function(req, res){ 
    var x = parseInt(req.query.x); 
    var y = parseInt(req.query.y); 
     res.send("X + Y="+(x+y)); 
    }); 

    //Route calc

    app.get('/calc', function(req, res){ 
    var x = parseFloat(req.query.x); 
    var y = parseFloat(req.query.y);  
    var operator = req.query.operator;

    // Check if x and y are valid numbers
    if (isNaN(x) || isNaN(y)) {
        return res.send("Error: Please provide valid numbers for x and y.");
    }

    let result;
    switch (operator) {
        case "add":
            result = x + y;
            break;
        case "sub":
            result = x - y;
            break;
        case "mul":
            result = x * y;
            break;
        case "div":
            if (y === 0) {
                return res.send("Error: Division by zero is not allowed.");
            }
            result = x / y;
            break;
        default:
            return res.send("Error: Invalid operator. Use add, sub, mul, or div.");
    }

    res.send(`Result: ${result}`);
});



    
app.get('/getform', function(req, res){ 
var name = req.query.name; 
var quest = req.query.quest; 
 res.send("Hi "+name+" I am sure you will "+quest); 
});


// to create a new route for a post request
app.post('/postform', function(req, res){ 
var name = req.body.name; 
var quest = req.body.quest; 
 res.send("Hi "+name+" I am sure you will "+quest) ; 
});



app.use(express.static('public')) 

// parse the form data to be readable
app.use(express.urlencoded({extended:true}))   

app.listen(8080);



app.get('/', function(req, res){ 
    res.send("Hello world! by express"); 
   }); 

app.listen(8080);

