import { motion } from 'framer-motion'

const Card = ({children, variants}) => {
  return (
    <motion.div 
      className='card'
      variants={variants}
      initial={variants ? 'hidden': ''}
      animate={variants ? 'visible' : ''}
      exit={variants ? 'exit' : ''}
    >
      {children}
    </motion.div>
  )
}

export default Card