import AuthPage from '../pages/AuthPage'
import HomePage from '../pages/HomePage'
import SearchPage from '../pages/SearchPage'
import Login from './Login'
import Register from './Register'
import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './Navbar'
import { useState, useEffect } from 'react' 
import Backdrop from './Backdrop'

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

const AnimatedRoutes = () => {
  const location = useLocation()
  const [ movie, setMovie ] = useState(null)
  const [ isOpen, setIsOpen ] = useState(true)

  useEffect(() => {
    if(isOpen){
      document.body.style.overflow = 'hidden'
      return
    }
    document.body.style.overflow = 'auto'
  },[isOpen])

  return (
    <>
    {!location.pathname.startsWith('/auth') && <Navbar/>}
    {/* {!inView && <Navbar style={{position: 'fixed', zIndex: 2}} variants={variants} />} */}
    <AnimatePresence exitBeforeEnter>
      <Routes key={location.pathname} location={location}>
        <Route path='/' element={<HomePage />}/>
        <Route path='auth' element={<AuthPage />}>
          <Route path="login" element={<Login />}/>
          <Route path="register" element={<Register />}/>
        </Route>
        <Route path='/search' element={<SearchPage />}/>
      </Routes>
    </AnimatePresence>
    {isOpen && 
      <Backdrop
        onClick={()=>setIsOpen(prev => !prev)}
      >
        
      </Backdrop>
    }
    </>
  )
}

export default AnimatedRoutes