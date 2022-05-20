import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { AiFillCaretDown, AiFillCaretLeft } from 'react-icons/ai'

const optionsVariants = {
  hidden: {
    opacity: 0,
    originY: 0,
    scaleY : 0,
  },
  visible: {
    opacity: 1,
    scaleY: 1,
    transition: {
      duration: 0.3,
    }
  }
}

const DropdownMenu = ({children, placeholder}) => {
  const [ isOpen, setIsOpen ] = useState(false)
  return (
    <div className='dropdown-menu-container'>
      <div 
        className={isOpen ? 'placeholder-option' : 'dropdown-placeholder'} 
        onClick={()=>setIsOpen(!isOpen)}
      >
        {placeholder}
        <AnimatePresence exitBeforeEnter>
          {!isOpen &&
            <motion.div
              key={0}
              className='icon'
              exit={{ rotate: 90, transition: { duration: 0.3 } }}
            >
              <AiFillCaretDown />
            </motion.div>
          }
          {
            isOpen && 
            <motion.div
              key={1}
              className='icon'
              exit={{ rotate: -90, transition: { duration: 0.3 } }}
            >
              <AiFillCaretLeft />
            </motion.div>
          }
        </AnimatePresence>
      </div>
      <AnimatePresence>
        {isOpen && 
          <motion.div
            className='options'
            variants={optionsVariants}
            initial='hidden'
            animate='visible'
            exit='hidden'
          >
            {children.map((child, idx) => (
              <div
                key={idx}
                className='option'
                onClick={()=>setIsOpen(false)}
              >
                {child}
              </div>
            ))}
          </motion.div>
        }
      </AnimatePresence>
    </div>
  )
}

export default DropdownMenu