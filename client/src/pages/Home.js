import { useNavigate } from 'react-router-dom'
import { useState, createContext, useEffect } from 'react'
import Canvas from '../components/Canvas'
import FriendsList from '../components/FriendsList'
import io from 'socket.io-client'

import FriendSearch from '../components/FriendSearch'

import './CSS/Home.css'

import '../components/CSS/FriendList.css'

export const ColorProvider = createContext('#000000')
const socket = io.connect('http://localhost:3001')

const Home = ({ user, selSketch, setSelSketch }) => {
  let navigate = useNavigate()
  const [message, setMessage] = useState('')
  const [messageRecieved, setMessageRecieved] = useState('')
  const [hexColor, setHexColor] = useState('#000000')

  ///////// SOCKET ////////////
  const sendMessage = () => {
    socket.emit('send_message', { message })
  }
  useEffect(() => {
    socket.on('receive_message', (data) => {
      setMessageRecieved(data.message)
    })
  }, [socket])

  ///////// SOCKET ////////////

  return (
    <ColorProvider.Provider value={hexColor}>
      <div className="home">
        <input
          placeholder="Message..."
          onChange={(event) => {
            setMessage(event.target.value)
          }}
        />
        <button onClick={sendMessage}>SEND MSG</button>
        <h3>{messageRecieved}</h3>
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
