const Movies = require('../models/moviesModel')
const axios = require('axios')

//  @route: GET /api/movies
//  @desc:  get movies from database
//  @access: PUBLIC
const getMovies = async(req, res) => {
    const movies = await Movies.find()
    res.status(200).json(movies)
}

//  @route: POST /api/movies/
//  @body:  contains movie obj
//  @desc:  add a new movie to the database
//  @access: PRIVATE
const postMovie = async(req, res) => {
  const movie = req.body

  // check if movie exists in database already
  const existingMovie = await Movies.findOne({ "movieDetails.id": parseInt(movie.movieDetails.id)})
  if(existingMovie){
    res.status(400)
    throw new Error('Movie already exists in database')
  }
  //  add extra fields before adding to database
  const createdMovie = await Movies.create({
    ...movie,
    videoIndex: 0,
    posterIndex: 0,
    backdropIndex: 0,
    reviews: [],
    ratings: null 
  })
  res.status(200).json({_id: createdMovie._id})
}

//  @route: POST /api/movies/:id
//  @params:  id = movieId  *NOT OBJ ID*
//  @desc:  add a new movie to the database
//  @access: PRIVATE
const postMovieByID = async(req, res) => {
  const movieId = req.params.id

  // check if movie exists in database already
  const movie = await Movies.findOne({ "movieDetails.id": parseInt(movieId)})
  if(movie){
    res.status(400)
    throw new Error('Movie already exists in database')
  }

  //  get movie data, image urls, and video keys from API
  const { data: movieDetails } = await axios(`https://api.themoviedb.org/3/movie/${movieId}?api_key=${process.env.API_KEY}&language=en-US`) 
  const { data: { images: { base_url } } } = await axios(`https://api.themoviedb.org/3/configuration?api_key=${process.env.API_KEY}`)
  const { data: { backdrops, posters }} = await axios(`https://api.themoviedb.org/3/movie/${movieId}/images?api_key=${process.env.API_KEY}&language=en&append_to_response=images&include_image_language=en,null`)
  const { data: { results }} = await axios(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=${process.env.API_KEY}&language=en-US`)

  //  constructing image urls
  const { backdrop_path, poster_path } = movieDetails
  const postersArray = poster_path ? [ base_url.concat('w500', poster_path) ] : []
  const backdropsArray = backdrop_path ? [ base_url.concat('w1280', backdrop_path) ] : []
  
  //  make sure a trailer is position at index 0
  if(results.type && (results[0].type !== 'Trailer')){
    var video = results[0]
    for(let i = 1; i < results.length; i++ ){
      if(results[i].type === 'Trailer'){
        results[0] = results[i]
        results[i] = video
        break
      }
    }
  }

  const newMovie = {
    movieDetails: movieDetails,
    posters: postersArray.concat(posters.filter((item, idx) => idx < 10).map(poster => {
      return base_url.concat('w500', poster.file_path)
    })),
    backdrops: backdropsArray.concat(backdrops.filter((item, idx) => idx < 20).map(backdrop => {
      return base_url.concat('w1280', backdrop.file_path)
    })),
    videos: results.map(video => {
      return {
        title: video.name,
        key: video.key,
      }
    }),
    videoIndex: 0,
    posterIndex: 0,
    backdropIndex: 0,
    reviews: [],
    ratings: null,
  }
  const createdMovie = await Movies.create(newMovie)
  res.status(200).json({_id: createdMovie._id})
}

//  @route: POST /api/movies/:id
//  @params:  id = object id of movie eg.(_id)
//  @desc:  add a review to a movie
//  @access: PRIVATE
const postReview = async(req, res) => {
  if(!req.body || !req.params.id){
    res.status(400)
      throw new Error('Missing fields')
  }
  //  find movie in database
  const { id } = req.params
  const movie = await Movies.findById(id)
  if(!movie){
    res.status(400)
    throw new Error('Could not find movie')
  }
  //  update movie object
  movie.reviews.push(req.body)
  const updatedMovie = await Movies.findByIdAndUpdate(id, movie, {new: true})

  res.status(200).json(updatedMovie)
}

//  @route: GET /api/movies/popular/:page
//  @params:  page = page number
//  @desc:  get popular movies
//  @access: PUBLIC
const getPopularMovies = async(req, res) => {
  const { page } = req.params

  //  getting array of popular movies & image config from API
  const { data } = await axios(`https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}&language=en-US&page=${page}&region=CA`)
  const { data: { images: { base_url } } } = await axios(`https://api.themoviedb.org/3/configuration?api_key=${process.env.API_KEY}`)

  //  constructing array of movie objects with image urls
  const movieArray = await Promise.all(data.results.map( async(item) => {

    // getting movie details and image urls from API 
    const { data: movieDetails } = await axios(`https://api.themoviedb.org/3/movie/${item.id}?api_key=${process.env.API_KEY}&language=en-US`)
    const { data: { backdrops, posters }} = await axios(`https://api.themoviedb.org/3/movie/${item.id}/images?api_key=${process.env.API_KEY}&language=en&append_to_response=images&include_image_language=en,null`)
    const { data: { results }} = await axios(`https://api.themoviedb.org/3/movie/${item.id}/videos?api_key=${process.env.API_KEY}&language=en-US`)

    //  make sure a trailer is position at index 0
    if(results.type && (results[0].type !== 'Trailer')){
      var video = results[0]
      for(let i = 1; i < results.length; i++ ){
        if(results[i].type === 'Trailer'){
          results[0] = results[i]
          results[i] = video
          break
        }
      }
    }
    //  constructing image urls
    const { backdrop_path, poster_path } = movieDetails
    const postersArray = poster_path ? [ base_url.concat('w500', poster_path) ] : []
    const backdropsArray = backdrop_path ? [ base_url.concat('w1280', backdrop_path) ] : []

    return {
      movieDetails: movieDetails,
      posters: postersArray.concat(posters.filter((item, idx) => idx < 10).map(poster => {
        return base_url.concat('w500', poster.file_path)
      })),
      backdrops: backdropsArray.concat(backdrops.filter((item, idx) => idx < 20).map(backdrop => {
        return base_url.concat('w1280', backdrop.file_path)
      })),
      videos: results.map(video => {
        return {
          title: video.name,
          key: video.key,
        }
      }),
    }
  }))
  res.status(200).json(movieArray)
}

