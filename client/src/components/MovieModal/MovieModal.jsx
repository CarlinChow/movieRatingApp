import { motion } from 'framer-motion'
import Backdrop from '../Backdrop'
import { useEffect, useRef, useState } from 'react'
import { BsFillCircleFill } from 'react-icons/bs'
import RatingIcon from '../RatingIcon'
import { BiMoviePlay } from 'react-icons/bi'
import { MdAdd, MdCheck, MdClose } from 'react-icons/md'
import VideoPlayer from '../VideoPlayer'
import { useInterval } from 'use-interval'

const variants = {
  hidden: {
    opacity: 0,
    y: '70vh'
  },
  visible: {
    opacity: 1,
    y: 0,
  }
}

const MovieModal = ({movie, setMovie}) => {
  const { 
    posters, 
    videos, 
    backdrops, 
    movieDetails: { 
      overview,
      title, 
      runtime, 
      release_date, 
      genres, 
      vote_average,
      tagline 
    }
  } = movie
  const myRef = useRef(null)
  const [ isPlaying, setIsPlaying ] = useState(false)
  const [ backdropIndex, setBackdropIndex ] = useState(0)

  const handlePlayTrailer = () => {
    myRef.current.scrollIntoView({ behavior: "smooth" })
    setIsPlaying(true)
  }

  useInterval(() => {
    if(backdropIndex !== backdrops.length - 1){
      setBackdropIndex(prev => prev + 1)
      return
    }
    setBackdropIndex(0)
  }, 6000)

  useEffect(() =>{
    document.body.style.overflow = 'hidden'
    return () => document.body.style.overflow = 'visible'
  },[])

  return (
      <Backdrop onClick={()=>setMovie(null)}>
        <motion.div
          className='modal-backdrop'
          onClick={e => e.stopPropagation()}
          variants={variants}
          initial='hidden'
          animate='visible'
          exit='hidden'
          transition={{y: { type: 'inhertia', duration: 0.5 }}}
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url(${backdrops[backdropIndex]})`
          }}
        >
          <div className='modal-header'>
            <img 
              className='poster'
              src={posters[0]}
            />
            <div className='info'>
              <MdClose 
                className='close-btn'
                onClick={()=>setMovie(null)}
              />
              <div className='title'>{title} ({release_date.slice(0, 4)})</div>
              <div className='extra-info'>
                <div>{release_date}</div>
                <BsFillCircleFill fontSize='0.5rem'/>
                <div>{runtime} mins</div>
                <BsFillCircleFill fontSize='0.5rem'/>
                <div className='genres'>
                {genres.map((genre, idx) => {
                  if(idx === genres.length - 1){
                    return <div>{genre.name}</div>
                  }
                  return <div>{genre.name},</div>
                })}
                </div>
              </div>
            </div>
            <div className='actions'>
              <RatingIcon rating={vote_average}/>
              {videos[0] && 
                <div 
                  className='play-btn'
                  onClick={handlePlayTrailer}
                >
                  <BiMoviePlay 
                    className='icon'
                  />
                  Play Trailer
                </div>
              }
              {movie.backdropIndex 
              ? <MdAdd className='add-btn'/>
              : <MdCheck className='add-btn'/>}
            </div>
            <div className='overview'>
              {tagline && <div className='tagline'>"{tagline}"</div>}
              <div className='desc'>{overview}</div>
            </div>
          </div>
        </motion.div>
        <motion.div 
          className='modal'
          onClick={(e)=> e.stopPropagation()}
          variants={variants}
          initial='hidden'
          animate='visible'
          exit='hidden'
          transition={{y: { type: 'inhertia', duration: 0.5 }}}
        >
          <div className='modal-content'>
            <VideoPlayer
              ref={myRef}
              videos={videos}
              setIsPlaying={setIsPlaying}
              isPlaying={isPlaying} 
            />
          </div>
        </motion.div>
      </Backdrop>
  )
}

export default MovieModal