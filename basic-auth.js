const userService = require('./userauthservice');
const User = require('./models/user')

module.exports = basicAuth;

async function basicAuth(req, res, next) {

    if ((req.path === '/api/songs' || req.path === '/api/artists') && req.method == 'GET') {
        return next();
    }
    

    // check for basic auth header
    if (!req.headers.authorization || req.headers.authorization.indexOf('Basic ') === -1) {
        return res.status(401).json({ message: 'Missing Authorization Header' });
    }

    // verify auth credentials
    const base64Credentials =  req.headers.authorization.split(' ')[1];
    const credentials = Buffer.from(base64Credentials, 'base64').toString('ascii');
    const [username, password] = credentials.split(':');

    User.findOne({email:username})
    .then((user)=>{
        if(user.password === password){
            user.password = "";
            global.user = user
            req.user = user;
            next();
        }else{
            var err = new Error('You are not Authenticated')
            res.status(401)
            err.status = 401;
            return next(err);
        }
    })
    .catch((err)=>{
        var err = new Error('You are not Authenticated')
        res.status(401)
        err.status = 401;
        return next(err);
    })
}