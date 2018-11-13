var mongoose = require('mongoose');

mongoose.connect('mongodb://lab5:a123456@ds137863.mlab.com:37863/lab5');

var Schema = mongoose.Schema;

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

var UserModel = mongoose.model("Users", UserSchema);

module.exports = UserModel;

