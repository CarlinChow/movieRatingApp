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
    movieDetails: {
        type: Object,
        required: true,
    },
    reviews: [reviewSchema],
    ratings: Number,
}, {
    timestamp: true,
})

module.exports = mongoose.model('Movies', moviesSchema)