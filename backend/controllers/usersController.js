const User = require('../models/userModel')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
require('express-async-errors')

//  @route: POST /api/users/
//  @desc: register user into database, and return a web token
//  @access: PUBLIC
const registerUser = async(req, res) => {
  const {username, password, email} = req.body
  if(!username || !password || !email){
    res.status(400)
    throw new Error('Please include all fields!')
  }

  // check if user exists
  const duplicateEmail = await User.findOne({ email })
  if(duplicateEmail){
    res.status(400)
    throw new Error('Email address already in use')
  }

  const duplicateUsername = await User.findOne({ username })
  if(duplicateUsername){
    res.status(400)
    throw new Error('Username already taken')
  }

  // hash password
  const saltRounds = 10
  const hashedPassword = await bcrypt.hash(password, saltRounds)
  const newUser = await User.create({
    username: username,
    password: hashedPassword,
    email: email,
  })


  if(newUser){
    res.status(200).json({
      _id: newUser._id,
      username: newUser.username,
      email: newUser.email,
      token: jwt.sign({id: newUser._id}, process.env.JWT_SECRET, { expiresIn: "30d", })
    })
  }else{
    res.status(400)
    throw new Error('Invalid User data')
  }
} 

//  @route: POST /api/users/login
//  @desc: authenticate and log in user
//  @access: PUBLIC
const loginUser = async(req, res) => {
  const { username, password } = req.body
  
  const user = await User.findOne({ username })

  if(user && (await bcrypt.compare(password, user.password))){
    res.status(200).json({
      _id: user._id,
      email: user.email,
      username: user.username,
      token: jwt.sign({id: user._id}, process.env.JWT_SECRET)
    })
  } else{
    res.status(400)
    throw new Error('invalid credentials')
  }
}

//  @route: GET /api/users/me
//  @desc: return user data
//  @access: PUBLIC
const getUserInfo = async(req, res) => {
  res.status(200).json(req.user)
}

module.exports = {
  registerUser,
  loginUser,
  getUserInfo,
}