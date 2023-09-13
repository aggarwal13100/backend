const express = require("express");
const app = express();
const dbConnect = require("./config/database");  
const cookieParser = require("cookie-parser")  ;
const cors = require("cors");
require("dotenv").config();                         // load env content in process.env

const PORT = process.env.PORT || 4000;

dbConnect();                                         // connect to DATABASE  
app.use(cors("*"));
app.use(cookieParser());                             // middleware to parse cookies
app.use(express.json());                            // middleware to parse json request body 

// imports routes
const userRoutes = require("./routes/userRoutes");
const gameRoutes = require("./routes/gameRoutes")

// mount the todo API routes
app.use("/api/v1",userRoutes);
app.use("/api/v1" , gameRoutes);

app.listen(PORT,()=>{
    console.log(`server is listen at port no. ${PORT}`);
});


// default Route
app.get("/",(req,res)=>{
    res.send(`<h1>This is HOMEPAGE friends</h1>`);
})