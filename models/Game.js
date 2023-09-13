const mongoose = require('mongoose');

const Game = new mongoose.Schema({
    email : {
        type : String,
        required : true,
        trim : true,
    } , 
    submittedAt : {
        type : Date,
        default : Date.now()
    }
});

module.exports = mongoose.model('Game', Game);