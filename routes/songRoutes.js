const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const express = require('express');
const Artist = require('../models/artist')
const Song = require('../models/song')

const songRouter = express.Router();
songRouter.use(bodyParser.json());

songRouter.route('/')
.get((req,res,next) => {
    Song.find({})
    .then((songs) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json')
        res.json(songs);
    },(err) => {
        next(err)
    })
    .catch((err) => {
        next(err)
    });
})
.post((req,res,next) => {
    req.body.id = Math.floor(Math.random() * 1000000)+100000;
    Song.create(req.body)
    .then((song) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json')
        res.json(song);
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
    Song.remove({})
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

module.exports = songRouter;