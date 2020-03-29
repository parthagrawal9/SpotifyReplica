const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const express = require('express');
const Artist = require('../models/artist')

const artistRouter = express.Router();
artistRouter.use(bodyParser.json());

artistRouter.route('/')
.get((req,res,next) => {
    Artist.find({})
    .then((artists) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json')
        res.json(artists);
    },(err) => {
        next(err)
    })
    .catch((err) => {
        next(err)
    });
})
.post((req,res,next) => {
    req.body.id = Math.floor(Math.random() * 1000000)+100000;
    Artist.create(req.body)
    .then((artist) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json')
        res.json(artist);
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
    Artist.remove({})
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

artistRouter.route('/:artistId')
.get((req,res,next) => {
    Artist.find({id:req.params.artistId})
    .then((artists) => {
        res.statusCode = 200;
        res.setHeader('Content-Type','application/json')
        res.json(artists);
    },(err) => {
        next(err)
    })
    .catch((err) => {
        next(err)
    });
})

module.exports = artistRouter;