const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    id:{
        type: String,
        required: true,
        unique: true
    },
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    }
    
},{
    timestamps: true
});

var Users = mongoose.model('User',userSchema)
module.exports = Users;