var express = require('express');
var router = express.Router();
var UserModel = require('../modules/user');

//--------------------------LOGIN-------------------------------------------     
router.post('/login', function(req, res){
    //Mongoose query to find user with specified login details 
    var query = UserModel.findOne({username: req.body.username, password: req.body.password});
    
    //Execute query
    //Check query result  
    //If reuturn object not null, username and password valid, send user object as response
    //If object returned from query is null, data is incorrect, send null response
    query.exec(function(err, user){
        if(user != null){
            res.status(200).send(user);
        }else if(user === null){
            res.send(null);
        }
    })
});
//--------------------------END LOGIN-------------------------------------------

////--------------NEW USER---------------------
//New username, with middleware functions to check if username is available
router.post('/newuser', function(req, res, next){
    
    //Query to find username
    var usernameTakenQuery = UserModel.findOne({username : req.body.username});
    
    //Execute query 
    //If username doesnt exist, go to next middleware function
    //If username is taken, send response
    usernameTakenQuery.exec(function(err, user){
        if(user === null){
            next();
        }else{
            res.send({"usernameTaken" : true});
        }
    })
})

//Function to create new user if username is available
router.post('/newuser', function(req, res){

    //New user model 
    var newUsr = new UserModel({username: req.body.username, password: req.body.password,
        firstname: req.body.firstname, lastname: req.body.lastname});
    var newUserPromise = UserModel.create(newUsr);
    
    //Execute new user promise with call back function
    //Send new user as response
    newUserPromise.then(function(newUser){      
            res.send(newUser);
    })
});
////--------------END NEW USER---------------------

//----------------------APPLICATION-----------------------
router.put('/application/:id', function(req, res){
    //Get app details from request body
    var app = {tel: req.body.tel, email: req.body.email, address: req.body.address, experience: req.body.experience,
                    bio: req.body.bio};

    //Query to find and update document by id
    var updateApplication = UserModel.findByIdAndUpdate(req.params.id, app);
    
    //Execute query
    updateApplication.exec(function(err, app){
        if(app != null){
            res.send(true);
        }
    })
})
//----------------------END APPLICATION-----------------------

module.exports = router;