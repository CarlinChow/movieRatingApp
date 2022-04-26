import { BiCameraMovie }from 'react-icons/bi'
import { Link } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { logout } from '../../features/auth/authSlice'
import { IoHomeSharp } from 'react-icons/io5'
import { BiSearch } from 'react-icons/bi'
import { FaSignOutAlt, FaSignInAlt, FaGithub } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { motion, AnimatePresence } from 'framer-motion'

const Navbar = () => {
  const { user } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const handleLogout = () => {
    dispatch(logout())
    toast.success('Successfully logged out', { position: "top-left" })
  }

  return (
    <div className='navbar-container'>
      <div className='navbar'>
        <div className='logo'>
          <BiCameraMovie className='icon'/>
          <div className='title'>Movie Raters</div>
        </div>
        <ul>
          <li>
            <Link to='/'>
              <IoHomeSharp className='icon'/>
              <div>Home</div>
            </Link>
          </li>
          <li>
            <Link to='/search'>
              <BiSearch className='icon'/>
              <div>Search</div>
            </Link>
          </li>
          <li>
            <AnimatePresence exitBeforeEnter>
            { user 
              ? <motion.button 
                  onClick={handleLogout}
                  initial={{opacity: 0}}
                  animate={{opacity: 1}}
                  exit={{opacity: 0}}
                >
                  <FaSignOutAlt className='icon'/>
                  <div>Logout</div>
                </motion.button>
              : <motion.div
                  initial={{opacity: 0}}
                  animate={{opacity: 1}}
                  exit={{opacity: 0}}
                >
                  <Link to='/auth/login'>
                    <FaSignInAlt className='icon'/>
                    <div>Login</div>
                  </Link>
                </motion.div>
            }
            </AnimatePresence>
          </li>
          <li>
            <a href='https://github.com/CarlinChow/movieRatingApp'><FaGithub className='icon'/></a>
          </li>
        </ul>
        </div>
    </div>
  )
}

export default Navbar