//  @route: GET /api/movies/:id/:page
//  @params:  id = id of movie *NOT OBJ ID*
///////////   page = page number
//  @desc:  get reommmended movies based on a movie
//  @access: PUBLIC
const getRecommendedMovies = async(req, res) => {
  const { id, page } = req.params

  //  getting array of reommended movies & image config from API
  const { data } = await axios(`https://api.themoviedb.org/3/movie/${id}/recommendations?api_key=${process.env.API_KEY}&language=en-US&page=${page}`)
  const { data: { images: { base_url } } } = await axios(`https://api.themoviedb.org/3/configuration?api_key=${process.env.API_KEY}`)

  //  constructing array of movie objects with image urls
  const movieArray = await Promise.all(data.results.map( async(item) => {
    // getting movie details and image urls from API 
    const { data: movieDetails } = await axios(`https://api.themoviedb.org/3/movie/${item.id}?api_key=${process.env.API_KEY}&language=en-US`)
    const { data: { backdrops, posters }} = await axios(`https://api.themoviedb.org/3/movie/${item.id}/images?api_key=${process.env.API_KEY}&language=en&append_to_response=images&include_image_language=en,null`)
    const { data: { results }} = await axios(`https://api.themoviedb.org/3/movie/${item.id}/videos?api_key=${process.env.API_KEY}&language=en-US`)

    //  make sure a trailer is position at index 0
    if(results.type && (results[0].type !== 'Trailer')){
      var video = results[0]
      for(let i = 1; i < results.length; i++ ){
        if(results[i].type === 'Trailer'){
          results[0] = results[i]
          results[i] = video
          break
        }
      }
    }
    //  constructing image urls
    const { backdrop_path, poster_path } = movieDetails
    const postersArray = poster_path ? [ base_url.concat('w500', poster_path) ] : []
    const backdropsArray = backdrop_path ? [ base_url.concat('w1280', backdrop_path) ] : []

    return {
      movieDetails: movieDetails,
      posters: postersArray.concat(posters.filter((item, idx) => idx < 10).map(poster => {
        return base_url.concat('w500', poster.file_path)
      })),
      backdrops: backdropsArray.concat(backdrops.filter((item, idx) => idx < 20).map(backdrop => {
        return base_url.concat('w1280', backdrop.file_path)
      })),
      videos: results.map(video => {
        return {
          title: video.name,
          key: video.key,
        }
      }),
    }
  }))
  res.status(200).json(movieArray)
}

