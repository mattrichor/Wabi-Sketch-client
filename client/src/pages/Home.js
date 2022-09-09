import { useNavigate } from 'react-router-dom'
import { useState, createContext, useEffect } from 'react'
import Canvas from '../components/Canvas'
import FriendsList from '../components/FriendsList'

import FriendSearch from '../components/FriendSearch'

import './CSS/Home.css'

import '../components/CSS/FriendList.css'
import io from 'socket.io-client'

export const ColorProvider = createContext('#000000')
const socket = io.connect('http://localhost:3001')

const Home = ({ user, selSketch, setSelSketch }) => {
  const [sketchRecip, setSketchRecip] = useState(0)
  const [hexColor, setHexColor] = useState('#000000')

  const initRoom = (user) => {
    socket.emit('create_room', user.id)
  }

  useEffect(() => {
    initRoom(user)
  }, [user])

  return (
    <ColorProvider.Provider value={hexColor}>
      <div className="home">
        <div className="home-title">
          <h1>What's in your brain?</h1>
        </div>
        <section>
          <div className="canvas">
            <Canvas
              width={700}
              height={500}
              hexColor={hexColor}
              user={user}
              setSelSketch={setSelSketch}
              selSketch={selSketch}
              setHexColor={setHexColor}
              socket={socket}
              sketchRecip={sketchRecip}
              setSketchRecip={setSketchRecip}
            />
          </div>
        </section>
        <div className="friend-grid">
          <div className="friends">
            <FriendSearch user={user} />
          </div>
        </div>
      </div>
    </ColorProvider.Provider>
  )
}

export default Home
