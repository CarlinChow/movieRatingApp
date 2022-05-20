import { useGetMoviesQuery } from '../../features/movies/moviesApi'
import MovieCardSm from '../MovieCardSm'
import MovieCardLg from '../MovieCardLg'
import Spinner from '../Spinner'
import { useState, useEffect } from 'react'
import { BiErrorCircle } from 'react-icons/bi'
import { IoSwapVertical } from 'react-icons/io5'
import DropdownMenu from '../DropdownMenu'
import { useSortMovies, sortMethodsList } from '../../hooks/useSortMovies'
import { useFilterGenre, genresList } from '../../hooks/useFilterGenre'
import { v4 as uuidv4 } from 'uuid';

const MoviesSection = () => {
  const { data, isLoading, isError, error } = useGetMoviesQuery()
  const [ genres, setGenres ] = useState([...genresList])
  const [ sortMethods, setSortMethods ] = useState([...sortMethodsList])
  const [ filterGenre, setFilterGenre ] = useState(null)
  const [ sortMethod, setSortMethod ] = useState(null)
  const [ sortReverse, setSortReverse ] = useState(false) 

  const filteredData = useFilterGenre(data, filterGenre)
  const sortedData = useSortMovies(sortMethod, filteredData, sortReverse)
  const [ key, setKey ] = useState(uuidv4())

  useEffect(() => {
    if(filterGenre && genres[0].id !== -1){
      setGenres(prev => {
        return(
          [{ name: 'All', id: -1 }, ...prev]
        )
      })
    }
    if(!filterGenre){
      setGenres(prev => {
        return(
          prev.filter(genre => genre.id !== -1)
        )
      })
    }
  }, [filterGenre])

  useEffect(() => {
    if(sortMethod && sortMethods[0].id !== -1){
      setSortMethods(prev => {
        return(
          [{ name: 'None', id: -1}, ...prev]
        )
      })
    }
    if(!sortMethod){
      setSortMethods(prev => {
        return(
          prev.filter(method => method.id !== -1)
        )
      })
    }
  },[sortMethod])

  useEffect(() => {
    setKey(uuidv4())
  },[filterGenre, sortMethod, sortReverse])

  //  variables for random loading of large movie cards
  let randomInt = Math.floor(Math.random() * 10)
  let position = Math.floor(Math.random() * 4)
  let rowIndex = 0
  let existsInRow = false

  if(isError){
    return(
      <div className='movies-section'>
        <div className='movies-header'>
          <div className='movies-title'> 
            Check out some of these movies!
          </div>
        </div>
        <div className='error-container'>
          <BiErrorCircle className='icon'/>
          <div>An error has occured: "{error}"</div>
        </div>
      </div>
    )
  }
  if(isLoading || !data){
    return(
      <div className='movies-section'>
        <div className='movies-header'>
          <div className='movies-title'> 
            Check out some of these movies!
          </div>
        </div>
        <div className='loading-container'>
          <Spinner />
        </div>
      </div>
    )
  }
  return (
    <div className='movies-section'>
      <div className='movies-header'>
        <div className='movies-title'> 
          Check out some of these movies!
        </div>
        <div className='movies-actions-container'>
          <div className='genre-filter'>
            <div>Filter By: </div>
            <DropdownMenu placeholder={filterGenre ? filterGenre.name : 'All'}>
              {
                genres
                  .filter(genre => !filterGenre || filterGenre.id !== genre.id)
                  .map((genre, idx) => {
                    if(genre.id === -1){
                      return(
                        <div
                          className='genre-filter-option'
                          onClick={()=>setFilterGenre(null)}
                          key={idx}
                        >
                          {genre.name}
                        </div>
                      )
                    }
                    return(
                      <div
                        className='genre-filter-option'
                        onClick={()=>setFilterGenre(genre)}
                        key={idx}
                      >
                        {genre.name}
                      </div>
                    )
                  })
              }
            </DropdownMenu>
          </div>
          <div className='sort-options'>
            <div>Sort By:</div>
            <DropdownMenu placeholder={sortMethod ? sortMethod.name : 'None'}>
              {
                sortMethods
                  .filter(method => !sortMethod || sortMethod.id !== method.id)
                  .map((method, idx) => {
                    if(method.id === -1){
                      return(
                        <div
                          className='sort-option'
                          onClick={()=>setSortMethod(null)}
                          key={idx}
                        >
                          {method.name}
                        </div>
                      )
                    }
                    return(
                      <div
                        className='sort-option'
                        onClick={()=>setSortMethod(method)}
                        key={idx}
                      >
                        {method.name}
                      </div>
                    )
                  })
              }
            </DropdownMenu>
            <IoSwapVertical 
              className={`reverse-icon ${sortReverse ? 'active' : ''}`}
              onClick={()=>setSortReverse(prev => !prev)}
            />
          </div>
        </div>
      </div>
      <div 
        className='movies'
        key={key}
      >
        {/* randomly generate at most one large movie card per row of grid elements */}
        {sortedData.map((item, idx) => {
          if(rowIndex == 6){
            randomInt = Math.floor(Math.random() * 10)
            rowIndex = 0
          }

          if(rowIndex == 0){
            if(randomInt % 2 == 0){
              existsInRow = true
            }
          }

          if(existsInRow){
            if(rowIndex == position){
              position = Math.floor(Math.random() * 4)
              existsInRow = false
              if(item.backdrops.length === 0){
                rowIndex = rowIndex + 1
                return <MovieCardSm key={idx} movie={item} />
              }
              let temp = rowIndex
              rowIndex = rowIndex + 3
              return <MovieCardLg key={idx} movie={item} gridColumn={`${temp + 1} / ${temp + 4}`}/>
            }
          }
          rowIndex = rowIndex + 1
          return <MovieCardSm key={idx} movie={item} />
        })}
      </div>
    </div>
  )
}

export default MoviesSection