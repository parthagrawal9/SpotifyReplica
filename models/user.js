const mongoose = require('mongoose');
// const bcrypt = require('bcrypt')
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
    },
    password:{
        type: String,
        required: true
    }
    
},{
    timestamps: true
});

userSchema.statics.hashPassword = function hashPassword(password){
    // return bcrypt.hashSync(password,10);
}

userSchema.methods.isValid = function(hashedPassword){
    // return bcrypt.compareSync(hashedPassword,this.password)
}

var Users = mongoose.model('User',userSchema)
module.exports = Users;