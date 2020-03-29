const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const express = require('express');
const User = require('../models/user')

const userRouter = express.Router();
userRouter.use(bodyParser.json());

userRouter.route('/')
.get((req,res,next) => {
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
.post((req,res,next) => {

    // req.body.id = Math.floor(Math.random() * 1000000)+100000;
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
.delete((req,res,next) => {
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