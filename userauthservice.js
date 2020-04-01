
const User = require('./models/user')

async function authenticate({ username, password }) {
    User.findOne({email:username})
    .then((user)=>{
        if(user.password === password){
            return user;
        }
    })
    .catch((err)=>{
        var err = new Error('You are not Authenticated')
        err.status = 401;
        return err;
    })
}

module.exports = {
    authenticate
};