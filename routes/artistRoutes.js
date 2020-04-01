const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const express = require('express');
const Artist = require('../models/artist')

const artistRouter = express.Router();
artistRouter.use(bodyParser.json());

artistRouter.route('/')
.get((req,res,next) => {  //GET METHOD
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
.post((req,res,next) => {  //POST METHOD
    req.body.id = Math.floor(Math.random() * 1000000)+100000;
    // req.body.dob = new Date(req.body.dob)
    console.log(req.body)
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
.delete((req,res,next) => { //DELETE METHOD
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
.get((req,res,next) => { //GET METHOD for particular artist
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
.post((req,res,next) => { //POST METHOD TO ADD NEW SONG OF AN ARTIST
    Artist.findOne({id:req.params.artistId})
    .then((artist) => {
        artist.songList.push(req.body.songId)
        artist.save()
        .then((artist)=>{
            res.statusCode = 200;
            res.setHeader('Content-Type','application/json')
            res.json(artist);
        })
        
    },(err) => {
        next(err)
    })
    .catch((err) => {
        next(err)
    });
})



module.exports = artistRouter;