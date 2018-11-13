var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var jobs = require('./routeModules/jobsRoute');
var accounts = require('./routeModules/accountRoute');

//Here we are configuring express to use body-parser as middle-ware. 
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
    });

//Use express routing for these routes
app.use('/jobs', jobs);
app.use('/account', accounts);

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})