import { motion } from 'framer-motion'

const variants ={
  hidden: {
    opacity: 0
  },
  visible: {
    opacity: 1
  }
}

const Backdrop = ({children, onClick}) => {
  return (
    <motion.div 
      className='darken-backdrop'
      onClick={onClick}
      variants={variants}
      initial='hidden'
      animate='visible'
      exit='hidden'
      transition={{opacity: { duration: 0.5 }}}
    >
      {children}
    </motion.div>
  )
}

export default Backdrop