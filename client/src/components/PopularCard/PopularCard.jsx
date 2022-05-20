import { useGetPopularMoviesQuery, useGetNowPlayingMoviesQuery } from '../../features/movies/moviesApi'
import Spinner from '../Spinner'
import { useState, useEffect } from 'react'
import Indexer from '../Indexer'
import { motion, AnimatePresence } from 'framer-motion'
import useInterval from 'use-interval'
import { AiFillCaretDown, AiFillCaretLeft } from 'react-icons/ai'
import { BiErrorCircle } from 'react-icons/bi'

const PopularCard = () => {
  const popularMovies = useGetPopularMoviesQuery()
  const nowPlayingMovies = useGetNowPlayingMoviesQuery()
  const [ isPopular, setIsPopular ] = useState(true)
  const [ isOpen, setIsOpen ] = useState(false)
  const [ movieIndex, setMovieIndex ] = useState(0) 
  const [ movie, setMovie ] = useState(null)
  const { data, isLoading, isError, error } = isPopular ? popularMovies : nowPlayingMovies

  const handleOnClick = () => {
    setIsOpen(false)
    setIsPopular(!isPopular)
    setMovieIndex(0)
  }

  useEffect(()=> {
    if(data){
      setMovie(data[movieIndex])
    }
  },[movieIndex, data])

  useInterval(()=>{
    if(data && movieIndex === data.length - 1){
      setMovieIndex(0)
      return
    }
    setMovieIndex(movieIndex + 1)
  }, 30000)

  if(isError){
    return(
      <div className='popular-card'>
        <div className='error-card'>
          <BiErrorCircle className='icon'/>
          <div className='error-msg'>An error has occured: "{error}"</div>
        </div>
      </div>
    )
  }
  if(!movie || isLoading){
    return (
      <div className='popular-card'>
        <div className='loading-card'>
          <Spinner />
        </div>
      </div>
      )
  }
  return (
      <motion.div 
        className='popular-card'
        key={isPopular}
        initial={{opacity: 0}}
        animate={{opacity: 1, transition: { duration: 0.5 }}}
        exit={{opacity: 0}}
      >
        <AnimatePresence>
        <motion.img
          className='backdrop'
          key={movieIndex}
          initial={{opacity: 0}}
          animate={{opacity: 1}}
          exit={{opacity: 0}}
          src={movie.backdrops.length > 0 ? movie.backdrops[0] : null}
          alt='no image available'
        />
        </AnimatePresence>
        <motion.div
          key={isPopular} 
          className='title'
          initial={{opacity: 0, y: '30%'}}
          animate={{opacity: 1, y: 0, transition: { delay: 0.5, duration: 0.5 }}}
          exit={{opacity: 0}}
        >
          <div
            className='options-container'
          >
            <div className={isOpen ? 'option' : 'category'}
              onClick={()=>setIsOpen(!isOpen)}
            >
              {isPopular ? 'Popular Right Now' : 'Now Playing in Theatres'}
              <AnimatePresence exitBeforeEnter>
                {!isOpen && 
                  <motion.div
                    key={0}
                    className='icon'
                    exit={{ rotate: 90, transition: { duration: 0.3 } }}
                  >
                    <AiFillCaretDown />
                  </motion.div>
                }
                {isOpen && 
                  <motion.div
                    key={1}
                    className='icon'
                    exit={{ rotate: -90, transition: { duration: 0.3 } }}
                  >
                    <AiFillCaretLeft />
                  </motion.div>
                }
              </AnimatePresence>
            </div>
            <AnimatePresence>
              {isOpen && 
              <motion.div 
                className='option'
                initial={{scaleY: 0, originY: 0, opacity: 0}}
                animate={{scaleY: 1, opacity: 1, transition: { duration: 0.3 }}}
                exit={{scaleY: 0, originY: 0, opacity: 0, transition: { duration: 0.3 }}}
                onClick={handleOnClick}
              >
                {isPopular ? 'Now Playing' : 'Popular Right Now'}
              </motion.div>
              }
            </AnimatePresence>
          </div>
        </motion.div>
        <AnimatePresence>
          <motion.img 
            className='poster'
            key={movieIndex}
            src={movie.posters[0]}
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            exit={{opacity: 0}}
          />
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
      </motion.div>
  )
}

export default PopularCard