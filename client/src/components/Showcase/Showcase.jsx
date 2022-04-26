import { motion } from 'framer-motion'
import { useNavigate } from 'react-router-dom'

const titleVariants = {
  hidden: {
    opacity: 0,
    y: '30%'
  },
  visible:{
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.7,
    }
  },
}

const paragraphVariants = {
  hidden: {
    opacity: 0,
    y: '30%'
  },
  visible:{
    opacity: 0.7,
    y: 0,
    transition: {
      delay: 0.7,
      duration: 0.7,
    }
  },
}

const buttonVariants = {
  hidden: {
    opacity: 0,
    y: '30%'
  },
  visible:{
    opacity: 1,
    y: 0,
    transition: {
      delay: 0.5,
      duration: 0.7,
    }
  },
}

const Showcase = ({user}) => {
  const navigate = useNavigate()
  return (
      <div className='showcase'>
        <motion.div 
          className='title'
          variants={titleVariants}
          initial='hidden'
          animate='visible'
        >
          Welcome {user ? ` ${user.username},` : ' to Movie Raters,'}
        </motion.div>
        <motion.p
          variants={paragraphVariants}
          initial='hidden'
          animate='visible'
        >
          {!user ? 'Create an account today to leave reviews and ratings for movies. ' : ''} 
          View all currently popular and upcoming movies. 
          Get recommendations for new movies as well.
          Can't find your movie? Feel free to search for it on our 'search'
          page and add it to our databases in order for other users to leave
          ratings and reviews. 
        </motion.p>
        {!user && 
          <motion.button
            onClick={()=>navigate('/auth/register')}
            variants={buttonVariants}
            initial='hidden'
            animate='visible'
          >
            Register a new account
          </motion.button>
        }
      </div>
  )
}

export default Showcase