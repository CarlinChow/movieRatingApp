import { useInterval } from 'use-interval'
import { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'


const backdropVariants = {
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1
  }
}

const overlayVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
    }
  }
}

const MovieOverlay = ({movie, style, setOverlayDisplayRight}) => {
  const { backdrops, movieDetails } = movie
  const [ backdropIndex, setBackdropIndex ] = useState(Math.floor(Math.random() * backdrops.length)) // generate random int
  const [ ref, inView ] = useInView({threshold: 1})

  useInterval(() => {
    if(backdropIndex === backdrops.length - 1){
      setBackdropIndex(0)
      return
    }
    setBackdropIndex(backdropIndex + 1)
  }, 5000)

  useEffect(() => {
    if(inView){
      setOverlayDisplayRight(true)
    }
  },[inView])

  return (
    <div 
      className='movie-overlay-container'
    >
      <motion.div 
        className='movie-overlay'
        variants={overlayVariants}
        initial='hidden'
        animate='visible'
        exit='hidden'
        ref={ref}
        style={style}
      >
        <div className='backdrop'>
          <AnimatePresence>
            {
              <motion.img
                key={backdropIndex}
                src={backdrops[backdropIndex]}
                alt='no image available'
                variants={backdropVariants}
                initial='hidden'
                animate='visible'
                exit='hidden'
              />
            }
          </AnimatePresence>
        </div>
        <div className='content'>
          <ul className='genres'>
            {movieDetails.genres
              .filter((genre, idx) => idx < 4)
              .map((genre, idx) => (
              <li key={idx}>{genre.name}</li>
            ))}
          </ul>
          <div className='overview'>
            {movieDetails.overview}
          </div>
        </div>
      </motion.div>
    </div>
  )
}

export default MovieOverlay