import { useState, useEffect, useContext } from 'react'
import { MdNavigateNext, MdNavigateBefore } from 'react-icons/md'
import { motion, AnimatePresence } from 'framer-motion'
import { MovieContext } from '../AnimatedRoutes'


const initialVariants = {
  hidden: {
    opacity: 0,
    y: '30%',
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5
    }
  },
  exit: {
    opacity: 0,
  }
}

const slideVariants = {
  hidden: direction => {
    return{
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0 
    }
  },
  visible: {
    opacity: 1,
    x: 0
  },
  exit: direction => {
    return{
      zIndex: 0,
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0
    }
  }
}

const MovieCarousel = ({movies, myKey}) => {
  const { setMovie } = useContext(MovieContext)
  let count = movies.length
  const [ direction, setDirection ] = useState(0)
  const [ tabs, setTabs ] = useState(1)
  const [ hasPrev, setHasPrev ] = useState(false)
  const [ hasNext, setHasNext ] = useState(count > 6)

  useEffect(() => {
    count = movies.length
    setHasNext(count > 6)
    setTabs(1)
    setHasPrev(false)
  },[movies])

  const handleNext = () => {
    setDirection(1)
    if(count <= (tabs + 1) * 6){
      setHasNext(false)
    }
    setTabs(prev => prev + 1)
    setHasPrev(true)
  }

  const handlePrev = () => {
    setDirection(-1)
    if(tabs === 2){
      setHasPrev(false)
    }
    setTabs(prev => prev - 1)
    setHasNext(true)
  }

  return (
    <motion.div 
      className='movie-carousel'
      variants={initialVariants}
      initial='hidden'
      animate='visible'
      key={myKey}
    >
      {hasPrev && 
        <motion.div
          whileHover={{opacity: 1}} 
          className='prev-btn'
          onClick={handlePrev}
        >
          <MdNavigateBefore className='icon'/>
        </motion.div>
      }
      <AnimatePresence initial={false} custom={direction}>
        <motion.div 
          className='slides-container'
          variants={slideVariants}
          custom={direction}
          initial='hidden'
          animate='visible'
          exit='exit'
          transition={{
            x: { type: "spring", stiffness: 300, damping: 30},
            opacity: { duration: 0.2 }
          }}
          key={tabs}
        >
          {movies.map((movie, idx) => {
            if(idx < 6 * tabs && idx >= 6 * (tabs - 1)){
              return(
                  <motion.div
                    onClick={()=>setMovie(movie)}
                    whileHover={{
                      scale: 1.4,
                      zIndex: 1,
                      transition: {
                        delay: 0.2,
                        duration: 0.5,
                      }
                    }}
                    transition={{ type: 'inhertia', stiffness: 300 }} 
                    className='slide'
                    key={movie._id}
                  >
                    <img
                      src={movie.posters[movie.posterIndex ? movie.posterIndex : 0]} 
                    />
                  </motion.div>
              )
            }
          })}
        </motion.div>
      </AnimatePresence>
      {hasNext && 
        <motion.div 
          whileHover={{opacity: 1}} 
          className='next-btn'
          onClick={handleNext}
        >
          <MdNavigateNext className='icon'/>
        </motion.div>
      }
    </motion.div>
  )
}

export default MovieCarousel