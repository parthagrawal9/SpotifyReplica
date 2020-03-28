const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const artistSchema = new Schema({
    id:{
        type: String,
        required: true,
        unique: true
    },
    name:{
        type: String,
        required: true
    },
    dob:{
        type: Date
    },
    bio:{
        type: String
    },
    songList: [String]
},{
    timestamps: true
});

var Artists = mongoose.model('Artist',artistSchema)
module.exports = Artists;