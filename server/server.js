const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const apiRoute = require("./Route/apiRoute")
const loginRoute = require("./Route/loginRoute")
const registerRoute = require("./Route/registerRoute")
const cors = require("cors");

const app = express()
// cors config
app.use(cors());

// dotenv config
require('dotenv').config();

// body-parser config
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

// connect mongodb
mongoose.connect(process.env.DB_URI)
    .then(()=>{console.log("Database Connected!")})
    .catch((err)=>{console.log(err)});

// route
app.use("/api",apiRoute);
app.use("/login",loginRoute);
app.use("/register",registerRoute);

app.use("/",(req, res)=>{
    res.json("Welcome to api server!");
})
app.listen(process.env.PORT||5000, (err)=>{
    console.log(`Your server is running at http://localhost:5000`);
}); 