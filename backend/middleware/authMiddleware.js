const jwt = require('jsonwebtoken')
const User = require('../models/userModel')
require('express-async-errors')

const protect = async(req, res, next) => {
    let token
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        // get token from header
        token = req.headers.authorization.split(' ')[1]

        // get user from token
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = await User.findById(decoded.id).select('-password')

        next()
    }
    if(!token){
        res.status(401)
        throw new Error('Not authorized')
    }
}

module.exports = { protect }
