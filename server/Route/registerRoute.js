const Account = require("../Model/Account");
const route = require('express').Router();
const jwt = require('jsonwebtoken');
require("dotenv").config();

async function findUser(user) {
    const data = await Account.findOne({username:user.username});
    return data;
}

async function createNewUser(user) {
    const data = new Account(user);
    console.log(data);
    await data.save();
}

route.post('/',(req, res)=>{
    const username = req.body.username;
    const password = req.body.password;
    findUser({username,password})
    .then(data=>{
        if(data) {  /// user exited
            return res.json({message:"username existed!"})
        }
        createNewUser({username,password});
        res.json({message:"created a new user!"});
    })
})

route.get('/',(req, res)=>{
    res.json("register data");
})

module.exports = route;
