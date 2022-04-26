import { useState } from 'react'
import { Link, useOutletContext } from 'react-router-dom'
import { AiOutlineMail } from 'react-icons/ai'
import { BsFillPersonFill } from 'react-icons/bs'
import { RiLockPasswordFill } from 'react-icons/ri'
import { motion } from 'framer-motion'
import Card from '../Card'
import Spinner from '../Spinner'
import { toast } from 'react-toastify'

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

const Register = () => {
  const { handleRegister, isLoading } = useOutletContext()
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleClick = () => {
    if(!username || !email || !password || !confirmPassword){
      toast.warn('Please fill in all required fields.')
      return
    }
    if(password !== confirmPassword){
      toast.warn('Please make sure both passwords match.')
      return
    }
    handleRegister({
      email: email, 
      username: username, 
      password: password,
    })
  }

  return (
    <Card
      variants={cardVariants}
      key={1}
    >
      <div className='register'>
        <div className='register-title'>Register</div>
        <div className='input-container'>
          <input 
            type='text' 
            value={username}
            onChange={(e)=>setUsername(e.target.value)}
            required={true}
          />
          <span className='floating-label'><BsFillPersonFill />Username</span>
        </div>
        <div className='input-container'>
          <input 
            type='text' 
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            required={true}
          />
          <span className='floating-label'><AiOutlineMail />Email</span>
        </div>
        <div className='input-container'>
          <input 
            type='password' 
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            required={true}
          />
          <span className='floating-label'><RiLockPasswordFill />Password</span>
        </div>
        <div className='input-container'>
          <input 
            type='password' 
            value={confirmPassword}
            onChange={(e)=>setConfirmPassword(e.target.value)}
            required={true}
          />
          <span className='floating-label'><RiLockPasswordFill />Confirm Password</span>
        </div>
        <div className='login-msg'>Already have an account? Sign in <Link to='/auth/login'>here</Link></div>
        <div className='footer'>
          {isLoading && <Spinner />}
          {!isLoading && 
            <motion.button 
              onClick={handleClick}
              whileTap={{scale: 0.9}}
              whileHover={{scale: 1.05}}
            >
              Register
            </motion.button>
          }
        </div>
      </div>
    </Card>
  )
}

export default Register