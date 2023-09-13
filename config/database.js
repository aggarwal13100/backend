const mongoose = require("mongoose");

require("dotenv").config();
const dbConnect = () =>{
    mongoose.connect(process.env.DATABASE_URL,{
        useNewUrlParser : true,
        useUnifiedTopology : true,
    })
    .then(()=>console.log("Connection is Successful"))
    .catch((error)=>{
        console.log("Issue in database connection");
        console.log(error);
        // It disconnect the server
        process.exit(1);
    });
}

module.exports = dbConnect;