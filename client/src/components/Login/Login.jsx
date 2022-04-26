import { useState } from 'react'
import { Link, useOutletContext } from 'react-router-dom'
import { BsFillPersonFill } from 'react-icons/bs'
import { RiLockPasswordFill } from 'react-icons/ri'
import { motion } from 'framer-motion'
import Card from '../Card'
import { toast } from 'react-toastify'
import Spinner from '../Spinner'

const cardVariants = {
  hidden:{
    x: '-20%',
    opacity: 0,
  },
  visible: {
    x: 0,
    opacity: 1,
    transition: {
      duration: 0.3,
    }
  },
  exit: {
    x: '20%',
    opacity: 0,
    transition: {
      duration: 0.3,
    }
  }
}

const Login = () => {
  const { handleLogin, isLoading} = useOutletContext()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  
  const handleClick = () => {
    if(!username || !password){
      toast.warn('Please fill in all required fields!')
      return
    }
    handleLogin({
      username,
      password,
    })
  }

  return (
    <Card
      variants={cardVariants}
      key={0}
    >
      <div className='login'>
        <div className='login-title'> Login </div>
        <div className='input-container'>
          <input 
            type='text'
            onChange={(e)=>setUsername(e.target.value)}
            value={username}
            required={true}  
          />
          <span className='floating-label'><BsFillPersonFill />Username</span>
        </div>
        <div className='input-container'>
          <input 
            type='password'
            onChange={(e)=>setPassword(e.target.value)}
            value={password}
            required={true} 
          />
          <span className='floating-label'><RiLockPasswordFill />Password</span>
        </div>
        <div className='register-msg'>
          Don't have an account? Register <Link to='/auth/register'>here</Link>
        </div>
        <div className='footer'>
            {
              isLoading && 
              <Spinner />
            }
            { 
              !isLoading && 
              <motion.button 
                onClick={handleClick}
                whileTap={{scale: 0.9}}
                whileHover={{scale: 1.05}}
              >
                Login
              </motion.button>
            }
        </div>
      </div>
    </Card>
  )
}

export default Login