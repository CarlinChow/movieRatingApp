const axios = require('axios')

//  @routes:    /api/moviesapi/search/:searchQuery
//  @desc:      searches moviesDB api for movies by search query
//  access:     PUBLIC       
const searchMoviesAPI = async(req, res) => {
    const { query, page } = req.params
    const { data } = await axios(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&query=${query}&language=en-US&page=${page}&include_adult=true`)
    res.status(200).json(data)
}

//  @routes:    /api/moviesapi/find/:id
//  @desc:      searches for movie details of a specific movie
//  access:     PUBLIC
const getMovieDetails = async(req, res) => {
    const id = req.params.id
    const { data } = await axios(`https://api.themoviedb.org/3/movie/${id}?api_key=${process.env.API_KEY}&language=en-US`)
    res.status(200).json(data)
}

//  @routes:    /api/moviesapi/recommend/:id
//  @desc:      gets recommended movies based on a movie
//  access:     PUBLIC
const getRecommendedMovies = async(req, res) => {
    const { id, page } = req.params
    const { data } = await axios(`https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${process.env.API_KEY}&language=en-US&page=${page}`)
    res.status(200).json(data)
}

module.exports = {
    searchMoviesAPI,
    getMovieDetails,
    getRecommendedMovies,
}