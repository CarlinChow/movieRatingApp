import { motion, useAnimation } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import { useEffect } from 'react'

const MovieCardWide = ({movie, variants, index}) => {
  const { posters, movieDetails: { overview, title, release_date } } = movie
  const [ ref, inView ] = useInView({threshold: 0.4})
  const controls = useAnimation()

  useEffect(() => {
    if(inView){
      controls.start('visible')
    }
  }, [controls, inView])



  return (
    <motion.div
      className='movie-card-wide'
      ref={ref}
      key={index} 
      variants={variants}
      custom={index % 2 === 0}
      initial="hidden"
      animate={controls}
      transition={{
        x: { type: 'spring', duration: 0.7 }
      }}
    >
      <img
        src={posters[0]}
        alt='No image available'
      />
      <div className='title'>{title} ({release_date.slice(0, 4)})</div>
      <div className='overview'>{overview}</div>
    </motion.div>
  )
}

export default MovieCardWide