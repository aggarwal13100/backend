const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.auth = (req,res,next) => {
    try{
        const token = req.cookies.token ;

        // if token is missing
        if(!token || token===undefined) {
            return res.status(401).json({
                success : false ,
                message : "Token is Missing"
            })
        }
        try{
            // decoding the token
            const payload = jwt.verify(token , process.env.JWT_SECRET);
            req.user = payload;
            
        } catch (err) {
            return res.status(401).json({
                success : false,
                message : "token is not valid"
            })
        }
        next();
        
    } catch (err) {
        console.log(err);
        return res.status(401).json({
            success : false ,
            message  : "Something went wrong, while authenticating"
        })
    }
}