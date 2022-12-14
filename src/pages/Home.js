import { useState, createContext, useEffect, createRef } from 'react'
import Canvas from '../components/Canvas'
import FriendsList from '../components/FriendsList'
import FriendSearch from '../components/FriendSearch'
import LoadingSpinner from '../components/LoadingSpinner'

import { SaveSketch, SendSketch, UploadSketch } from '../services/Sketches'
import { CreateNotif } from '../services/Notifs'

import './CSS/Home.css'

import '../components/CSS/FriendList.css'

const Home = ({
  user,
  selSketch,
  setSelSketch,
  sendNotification,
  socket,
  hexColor,
  setHexColor,
  isLoading,
  setIsLoading,
  display,
  setDisplay
}) => {
  const canvasRef = createRef()
  const [sketchRecip, setSketchRecip] = useState(0)

  const [randomGreeting, setRandomGreeting] = useState(`What's In Your Brain?`)

  let chooseRandomGreeting = (randNum) => {
    switch (randNum) {
      case 1:
        setRandomGreeting(`What's In Your Brain?`)
        break
      case 2:
        setRandomGreeting(`What Grabs You Today?`)
        break
      case 3:
        setRandomGreeting(`What Persists Within You?`)
        break
      case 4:
        setRandomGreeting(`What Flows Through You?`)
        break
      case 5:
        setRandomGreeting(`What Comes To Mind?`)
        break
    }
  }

  useEffect(() => {
    let randNum = Math.floor(Math.random() * 5)
    chooseRandomGreeting(randNum)
  }, [])

  useEffect(() => {
    setTimeout(() => {
      setDisplay(null)
    }, 1500)
  }, [display])

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
      setDisplay('Sketch Sent!')
      sendNotification(friendId)
      const notif = await CreateNotif(friendId, sketch.id, {
        senderName: user.username
      })
    } else {
      const sketch = await SendSketch(friendId, selSketch.id, {
        sketchData: sketchData
      })
      setSketchRecip(friendId)
      setDisplay('Sketch Sent!')
      sendNotification(friendId)
      const notif = await CreateNotif(friendId, selSketch.id, {
        senderName: user.username
      })
    }
  }
  //////// SKETCH SEND LOGIC ///////////

  return (
    <div className="home-pg">
      <div className="home-top">
        <div className="welcome-msg">Welcome {user.username}</div>
        <div>
          <h1 className="home-title">{randomGreeting}</h1>
        </div>
      </div>
      <section className="home-body">
        {display ? <div className="display-text">{display}</div> : <div></div>}
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
              height={560}
              hexColor={hexColor}
              user={user}
              isLoading={isLoading}
              setDisplay={setDisplay}
              display={display}
              setIsLoading={setIsLoading}
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
    </div>
  )
}

export default Home
