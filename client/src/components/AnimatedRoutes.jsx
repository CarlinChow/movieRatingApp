import AuthPage from '../pages/AuthPage'
import HomePage from '../pages/HomePage'
import SearchPage from '../pages/SearchPage'
import Login from './Login'
import Register from './Register'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './Navbar'
import React, { useState, useEffect } from 'react' 
import Backdrop from './Backdrop'
import MovieModal from './MovieModal'

const variants = {
  hidden: {
    y: '-30%',
    opacity: 0,
  },
  visible: {
    y: 0,
    opacity: 1,
  }
}

export const MovieContext = React.createContext()

const AnimatedRoutes = () => {
  const location = useLocation()
  const [ movie, setMovie ] = useState(null)
  return (
    <>
    {!location.pathname.startsWith('/auth') && <Navbar/>}
    {/* {!inView && <Navbar style={{position: 'fixed', zIndex: 2}} variants={variants} />} */}
    <AnimatePresence exitBeforeEnter>
      <MovieContext.Provider value={{setMovie: setMovie}}>
        <Routes key={location.pathname} location={location}>
          <Route path='auth' element={<AuthPage />}>
            <Route path="login" element={<Login />}/>
            <Route path="register" element={<Register />}/>
          </Route>
            <Route path='/' element={<HomePage />}/>
            <Route path='/search' element={<SearchPage />}/>
        </Routes>
      </MovieContext.Provider>
    </AnimatePresence>
    <AnimatePresence>
      {movie && 
        <MovieModal movie={movie} setMovie={setMovie}/>
      }
    </AnimatePresence>
    </>
  )
}

export default AnimatedRoutes