const Game = require('../models/Game');

// sentence hardcoded
const sentence = "We design and develop applications that run the world and showcase the future";

exports.getSentence = async (req , res ) => {
    try{
        res.status(201).json({
            success : true,
            sentence : sentence,
            user : req.user,
        })
    } catch(error) {
        console.log(error);
        res.status(400).json({
            success : false,
            error : error.message
        })
    }
}

exports.doesWon = async (req ,res) => {
    try{
        const {timeTaken , score } = req.body;
        const {email} = req.user;
        
        // Time taken by user is more than 3 minutes or submission by user is wrong
        if(Number(timeTaken) > 3 || score === "0") {
            return res.status(201).json({
                success : true,
                Won : false ,
                message : "Either time taken is too long or wrong Answer"
            })
        }
        
        // Check if user has already wonned in last hour
        // current Time
        const currentTime = Date.now();
        // Recent Wins (submission after the 1 hour)
        const recentWins = await Game.find({ submittedAt: { $gt: currentTime - 3600000 } });

        
        if(recentWins.length !== 0) {           // no submission
            // more than 1 recent submission
            if(recentWins.length > 1) {
                return res.status(201).json({
                    success : true,
                    Won : false,
                    message : "Two Players Already wonned in last hour"
                })
            }
            // only one recent submission
            if(recentWins[0].email === email) {
                return res.status(201).json({
                    success : true,
                    Won : false,
                    message : "You have already Played Recently and Won"
                })
            }
        }

        // Create Game
        const game = await Game.create({
            email , 
            submittedAt : Date.now()
        })

        res.status(201).json({
            success : true,
            won : true ,
            message : "You have Won",
            game : game
        })
    } catch(error) {
        console.log(error);
        res.status(400).json({
            success : false,
            error : error.message
        })
    }
}