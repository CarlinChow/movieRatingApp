import image from '../assets/img/loginBackground.jpg'
import { useNavigate, Outlet } from 'react-router-dom'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { register, login, reset } from '../features/auth/authSlice'
import { toast } from 'react-toastify'


const AuthPage = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const {user, isLoading, isError, isSuccess, message} = useSelector(state => state.auth)

  // use effect to navigate to / only when successful
  useEffect(() => {
    if(isSuccess || user){
      navigate('/')
    }
    if(isError){
      toast.error(message)
    }
    dispatch(reset())
  },[user, isSuccess, isError, message, navigate, dispatch])

  // call redux reducer to login user
  const handleLogin = (userData) => {
    dispatch(login(userData))
  }

  const handleRegister = (userData) => {
    dispatch(register(userData))
  }

  return (
    <div
      className='auth-page' 
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${image})`,
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat',
      }}
    >
      <Outlet context={{handleRegister, handleLogin, isLoading}}/>
    </div>
  )
}

export default AuthPage