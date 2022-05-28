import SearchBar from '../components/SearchBar'
import SearchDBMovies from '../components/SearchDBMovies'
import SearchApiMovies from '../components/SearchApiMovies'
import { useState, useEffect } from 'react'
import { useSearchMovieTitle } from '../hooks/useSearchMovieTitle'
import { useGetMoviesQuery, useGetSearchedMoviesQuery } from '../features/movies/moviesApi'

const SearchPage = ({overflow}) => {
  const [ searchQuery, setSearchQuery ] = useState('')
  const [ currentSearchQuery, setCurrentSearchQuery ] = useState(null)
  const [ page, setPage ] = useState(1)
  const [ skip, setSkip ] = useState(true)
  const dbMovies = useGetMoviesQuery()
  const apiMovies = useGetSearchedMoviesQuery({query: searchQuery.trim(), page: page}, {skip: skip})
  const [ apiMoviesResults, setApiMovieResults ] = useState([])
  const [ dbMovieresults, setDBMovieResults ] = useState([])

  //  hook that only returns results that include search query
  const dbSearchResults = useSearchMovieTitle(dbMovies.data, searchQuery.trim())

  useEffect(() => {
    if(apiMovies.data){
      setApiMovieResults(apiMovies.data)
      setSkip(true)
    }
  },[apiMovies.data])

  const handlePressEnter = () => {
    setSkip(false)
    setDBMovieResults(dbSearchResults)
    setCurrentSearchQuery(searchQuery)
  }

  return (
    <div className='search-page'>
      <SearchBar 
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        handlePressEnter={handlePressEnter}
      />
      <SearchDBMovies 
        movies={dbMovieresults}
        currentSearchQuery={currentSearchQuery}
      />
      <SearchApiMovies
        setPage={setPage}
        movies={apiMoviesResults}
        currentSearchQuery={currentSearchQuery}
      />
    </div>
  )
}

export default SearchPage