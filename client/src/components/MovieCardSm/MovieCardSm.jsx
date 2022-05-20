import RatingIcon from '../RatingIcon'
import { motion, useAnimation, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useEffect, useState, useRef } from 'react'
import MovieOverlay from '../MovieOverlay'

const variants = {
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

const MovieCardSm = ({movie}) => {
  const { movieDetails, posters, posterIndex, ratings } = movie
  const [ ref, inView ] = useInView()
  const controls = useAnimation()
  const [ overlayOpen, setOverlayOpen ] = useState(false)
  const [ overlayDisplayRight, setOverlayDisplayRight ] = useState(true)

  useEffect(() => {
    if(inView){
      controls.start('visible')
    }
  }, [controls, inView])
  
  return (
    <div className='movie-card-sm-container'>
    <motion.div 
      ref={ref}
      className='movie-card-sm'
      variants={variants}
      initial='hidden'
      animate={controls}
      // onMouseEnter={()=>setOverlayOpen(true)}
      // onMouseLeave={()=>setOverlayOpen(false)}
      onClick={() => setOverlayOpen(!overlayOpen)}
    >
      <div className='poster-container'>
      <img
        src={posters[posterIndex]}
      />
      <RatingIcon rating={ratings ? ratings : movieDetails.vote_average}/>
      </div>
      <div className='content'>
        <div className='title'>{movieDetails.title}</div>
        <div className='date'>{movieDetails.release_date.slice(0, 4)}</div>
      </div>
    </motion.div>
    <AnimatePresence>
      {overlayOpen && overlayDisplayRight && <MovieOverlay movie={movie} setOverlayDisplayRight={setOverlayDisplayRight}/>}
      {overlayOpen && !overlayDisplayRight && <MovieOverlay movie={movie} />}
    </AnimatePresence>
    </div>
  )
}

export default MovieCardSm