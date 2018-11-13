var express = require('express');
var router = express.Router();
var JobModel = require('../modules/job');
var UserModel = require('../modules/user');
var mailer = require('../mailer');

//------------------------JOBS-------------------------------
//Post job
router.post('/postjob', function(req, res){
    
    var job = new JobModel({type : req.body.type, description: req.body.description, owner: req.body.owner,
                                applicants: req.body.applicants, email: req.body.email});
    
    var createJob = JobModel.create(job);

    createJob.then(function(job){
        res.send(true);
    })
})

//Get user jobs
router.get('/getjob/:ownerID', function(req, res){
    
    var getJobQuery = JobModel.find({owner : req.params.ownerID});

    getJobQuery.exec(function(err, jobs){
        res.send(jobs);
    })
});

//Get all jobs
router.get('/getjob', function(req, res){
    JobModel.find(function(err, jobs){
        res.send(jobs);
    })
})

//Delete job
router.delete('/deletejob/:id', function(req, res){

    var deleteJobQuery = JobModel.deleteOne({_id: req.params.id});

    deleteJobQuery.exec(function(err){
        if(err){
            res.send(false);
        }else{
            res.send(true);
        }
    });
});

//Apply for job
router.post('/applyforjob/:userID', function(req, res, next){

    JobModel.findByIdAndUpdate(req.body._id, { $push: { applicants: req.params.userID } }, function(err, up){
    });
    if(req.body.send === true)
        next();
    res.send(true);
});

//Send email for job owner if required
router.post('/applyforjob/:userID', function(req, res){
    JobModel.findById(req.body._id, function(err, doc){      
        UserModel.findById(req.params.userID, function(err, user){           
            mailer(doc, user);    
        })
    })
});
//Get users applied to jobs
router.get('/jobsappliedfor/:id', function(req, res){
    JobModel.find({applicants: req.params.id}, function(err, doc){
        res.send(doc);
    })
});
//------------------------END JOBS---------------------------

module.exports = router;