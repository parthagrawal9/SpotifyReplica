const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const rateSchema = new Schema({
    rate:{
        type: Number,
        min: 1,
        max: 5,
        required:true
    },
    user:{
        type: String,
        required: true
    }
},{
    timestamps: true
});

const songSchema = new Schema({
    id:{
        type: String,
        required: true,
        unique: true
    },
    name:{
        type: String,
        required: true
    },
    dateOfRelease:{
        type: Date
    },
    cover:{
        type: String,
        default: "default.jpg"
    },
    artistList: [String],
    rating: [rateSchema]
},{
    timestamps: true
});

var Songs = mongoose.model('Song',songSchema)
module.exports = Songs;