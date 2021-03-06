import { useGetUpcomingMoviesQuery } from '../../features/movies/moviesApi' 
import { MdOutlineNavigateNext, MdOutlineNavigateBefore } from 'react-icons/md'
import Spinner from '../Spinner'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import useInterval from 'use-interval'
import { BiErrorCircle } from 'react-icons/bi'

const variants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: '0.15',
    }
  },
  exit: {
    opacity: 0,
  }
}

const UpcomingCard = () => {
  const { data, isLoading, isError, error } = useGetUpcomingMoviesQuery()
  const [ movieIndex, setMovieIndex ] = useState(0)
  const [ movie, setMovie ] = useState(null)

  useEffect(()=>{
    if(data){
      setMovie(data[movieIndex])
    }
  },[movieIndex, data])

  // scrolling effect every minute
  useInterval(() =>{
    if(data){
      handleClickNext()
    }
  }, 60000)

  const handleClickNext = () => {
    if(movieIndex === data.length - 1){
      setMovieIndex(0)
      return
    }
    setMovieIndex(movieIndex + 1)
  }

  const handleClickBack = () => {
    if(movieIndex === 0){
      setMovieIndex(data.length - 1)
      return
    }
    setMovieIndex(movieIndex - 1)
  }

  if(isError){
    return (
      <div className='upcoming-card'>
        <div className='error-card'>
          <BiErrorCircle className='icon' />
          <div className='error-msg'>An error has occured: "{error}"</div>
        </div>
      </div>
    )
  }
  if(!movie || isLoading){
    return (
      <div className='upcoming-card'>
        <Spinner />
      </div>
    )
  }
  return (
    <div className='upcoming-card'>
      <AnimatePresence exitBeforeEnter>
        <motion.div
          key={movieIndex}
        >
          <motion.img
            src={(movie.posters.length > 0) ? movie.posters[0] : null}
            alt='image not found'
            variants={variants}
            initial='hidden'
            animate='visible'
            exit='exit'
          />
          <motion.div 
            className='content'
            variants={variants}
            initial='hidden'
            animate='visible'
            exit='exit'
          >
            <div className='header'>Upcoming Movies</div>
            <div className='title'>{movie.movieDetails.title}</div>
            <div className='release-date'>Release Date: {movie.movieDetails.release_date}</div>
          </motion.div>
        </motion.div>
      </AnimatePresence>
      <motion.button 
        className='back-btn'
        whileTap={{scale: 0.9}}
        onClick={handleClickBack}
      >
        <MdOutlineNavigateBefore />
      </motion.button>
      <motion.button 
        className='next-btn'
        whileTap={{scale: 0.9}}
        onClick={handleClickNext}
      >
        <MdOutlineNavigateNext />
      </motion.button>
    </div>
  )
}

export default UpcomingCard