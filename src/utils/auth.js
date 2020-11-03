const LocalStrategy = require("passport-local");
const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const passport = require("passport");
const jwt = require("jsonwebtoken")


const auth = require("express-basic-auth")
const User = require("../models/users")
const atob = require("atob")

const dotenv = require("dotenv")
dotenv.config()

passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())



passport.use(new LocalStrategy(User.authenticate()))

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken,
    secretOrKey: process.env.TOKEN_PASSWORD
}

passport.use(new JwtStrategy(jwtOptions, (jwtPayload, cb) => {
    User.findById(jwtPayload._id, (err, user) => {
        if (err) return cb(err, false)
        else if (user) return cb(null, user)
        else return cb(null, false)
    })
}))



module.exports = {
    getToken: (user) => jwt.sign(user, jwtOptions.secretOrKey, { expiresIn: 3600})
}

/* checkInMongoose = async (username, password, next) => {
    const authResult = await User.authenticate()(username, password)
    return next(null, authResult.user)
}
module.exports = {
    basic: auth({
        authorizer: checkInMongoose,
        authorizeAsync: true,
    }),
    setUserInfo: async (req, res, next) =>{
        const username = atob(req.headers.authorization.split(" ")[1]).split(":")[0]
        req.user = await User.findOne({ username: username});
        next()
    },
    adminOnly: async (req, res, next) =>{
        
        const username = atob(req.headers.authorization.split(" ")[1]).split(":")[0]
        
        const user = await User.findOne({ username: username})
        if (user.role === "superadmin" && "admin") 
            next()
        else 
            res.status(401).send("You don't have access to this page")
    }
} */