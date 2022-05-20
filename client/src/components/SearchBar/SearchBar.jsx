import { useState } from 'react'
import { motion } from 'framer-motion'
import { useSearch } from '../../hooks/useSearchMovieTitle'

const searchBarVariants = {
  hidden: {
    opacity: 0,
    y: '30%'
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
    }
  } 
}

const paragraphVariants = {
  hidden: {
    opacity: 0,
    y: '30%'
  },
  visible: {
    opacity: 0.7,
    y: 0,
    transition: {
      delay: 0.7,
      duration: 0.7,
    }
  } 
}

const SearchBar = ({searchQuery, setSearchQuery, handlePressEnter, currentSearchQuery}) => {
  const handleKeyPress = (event) => {
    if(event.key === 'Enter'){
      handlePressEnter()
      return
    }
    return
  }

  return (
    <div 
      className='search-bar-container'
    >
      <motion.input 
        type='search'
        placeholder='Search for a Movie Here...'
        value={searchQuery} 
        onChange={(e)=>setSearchQuery(e.target.value)}
        onKeyPress={handleKeyPress}
        variants={searchBarVariants}
        initial='hidden'
        animate='visible' 
        
      />
      <motion.div 
        className='search-paragraph'
        variants={paragraphVariants}
        initial='hidden'
        animate='visible' 
      >
        Can't find your movie in our database? 
        Search for it here and add it to our website so others can rate and review it!
      </motion.div>
    </div>
  )
}

export default SearchBar