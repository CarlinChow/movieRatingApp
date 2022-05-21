import React from 'react'

const Backdrop = ({children, onClick}) => {
  return (
    <div 
      className='backdrop'
      onClick={onClick}
    >
      {children}
    </div>
  )
}

export default Backdrop