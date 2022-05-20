import RatingIcon from '../RatingIcon'
import { useInterval } from 'use-interval'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

const backdropVariants = {
  hidden: {
    opacity: 0,
  },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.7
    }
  }
}

const cardVariants = {
  hidden: {
    y: '30%',
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.7
    }
  }
}

const MovieCardLg = ({movie, gridColumn}) => {
  const { movieDetails, backdrops, ratings } = movie
  const [ backdropIndex, setBackdropIndex ] = useState(0)
  const { ref, inView } = useInView()
  const controls = useAnimation()

  useInterval(()=> {
    if(backdropIndex === backdrops.length - 1 || backdropIndex > 8){
      setBackdropIndex(0)
      return
    }
    setBackdropIndex(backdropIndex + 1)
  }, 15000)

  useEffect(() => {
    if(inView){
      controls.start('visible')
    }
  }, [controls, inView])

  return (
    <motion.div
      ref={ref} 
      className='movie-card-lg' 
      style={{gridColumn: gridColumn}}
      variants={cardVariants}
      initial='hidden'
      animate={controls}
    >
      <div className='title'>{movieDetails.title} ({movieDetails.release_date.slice(0, 4)})</div>
      <AnimatePresence>
        <motion.img
          key={backdropIndex}
          src={movie.backdrops[backdropIndex]}
          variants={backdropVariants}
          initial='hidden'
          animate='visible'
          exit='hidden' 
        />
      </AnimatePresence>
      <RatingIcon rating={ratings ? ratings : movieDetails.vote_average}/>
    </motion.div>
  )
}

export default MovieCardLg