import AuthPage from '../pages/AuthPage'
import HomePage from '../pages/HomePage'
import Login from './Login'
import Register from './Register'
import {Routes, Route, useLocation} from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import Navbar from './Navbar'

const AnimatedRoutes = () => {
  const location = useLocation()
  return (
    <>
    {!location.pathname.startsWith('/auth') && <Navbar />}
    <AnimatePresence exitBeforeEnter>
      <Routes key={location.pathname} location={location}>
        <Route path='/' element={<HomePage />}/>
        <Route path='auth' element={<AuthPage />}>
          <Route path="login" element={<Login />}/>
          <Route path="register" element={<Register />}/>
        </Route>
      </Routes>
    </AnimatePresence>
    </>
  )
}

export default AnimatedRoutes