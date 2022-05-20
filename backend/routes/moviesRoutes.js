const express = require('express')
const router = express.Router()
const { protect } = require('../middleware/authMiddleware')
const {
    getMovies,
    postMovie,
    postMovieByID,
    postReview, 
    getPopularMovies,
    getRecommendedMovies,
    getSearchMovies,
    getUpcomingMovies,
    getNowPlayingMovies,
    deleteMovie,
} = require('../controllers/moviesController')

// access movies in database 
router.route('/').get(getMovies).post(protect, postMovie)

router.get('/popular/:page', getPopularMovies)

router.get('/recommend/:id/:page', getRecommendedMovies)

router.get('/search/:query/:page', getSearchMovies)

router.get('/upcoming/:page', getUpcomingMovies)

router.get('/nowplaying/:page', getNowPlayingMovies)

router.route('/:id').post(protect, postMovieByID).delete(protect, deleteMovie)

// post review for existing movie
router.route('/review/:id').post(protect, postReview)

module.exports = router