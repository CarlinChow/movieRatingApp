const express = require('express')
const router = express.Router()
const {
    searchMoviesAPI,
    getMovieDetails,
    getRecommendedMovies,
    getSimilarMovies,
    getPopularMovies,
    getConfigurations,
} = require('../controllers/moviesapiController')

//  search movie in movieDB API 
router.get('/search/:query/:page', searchMoviesAPI)

//  find movie details
router.get('/find/:id', getMovieDetails)

//  get recommended movies based on a movie
router.get('/recommend/:id/:page', getRecommendedMovies)

//  gets currentl popular movies
router.get('/popular/:page', getPopularMovies)

//  get api configuration
router.get('/config', getConfigurations)



module.exports = router