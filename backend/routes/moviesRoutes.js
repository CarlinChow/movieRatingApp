const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/authMiddleware')
const {
    getMovies,
    postMovie,
    postReview
} = require('../controllers/moviesController')

// access movies in database 
router.route('/').get(getMovies).post(protect, postMovie)

// post review for existing movie
router.route('/:id').post(protect, postReview)

module.exports = router