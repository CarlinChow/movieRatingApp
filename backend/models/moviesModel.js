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
    timestamps: true
})

const moviesSchema = mongoose.Schema({
    movieDetails: {
        type: Object,
        required: true,
    },
    posters: [String],
    backdrops: [String],
    videos: [{
      title: String,
      key: String,
    }],
    videoIndex: Number,
    posterIndex: Number,
    backdropIndex: Number,
    reviews: [reviewSchema],
    ratings: Number,
}, {
    timestamps: true,
})

module.exports = mongoose.model('Movies', moviesSchema)