import { useGetPopularMoviesQuery } from '../../features/movies/moviesApi'
import Spinner from '../Spinner'
import { useState, useEffect } from 'react'
import Indexer from '../Indexer'
import { motion, AnimatePresence } from 'framer-motion'

const PopularCard = () => {
  const { data, isSuccess, isError, error, isLoading } = useGetPopularMoviesQuery()
  const [ movieIndex, setMovieIndex ] = useState(0) 
  const [ movie, setMovie ] = useState(null)

  useEffect(()=> {
    if(data){
      setMovie(data[movieIndex])
    }
  },[movieIndex, data])

  if(isError){
    return(
      <div className='popular-card'>
        {error}
      </div>
    )
  }
  if(!movie || isLoading){
    return <Spinner />
  }
  return (
      <div 
        className='popular-card'
        style={{ backgroundImage: `url(${movie.backdrops[0]})`}}
      >
        <div className='title'>Popular Right Now</div>
        <AnimatePresence exitBeforeEnter>
          <motion.div
            className='poster-container'
            key={movieIndex}>
            <motion.img 
              src={movie.posters[0]}
              initial={{opacity: 0}}
              animate={{opacity: 1}}
              exit={{opacity: 0}}
            />
          </motion.div>
        </AnimatePresence>
        <Indexer length={data.length} index={movieIndex} setIndex={setMovieIndex}/>
        <motion.div 
          className='movie-title'
          key={movieIndex}
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          exit={{opacity: 0}}
        >
          {movie.movieDetails.title}
        </motion.div>
      </div>
  )
}

export default PopularCard