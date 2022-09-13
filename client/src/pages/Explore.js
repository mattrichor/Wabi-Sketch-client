import FriendSearch from '../components/FriendSearch'
import FriendsList from '../components/FriendsList'

import { useState } from 'react'

const Explore = ({ user }) => {
  const [exploreToggle, setExploreToggle] = useState(true)

  return (
    <div>
      <div className="home-title">E X P L O R E </div>
      <div className="explore-grid">
        <div className="friend-grid explore">
          <FriendsList user={user} exploreToggle={exploreToggle} />
          <div className="search-grid">
            <FriendSearch user={user} />
          </div>
        </div>
      </div>
    </div>
  )
}
export default Explore
