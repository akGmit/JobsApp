var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');


//Mongo db connection
var mongoose = require('mongoose');
var mongooseUserDb = require('mongoose');

//User application db
mongoose.connect('mongodb://lab5:a123456@ds137863.mlab.com:37863/lab5');
//User login DB
mongooseUserDb.connect('mongodb://lab5:a123456@ds137863.mlab.com:37863/lab5');






//Mongoose post scheme
var Schema = mongoose.Schema;

var PostSchema = new Schema({
    title: String,
    content: String
});
//Schema for user db
var UserSchema = new Schema({
    id: String,
    username: String,
    password: String,
    firstname: String,
    lastname: String,
    tel: String,
    email: String,
    address: 
        {street: String,
        city: String,
        county: String,
    },
    experience: String,
    bio: String
});

var JobSchema = new Schema({
    type: String,
    description: String,
    owner: String,
    applicants : []
});

// Compile model from schema
var PostModel = mongoose.model('PostModel', PostSchema );
var UserModel = mongooseUserDb.model("Users", UserSchema);
var JobModel = mongoose.model("Jobs", JobSchema);

//Here we are configuring express to use body-parser as middle-ware. 
app.use(bodyParser.urlencoded({ extended: false })); 
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header('Access-Control-Allow-Methods', 'PUT, POST, GET, DELETE, OPTIONS');
    next();
    });

//--------------------------LOGIN-------------------------------------------     
app.post('/login', function(req, res){
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
app.post('/newuser', function(req, res, next){
    
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
app.post('/newuser', function(req, res){

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
app.put('/application/:id', function(req, res){
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

//------------------------JOBS-------------------------------
//Post job
app.post('/postjob', function(req, res){
    var job = new JobModel({type : req.body.type, description: req.body.description, owner: req.body.owner,
                                applicants: req.body.applicants});
    
    var createJob = JobModel.create(job);

    createJob.then(function(job){
        res.send(true);
    })
})

//Get user jobs
app.get('/getjob/:ownerID', function(req, res){
    var ownerID = req.params.ownerID;

    var getJobQuery = JobModel.find({owner : ownerID});

    getJobQuery.exec(function(err, jobs){
        res.send(jobs);
    })
});

//Get all jobs
app.get('/getjob', function(req, res){
    JobModel.find(function(err, jobs){
        res.send(jobs);
    })
})

//Delete job
app.delete('/deletejob/:id', function(req, res){

    var jobID = req.params.id;


    var deleteJobQuery = JobModel.deleteOne({_id: jobID});

    deleteJobQuery.exec(function(err){
        if(err){
            res.send(false);
        }else{
            res.send(true);
        }
    });
});

//Apply for job
app.put('/applyforjob/:userID', function(req, res){
    var userID = req.params.userID;
    var jobID = req.body._id;

    JobModel.findByIdAndUpdate(jobID, { $push: { applicants: userID } }, function(err, up){
    });
})

app.get('/jobsappliedfor/:id', function(req, res){
    JobModel.find({applicants: req.params.id}, function(err, doc){
        console.log(err);
        console.log(doc);
        res.send(doc);
    })
})

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})