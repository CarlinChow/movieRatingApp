const express = require('express')
const router = express.Router()
const {
    searchMoviesAPI,
    getMovieDetails,
    getRecommendedMovies,
} = require('../controllers/moviesapiController')

//  search movie in movieDB API 
router.get('/search/:query/:page', searchMoviesAPI)

//  find movie details
router.get('/find/:id', getMovieDetails)


router.get('/recommend/:id/:page', getRecommendedMovies)



module.exports = router