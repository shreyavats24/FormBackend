const express = require("express");
const app = express();
require('dotenv').config();
const path = require("path");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const routes = require("./routes/formRouter");
const PORT = process.env.PORT || 7000;

//Middlewares 
app.use(cors({
    // add this in env 
    origin:"http://localhost:5173",
    methods:["GET","POST","PUT","DELETE"],
    credentials:true
}))
// explain the use of this 

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(express.static(path.join(__dirname, 'public')));
app.use(routes);


// server listens
app.listen(PORT,(err)=>{
    if(err)
        console.log("Error Connecting Server :",err);
    else
        console.log(`Server is Connected at ${PORT}`)
})