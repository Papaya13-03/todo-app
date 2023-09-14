const Account = require("../Model/Account");
const route = require('express').Router();
const jwt = require('jsonwebtoken');
require("dotenv").config();

async function findUser(user) {
    const data = await Account.findOne(user);
    if(data) {
        const token = jwt.sign({_id:data._id},process.env.JWT_SECRET_KEY);
        return ({
            message:"Valid user!",
            token
        })
    }
    else {
        return ({message:"Invalid user!"})
    }
}

route.post('/',(req, res)=>{
    const username = req.body.username;
    const password = req.body.password;
    console.log(username + " " + password);
    findUser({username,password})
        .then(data=>{
            return res.json(data);
        })
})

route.get('/',(req, res)=>{
    res.json("Login data");
})

module.exports = route;