//  @route: GET /api/movies/search/:query/:page
//  @params:  query = search query
////////////  page  = page number
//  @desc:  search online for a movie
//  @access: PUBLIC
const getSearchMovies = async(req, res) => {
  const { query, page } = req.params

   //  getting array of movies from the search results & image config from API
  const { data } = await axios(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&query=${query}&language=en-US&page=${page}&include_adult=false`)
  const { data: { images: { base_url } } } = await axios(`https://api.themoviedb.org/3/configuration?api_key=${process.env.API_KEY}`)

  //  constructing array of movie objects with image urls
  const movieArray = await Promise.all(data.results.map( async(item) => {
    // getting movie details and image urls from API 
    const { data: movieDetails } = await axios(`https://api.themoviedb.org/3/movie/${item.id}?api_key=${process.env.API_KEY}&language=en-US`)
    const { data: { backdrops, posters }} = await axios(`https://api.themoviedb.org/3/movie/${item.id}/images?api_key=${process.env.API_KEY}&language=en&append_to_response=images&include_image_language=en,null`)
    const { data: { results }} = await axios(`https://api.themoviedb.org/3/movie/${item.id}/videos?api_key=${process.env.API_KEY}&language=en-US`)

    //  constructing image urls
    const { backdrop_path, poster_path } = movieDetails
    const postersArray = poster_path ? [ base_url.concat('w500', poster_path) ] : []
    const backdropsArray = backdrop_path ? [ base_url.concat('w1280', backdrop_path) ] : []

    //  make sure a trailer is position at index 0
    if(results.type && (results[0].type !== 'Trailer')){
      var video = results[0]
      for(let i = 1; i < results.length; i++ ){
        if(results[i].type === 'Trailer'){
          results[0] = results[i]
          results[i] = video
          break
        }
      }
    }

    return {
      movieDetails: movieDetails,
      posters: postersArray.concat(posters.filter((item, idx) => idx < 10).map(poster => {
        return base_url.concat('w500', poster.file_path)
      })),
      backdrops: backdropsArray.concat(backdrops.filter((item, idx) => idx < 20).map(backdrop => {
        return base_url.concat('w1280', backdrop.file_path)
      })),
      videos: results.map(video => {
        return {
          title: video.name,
          key: video.key,
        }
      }),
    }
  }))
  res.status(200).json(movieArray)
}

//  @route: GET /api/movies/upcoming/:page
//  @params: page  = page number
//  @desc:  get upcoming movies within 2 weeks of release
//  @access: PUBLIC
const getUpcomingMovies = async(req, res) => {
  const { page } = req.params

   //  getting array of movies from the search results & image config from API
  const { data } = await axios(`https://api.themoviedb.org/3/movie/upcoming?api_key=${process.env.API_KEY}&language=en-US&page=${page}&region=US`)
  const { data: { images: { base_url } } } = await axios(`https://api.themoviedb.org/3/configuration?api_key=${process.env.API_KEY}`)

  //  constructing array of movie objects with image urls
  const movieArray = await Promise.all(data.results.map( async(item) => {
    // getting movie details and image urls from API 
    const { data: movieDetails } = await axios(`https://api.themoviedb.org/3/movie/${item.id}?api_key=${process.env.API_KEY}&language=en-US`)
    const { data: { backdrops, posters }} = await axios(`https://api.themoviedb.org/3/movie/${item.id}/images?api_key=${process.env.API_KEY}&language=en&append_to_response=images&include_image_language=en,null`)
    const { data: { results }} = await axios(`https://api.themoviedb.org/3/movie/${item.id}/videos?api_key=${process.env.API_KEY}&language=en-US`)

    //  constructing image urls
    const { backdrop_path, poster_path } = movieDetails
    const postersArray = poster_path ? [ base_url.concat('w500', poster_path) ] : []
    const backdropsArray = backdrop_path ? [ base_url.concat('w1280', backdrop_path) ] : []

    //  make sure a trailer is position at index 0
    if(results.type && (results[0].type !== 'Trailer')){
      var video = results[0]
      for(let i = 1; i < results.length; i++ ){
        if(results[i].type === 'Trailer'){
          results[0] = results[i]
          results[i] = video
          break
        }
      }
    }
    return {
      movieDetails: movieDetails,
      posters: postersArray.concat(posters.filter((item, idx) => idx < 10).map(poster => {
        return base_url.concat('w500', poster.file_path)
      })),
      backdrops: backdropsArray.concat(backdrops.filter((item, idx) => idx < 20).map(backdrop => {
        return base_url.concat('w1280', backdrop.file_path)
      })),
      videos: results.map(video => {
        return {
          title: video.name,
          key: video.key,
        }
      }),
    }
  }))
  res.status(200).json(movieArray)
}

//  @route: GET /api/movies/upcoming/:page
//  @params: page  = page number
//  @desc:  get upcoming movies within 2 weeks of release
//  @access: PUBLIC
const getNowPlayingMovies = async(req, res) => {
  const { page } = req.params

   //  getting array of movies from the search results & image config from API
  const { data } = await axios(`https://api.themoviedb.org/3/movie/now_playing?api_key=${process.env.API_KEY}&language=en-US&page=${page}&region=US`)
  const { data: { images: { base_url } } } = await axios(`https://api.themoviedb.org/3/configuration?api_key=${process.env.API_KEY}`)

  //  constructing array of movie objects with image urls
  const movieArray = await Promise.all(data.results.map( async(item) => {
    // getting movie details and image urls from API 
    const { data: movieDetails } = await axios(`https://api.themoviedb.org/3/movie/${item.id}?api_key=${process.env.API_KEY}&language=en-US`)
    const { data: { backdrops, posters }} = await axios(`https://api.themoviedb.org/3/movie/${item.id}/images?api_key=${process.env.API_KEY}&language=en&append_to_response=images&include_image_language=en,null`)
    const { data: { results }} = await axios(`https://api.themoviedb.org/3/movie/${item.id}/videos?api_key=${process.env.API_KEY}&language=en-US`)

    //  constructing image urls
    const { backdrop_path, poster_path } = movieDetails
    const postersArray = poster_path ? [ base_url.concat('w500', poster_path) ] : []
    const backdropsArray = backdrop_path ? [ base_url.concat('w1280', backdrop_path) ] : []

    //  make sure a trailer is position at index 0
    if(results.type && (results[0].type !== 'Trailer')){
      var video = results[0]
      for(let i = 1; i < results.length; i++ ){
        if(results[i].type === 'Trailer'){
          results[0] = results[i]
          results[i] = video
          break
        }
      }
    }
    return {
      movieDetails: movieDetails,
      posters: postersArray.concat(posters.filter((item, idx) => idx < 10).map(poster => {
        return base_url.concat('w500', poster.file_path)
      })),
      backdrops: backdropsArray.concat(backdrops.filter((item, idx) => idx < 20).map(backdrop => {
        return base_url.concat('w1280', backdrop.file_path)
      })),
      videos: results.map(video => {
        return {
          title: video.name,
          key: video.key,
        }
      }),
    }
  }))
  res.status(200).json(movieArray)
}



const deleteMovie = async(req, res) => {
  const { id } = req.params
  const movie = await Movies.findById(id)
  if(!movie){
    res.status(400)
    throw new Error('movie not found')
  }
  await Movies.findByIdAndDelete(id)
  res.status(200).json({_id: id})
}



module.exports = {
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
}