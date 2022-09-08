import { useNavigate } from 'react-router-dom'
import { useState, createContext } from 'react'
import Canvas from '../components/Canvas'
import FriendsList from '../components/FriendsList'
import ColorPicker from '../components/ColorPicker'
import FriendSearch from '../components/FriendSearch'

import '../components/CSS/FriendList.css'

export const ColorProvider = createContext('#000000')

const Home = ({ user }) => {
  let navigate = useNavigate()
  const [hexColor, setHexColor] = useState('#000000')

  return (
    <ColorProvider.Provider value={hexColor}>
      <div className="home">
        <div className="home-title">
          <h1>What's in your brain?</h1>
        </div>
        <section>
          <ColorPicker hexColor={hexColor} setHexColor={setHexColor} />
          <div className="canvas">
            <Canvas width={700} height={500} hexColor={hexColor} />
          </div>
        </section>
        <div className="friend-grid">
          <div className="friends">
            <FriendsList user={user} />
          </div>
          <div>
            <FriendSearch user={user} />
          </div>
        </div>
      </div>
    </ColorProvider.Provider>
  )
}

export default Home
