import { useNavigate } from 'react-router-dom'
import { useState, createContext, useEffect, createRef } from 'react'
import Canvas from '../components/Canvas'
import FriendsList from '../components/FriendsList'
import FriendSearch from '../components/FriendSearch'

import { SaveSketch, SendSketch, UploadSketch } from '../services/Sketches'
import { CreateNotif } from '../services/Notifs'

import './CSS/Home.css'

import '../components/CSS/FriendList.css'
// import io from 'socket.io-client'
import Notifications from '../components/Notifications'
import { GetNotifs } from '../services/Notifs'

// const socket = io.connect('http://localhost:3001')

const Home = ({
  user,
  selSketch,
  setSelSketch,
  sendNotification,
  socket,
  checkNotifs,
  notifications,
  hexColor,
  setHexColor
}) => {
  const canvasRef = createRef()

  const [sketchRecip, setSketchRecip] = useState(0)

  //////// SKETCH SEND LOGIC ///////////
  const sendSketch = async (friendId) => {
    const ctx = canvasRef.current.getContext('2d')
    const sketchData = canvasRef.current.toDataURL('image/png', 1)
    let user = JSON.parse(localStorage.getItem('userObj'))

    if (selSketch.id === undefined) {
      const sketch = await UploadSketch(user.id, {
        sketchData: sketchData
      })
      setSelSketch(sketch)
      const sentSketch = await SendSketch(friendId, sketch.id, {
        sketchData: sketchData
      })
      sendNotification(friendId)
      const notif = await CreateNotif(friendId, sketch.id, {
        senderName: user.username
      })
    } else {
      const sketch = await SendSketch(friendId, selSketch.id, {
        sketchData: sketchData
      })
      setSketchRecip(friendId)

      sendNotification(friendId)
      const notif = await CreateNotif(friendId, selSketch.id, {
        senderName: user.username
      })
    }
  }
  //////// SKETCH SEND LOGIC ///////////

  return (
    <div className="home">
      <div className="welcome-msg">Welcome {user.username}</div>
      <div>
        <h1 className="home-title">What's in your brain?</h1>
      </div>
      <section>
        <div className="home-page-grid">
          <FriendsList
            user={user}
            sendSketch={sendSketch}
            sketchRecip={sketchRecip}
            setSketchRecip={setSketchRecip}
          />
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
              canvasRef={canvasRef}
              sendNotification={sendNotification}
            />
          </div>
        </div>
      </section>

      <div className="friend-grid">
        <div className="friends">
          <FriendSearch user={user} />
        </div>
      </div>
    </div>
  )
}

export default Home
