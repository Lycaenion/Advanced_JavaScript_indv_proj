// Require the express module
const express = require('express');
const fs = require('fs');
// Create a new web server
const app = express();
// Tell the web server to serve files
// from the www folder
app.use(express.static('www'));

// Important: Tell the web server to accept
// post and puts with a JSON body
app.use(express.json({extended: false}));

let Routes = require('./routes.js');

new Routes(app); 

// Start the web server on port 3000
app.listen(3000,() => console.log('Listening on port 3000'));