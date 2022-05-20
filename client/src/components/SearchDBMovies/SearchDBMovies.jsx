import MovieCarousel from '../MovieCarousel'
import { v4 as uuidv4 } from 'uuid';
import { useState, useEffect } from 'react'

const SearchDBMovies = ({movies, currentSearchQuery}) => {
  const [ key, setKey ] = useState(uuidv4())

  useEffect(() => {
    setKey(uuidv4())
  },[currentSearchQuery])

  return (
    <div className='searchDBMovies'>
      {currentSearchQuery && <div className='current-results'>Search Results for "{currentSearchQuery.trim()}" in database</div>}
      {movies.length === 0 && currentSearchQuery &&
        <div className='no-results'>
          Sorry no results were found in our database...
        </div> 
      }
      {movies.length > 0 && <MovieCarousel movies={movies} myKey={key}/>}
    </div>
  )
}

export default SearchDBMovies
