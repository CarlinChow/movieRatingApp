import Showcase from '../components/Showcase'
import UpcomingCard from '../components/UpcomingCard'
import PopularCard from '../components/PopularCard'
import MoviesSection from '../components/MoviesSection'
import { useSelector } from 'react-redux'

const HomePage = () => {
  const { user } = useSelector(state => state.auth)

  return (
    <div className='home-page'>
      <Showcase user={user}/>
      <PopularCard />
      <UpcomingCard />
      <MoviesSection/>
      {/* <div>movies</div>   
      <div>footer</div>       */}
    </div>
  )
}

export default HomePage