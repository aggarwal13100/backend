const User = require('../models/User');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.signUp  = async (req , res) => {
    try {
        const {email , password} = req.body;

        // validation
        if(!email ||!password){
            return res.status(400).json({
                success : false,
                message : "Please provide email and password"
            });
        }

        const userAlreadyExists = await User.findOne({email});

        // User already exists with given Email
        if(userAlreadyExists){
            return res.status(400).json({
                success : false,
                message : "User already exists"
            });
        }

        // hashing the password 
        const rounds = 10;
        let hashedPassword;
        try{
            hashedPassword = await bcrypt.hash(password,rounds);
        } catch(err){
            return res.status(400).json({
                success : false,
                message : "Error in hashing the password",
            })
        }

        // creating the User in Database
        const user = await User.create({
            email,
            password : hashedPassword
        });

        res.status(201).json({
            success : true ,
            message : "User created successfully",
            data : user
        });

    } catch (error) {
        console.log("error in SignUp" , error);
        res.status(400).json({
            success : false,
            message : error.message,
        });
    }
}


exports.logIn  = async (req , res) => {
    try {
        const {email , password} = req.body;

        // validation
        if(!email ||!password){
            return res.status(400).json({
                success : false,
                message : "Please provide email and password"
            });
        }

        const userAlreadyExists = await User.findOne({email});

        // User Not exists with given Email
        if(!userAlreadyExists){
            return res.status(400).json({
                success : false,
                message : "User Not Found"
            });
        }

        // user exists and now check for correct password or password validation
        const hashedPassword = userAlreadyExists.password;
        const isMatched = await bcrypt.compare(password , hashedPassword );
        if(!isMatched) {
            return res.status(403).json({
                success : false ,
                message : "Wrong password" ,
            })
        }

        // creating the jsonWebToken
        const payload = {
            email : userAlreadyExists.email,
            id : userAlreadyExists._id,
            role : userAlreadyExists.role,
        }
        const token = jwt.sign( payload , process.env.JWT_SECRET , { expiresIn : "2h" } );

        // saving token in usr object and removing the password to secure
        userAlreadyExists.password = undefined;
        userAlreadyExists.token = token;

        // options for Cookie
        const options = {
            expires : new Date(Date.now() + 24*60*60*1000),
            httpOnly : true,
        }
        // creating a cookie
        res.cookie("token",token,options).status(200).json({
            success : true,
            token , 
            user : userAlreadyExists, 
            message : "User logged in successfully"
        })


    } catch (error) {
        console.log("error in logIn" , error);
        res.status(400).json({
            success : false,
            message : error.message,
        });
    }
}



exports.logout = async (req, res, next) => {
    try{
        // setting the token to null
        res.cookie("token", null, {
            expires: new Date(Date.now()),
            httpOnly: true
        })
    
        res.status(200).json({
            success: true,
            message: "Logged Out"
        })

    } catch(error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: "Failed to logout"
        })
    }
}