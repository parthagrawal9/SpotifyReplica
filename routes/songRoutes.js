const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const express = require('express');
const Song = require('../models/song')
const multer = require('multer')

const songRouter = express.Router();
songRouter.use(bodyParser.json());

const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, 'assets/song_cover')
    },
    filename: (req, file, callBack) => {
        callBack(null, `${file.originalname}`)
    }
})
const upload = multer({ storage: storage })

songRouter.post('/cover', upload.single('file'), (req, res, next) => {
    const file = req.file;
    console.log(file.filename);
    if (!file) {
      const error = new Error('No File')
      error.httpStatusCode = 400
      return next(error)
    }
    res.send(file);
})

songRouter.route('/')
.get((req,res,next) => {
    console.log(req.headers);
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
.put((req,res,next) => {})
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

songRouter.route('/:songId/rating')
.post((req,res,next) => {
    Song.findOne({id:req.params.songId})
    .then((song)=>{
        if(song!=null){
            console.log(song)
            song.rating.push(req.body);
            song.save().then((song)=>{
                res.statusCode = 200;
                res.setHeader('Content-Type','application/json')
                res.json(song)
            })
        }else{
            (err)=>next(err)
        }  
    },(err)=>next(err))
    .catch((err)=>next(err))
})
.put((req,res,next) => {
    Song.findOne({id:req.params.songId})
    .then((song)=>{
        if(song!=null){
            for (let i = 0; i < song.rating.length; i++) {
                if(song.rating[i].user == req.body.user){
                    song.rating[i].rate = req.body.rate;
                    break;
                }
            }
            song.save().then((song)=>{
                res.statusCode = 200;
                res.setHeader('Content-Type','application/json')
                res.json(song)
            })
        }else{
            (err)=>next(err)
        }  
    },(err)=>next(err))
    .catch((err)=>next(err))
})

module.exports = songRouter;
