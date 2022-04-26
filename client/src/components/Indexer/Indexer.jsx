import { BsCircle, BsCircleFill } from 'react-icons/bs'
import { IoCaretForward, IoCaretBack } from 'react-icons/io5'

const Indexer = ({index, setIndex, length}) => {
  const handleClickForward = () => {
    if(index === length - 1){
      setIndex(0)
      return
    }
    setIndex(index + 1)
  }

  const handleClickBackward = () => {
    if(index === 0){
      setIndex(length - 1)
      return
    }
    setIndex(index - 1)
  }

  const handleClickIndexes = (idx) => {
    setIndex(idx)
  }


  return (
    <div className='indexer'>
      <IoCaretBack 
        className='icon' 
        fontSize='2rem'
        onClick={handleClickBackward}
      />
      <div className='indexes'>
        {Array.from(Array(length), (item, idx) => {
          if(idx === index){
            return <BsCircleFill />
          }
          return <BsCircle onClick={()=>handleClickIndexes(idx)}/>
        })}
      </div>
      <IoCaretForward 
        className='icon' 
        onClick={handleClickForward}
        fontSize='2rem'
      />
    </div>
  )
}

export default Indexer