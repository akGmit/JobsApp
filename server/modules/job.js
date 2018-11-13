var mongoose = require('mongoose');

mongoose.connect('mongodb://lab5:a123456@ds137863.mlab.com:37863/lab5');

var Schema = mongoose.Schema;

var JobSchema = new Schema({
    type: String,
    description: String,
    owner: String,
    applicants : [],
    email: String
});

var JobModel = mongoose.model("Jobs", JobSchema);

module.exports = JobModel;