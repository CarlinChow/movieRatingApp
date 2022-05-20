import MovieCardWide from '../MovieCardWide'

const variants = {
  hidden: direction => {
    return{
      x: direction > 0 ? '-50%' : '50%',
      opacity: 0,
    }
  },
  visible: {
    x: 0,
    opacity: 1,
  }
}

const SearchApiMovies = ({movies, setPage, currentSearchQuery}) => {

  return (
    <div className='search-api-movies'>
      {currentSearchQuery && <div className='header'>Search Results for "{currentSearchQuery.trim()}" online</div>}
      <div className='movie-result-cards'>
        {movies.map((movie, idx) => {
          return(
            <MovieCardWide
              key={idx}
              movie={movie}
              variants={variants}
              index={idx} 
            />
          )
        })}
      </div>
    </div>
  )
}

export default SearchApiMovies