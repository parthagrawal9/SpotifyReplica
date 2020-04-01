const bodyParser = require('body-parser');
const express = require('express');
const User = require('../models/user')

const userRouter = express.Router();
userRouter.use(bodyParser.json());

userRouter.route('/')
.get((req,res,next) => {  //GET METHOD
    console.log(req.headers);
    User.find({})
    .then((users) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json')
        res.json(users);
    },(err) => {
        next(err)
    })
    .catch((err) => {
        next(err)
    });
})
.post((req,res,next) => { //POST METHOD
    req.body.id = Math.floor(Math.random() * 1000000)+100000; //GENERATING ID
    // req.body.password = User.hashPassword(req.body.password) //BCRYPT ENCRYPTION
    User.create(req.body)
    .then((user) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json')
        res.json(user);
    },(err) => {
        next(err)
    })
    .catch((err) => {
        next(err)
    });
})
.put((req,res,next) => {

})
.delete((req,res,next) => { //DELETE METHOD
    User.remove({})
    .then((result)=>{
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json')
        res.json(result);
    },(err) => {
        next(err)
    })
    .catch((err) => {
        next(err)
    });
});


module.exports = userRouter;

