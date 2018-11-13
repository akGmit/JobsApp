var nodemailer = require('nodemailer');

var mainMailer = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'jobsappemailer@gmail.com',
      pass: 'jobsapp123456'
    }
});

var createMail = function(job, applicantData){
    var mail = {
        from: 'jobsappemailer@gmail.com',
        to: job.email,
        subject: 'Someone applied for the ' + job.type + " job!",
        text: applicantData.firstname + " " + applicantData.lastname +"\n"+
            applicantData.experience + "\n"+
            applicantData.bio
        };
    return mail;
};

module.exports = function(job, data){
    var mail = createMail(job, data);
    
    mainMailer.sendMail(mail, function(err, info){
        if (err) {
            console.log(err);
        } else {
            console.log('Email sent: ' + mail.to + " " + info.response);
        }
    })
};

