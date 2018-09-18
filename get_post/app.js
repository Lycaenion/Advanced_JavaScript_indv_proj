// Require the express module
const express = require('express');
// Create a new web server
const app = express();

// Allow express to access our html(index.html) file
app.get('/www/index.html', function(req, res){
    res.sendFile(__dirname + "/www/" + "index.html");
});

// route the GET request to the specified path, "/user"
// This sends the user information to the path
app.get('/user', function(req, res){
    response = {
        first_name : req.query.first_name,
        last_name : req.query.last_name,
        gender : req.query.gender
    };

    //this line is optional 
    console.log(response);

    res.end(JSON.stringify(response));
});

// Tell the web server to serve files
// from the www folder
app.use(express.static('www'));
// Start the web server on port 3000
app.listen(3000,() => console.log('Listening on port 3000'));