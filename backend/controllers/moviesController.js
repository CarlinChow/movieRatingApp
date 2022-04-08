const Movies = require('../models/moviesModel')


//  @route: GET /api/movies
//  @desc:  get movies from database
//  @access: PUBLIC
const getMovies = async(req, res) => {
    const movies = await ovies.find()
    res.status(200).json(movies)
}

//  @route: POST /api/movies
//  @desc:  add a new movie to the database
//  @access: PRIVATE
const postMovie = async(req, res) => {
    if(!req.body){
        res.status(400)
        throw new Error('Missing data')
    }

    const movie = await Movies.findOne({movieId: req.body.movieId})
    if(movie){
        res.status(400)
        throw new Error('Movie already exists in database')
    }

    const newMovie = await Movies.create(req.body)
    res.status(200).json({movieId: newMovie.movieId})
}

//  @route: POST /api/movies/:id
//  @desc:  add a review to a movie
//  @access: PRIVATE
const postReview = async(req, res) => {
    if(!req.body || !req.params.id){
        res.status(400)
        throw new Error('Missing data')
    }
    const id = req.params.id
    const movie = await Movies.findById(id)
    if(!movie){
        res.status(400)
        throw new Error('Could not find movie')
    }
    const updatedMovie = {
        ...updatedMovie,
        reviews: [...updatedMovie.reviews, req.body]
    }

}



module.exports = {
    getMovies,
    postMovie,
    postReview,
}