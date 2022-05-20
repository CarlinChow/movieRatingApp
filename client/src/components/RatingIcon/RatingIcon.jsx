import { FaPercentage } from 'react-icons/fa'

const computeColor = (percentage) => {
  if(percentage > 75){
    return '#3CB371'
  }
  if(percentage > 50){
    return '#DAA520'
  }
  if(percentage === 0){
    return '#032541'
  }
  return '#FF6347'
}

const RatingIcon = ({rating}) => {
  const percentage = rating * 10
  return (
    <div 
      className='rating-icon'
      style={{border: `6px solid ${computeColor(percentage)}`}}
    >
      <div className='rating'>
        {percentage === 0 ? 'N/a' : percentage}
        {percentage !== 0 && <FaPercentage className='icon'/>}
      </div>
    </div>
  )
}

export default RatingIcon