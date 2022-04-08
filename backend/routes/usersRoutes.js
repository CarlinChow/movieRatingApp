const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/authMiddleware')

const {
  registerUser,
  loginUser,
  getUserInfo
} = require('../controllers/usersController')


// register a user
router.post('/', registerUser)

// login user
router.post('/login', loginUser)

// get user info
router.get('/me', protect, getUserInfo)


module.exports = router