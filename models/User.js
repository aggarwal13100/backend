const mongoose = require('mongoose');

const User = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        trim : true,
    } , 
    password : {
        type : String,
        required : true,
        trim : true,
    } , 
    lastSubmission : {
        type : Date
    } 
});

module.exports = mongoose.model('User', User);