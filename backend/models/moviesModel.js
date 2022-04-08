const mongoose = require('mongoose')

const reviewSchema = mongoose.Schema({
    rating: {
        type: Number,
        required: true,
    },
    text: String,
    user: {
        _id: mongoose.Schema.Types.ObjectId,
        username: String, 
    }
},{
    timestamp: true
})

const moviesSchema = mongoose.Schema({
    movieId: {
        type: String,
        unique: true,
        required: true,
    },
    movieDetails: {
        type: Object,
        required: true,
    },
    reviews: [reviewSchema],
    ratings: Number,
})

module.exports = mongoose.model('Movies', moviesSchema)