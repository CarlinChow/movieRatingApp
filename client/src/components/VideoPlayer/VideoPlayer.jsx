import React, { useState, useEffect } from 'react'
import ReactPlayer from 'react-player/youtube'
import { FaExpand, FaCompress } from 'react-icons/fa'
import { GoChevronRight, GoChevronLeft } from 'react-icons/go'
import { motion } from 'framer-motion'

const VideoPlayer = React.forwardRef(({videos, isPlaying, setIsPlaying}, ref) => {
  const [ expand, setExpand ] = useState(false)
  const [ videoIndex, setVideoIndex ] = useState(0)

  const handleOnStart = () => {
    if(videoIndex === 0){
      setExpand(true)
    }
    setIsPlaying(true)
  }

  return (
    <div 
      className='video-player'
      ref={ref}
    >
      <div className='header'>
        Movie Clips
      </div>
      <div 
        className='video'
        style={{ 
          gridColumn: `${expand ? '1 / 4' : '1 / 3'}`,
        }}
      >
        <ReactPlayer
          url={`https://www.youtube.com/embed/${videos[videoIndex].key}?vq=hd1080`}
          playing={isPlaying}
          onStart={handleOnStart}
          controls={true}
          pip={true}
          style={{
            aspectRatio: '16 / 9',
            boxShadow: 'rgba(17, 12, 46, 0.3) 0px 48px 100px 0px'
          }}
          width='100%'
          height='100%'
        />
      </div>
      <div 
        className={`video-sidebar ${expand ? 'expanded' : ''}`}
        style={{ 
          gridColumn: `${expand ? '4 / 5' : '3 / 5'}`,
        }}
      >
        <div className='video-controls'>
          {expand 
            ? <motion.div
                className='expand-btn'
                onClick={()=>setExpand(false)}
                whileTap={{scale: 0.9}}
              >
                <FaCompress className='icon'/>
                Minimize
              </motion.div> 
            : <motion.div
                className='expand-btn'
                onClick={() => setExpand(true)}
                whileTap={{scale: 0.9}}
              >
                <FaExpand className='icon'/>
                Expand
              </motion.div>
          }
          <motion.div 
            className='nav-btn'
            whileTap={{scale: 0.9}}
            onClick={()=>setVideoIndex(prev => prev === 0 ? videos.length - 1 : prev - 1)}
          >
            <GoChevronLeft className='icon'/>
          </motion.div>
          <motion.div 
            className='nav-btn'
            whileTap={{scale: 0.9}}
            onClick={()=>setVideoIndex(prev => prev === videos.length - 1 ? 0 : prev + 1)}
          >
            <GoChevronRight className='icon'/>
          </motion.div>
        </div>
        <div className={`video-list ${expand ? 'expanded' : ''}`}>
          {videos.map((video, idx) => {
            return(
              <div 
                className={`video-card ${idx === videoIndex ? 'selected' : ''}`}
                onClick={()=>setVideoIndex(idx)}
              >
                <img
                  src={`http://img.youtube.com/vi/${video.key}/mqdefault.jpg`} 
                />
                <div className='video-title'>
                  {video.title}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
})

export default VideoPlayer