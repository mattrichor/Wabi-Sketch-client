import './App.css'

// COLORS: G #205A31 P #b55d84 B #3c4993 y #E1DA79

import { useState, useEffect, useRef, createContext } from 'react'
import { CheckSession } from './services/Auth'
import { useNavigate, Routes, Route } from 'react-router-dom'
import React from 'react'

import Home from './pages/Home'
import SignIn from './pages/SignIn'
import Register from './pages/Register'
import LoadingSpinner from './components/LoadingSpinner'
import Nav from './components/Nav'
import PreAmble from './pages/PreAmble'
import Notifications from './components/Notifications'

import { GetNotifs } from './services/Notifs'
import MySketches from './pages/MySketches'
import Explore from './pages/Explore'
import DailyPrompt from './pages/DailyPrompt'
import io from 'socket.io-client'
import { BASE_URL } from './services/api'

export const ColorProvider = createContext('#B3B3B3')
const socket = io.connect(BASE_URL)

function App() {
  const [colorWay, setColorWay] = useState('')
  const [user, setUser] = useState({})
  const [selSketch, setSelSketch] = useState({})

  const [authenticated, toggleAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const [promptCanvas, setPromptCanvas] = useState(false)
  const [notifications, setNotifications] = useState(null)

  const [hexColor, setHexColor] = useState('#B3B3B3')

  const initRoom = (user) => {
    if (authenticated) {
      socket.emit('create_room', user.id)
    }
  }

  useEffect(() => {
    checkNotifs()
  }, [selSketch, authenticated])

  useEffect(() => {
    initRoom(user)
  }, [user && authenticated])

  useEffect(() => {
    let today = new Date()
    let now = today.getTime() / 10000
    var randomColor = Math.floor(Math.random() * 16777215).toString(16)
    setHexColor(`#${randomColor}`)
  }, [])

  const client = useRef(null)

  let navigate = useNavigate()

  const handleLogOut = () => {
    setUser(null)
    toggleAuthenticated(false)
    localStorage.clear()
    setSelSketch({})
    setNotifications(null)
  }

  const checkToken = async () => {
    const user = await CheckSession()
    setUser(user)
    toggleAuthenticated(true)
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      checkToken()
    }
  }, [])

  /////// SOCKET ////////////

  const checkNotifs = async () => {
    let user = JSON.parse(localStorage.getItem('userObj'))
    const notifs = await GetNotifs(user.id)
    setNotifications(notifs)
  }

  const sendNotification = (id) => {
    socket.emit('send_sketch', { sketchRecip: id, user: user })
  }
  useEffect(() => {
    socket.on('receive_notification', () => {
      checkNotifs()
    })
  }, [socket])
  /////// SOCKET ////////////

  return (
    <ColorProvider.Provider value={hexColor}>
      <div>
        <Nav
          authenticated={authenticated}
          user={user}
          handleLogOut={handleLogOut}
        />
        <Notifications
          socket={socket}
          notifications={notifications}
          setSelSketch={setSelSketch}
          isLoading={isLoading}
          setIsLoading={setIsLoading}
        />
        <main className="App">
          <Routes>
            <Route path="/register" element={<Register />}></Route>
            <Route
              path="/signin"
              element={
                <SignIn
                  user={user}
                  setUser={setUser}
                  toggleAuthenticated={toggleAuthenticated}
                />
              }
            ></Route>
            <Route path="/" element={<PreAmble />}></Route>
            <Route
              path="/home"
              element={
                <Home
                  setPromptCanvas={setPromptCanvas}
                  user={user}
                  selSketch={selSketch}
                  setSelSketch={setSelSketch}
                  sendNotification={sendNotification}
                  socket={socket}
                  checkNotifs={checkNotifs}
                  notifications={notifications}
                  hexColor={hexColor}
                  setHexColor={setHexColor}
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                />
              }
            ></Route>
            <Route
              path="/explore"
              element={
                <Explore
                  user={user}
                  selSketch={selSketch}
                  setSelSketch={setSelSketch}
                  socket={socket}
                  checkNotifs={checkNotifs}
                  notifications={notifications}
                />
              }
            ></Route>
            <Route
              path="/daily_muse"
              element={
                <DailyPrompt
                  setPromptCanvas={setPromptCanvas}
                  promptCanvas={promptCanvas}
                  user={user}
                  selSketch={selSketch}
                  setSelSketch={setSelSketch}
                  socket={socket}
                  checkNotifs={checkNotifs}
                  notifications={notifications}
                  hexColor={hexColor}
                  setHexColor={setHexColor}
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                />
              }
            ></Route>
            <Route
              path="/my_sketches"
              element={
                <MySketches
                  user={user}
                  selSketch={selSketch}
                  setSelSketch={setSelSketch}
                  socket={socket}
                  checkNotifs={checkNotifs}
                  notifications={notifications}
                  isLoading={isLoading}
                  setIsLoading={setIsLoading}
                />
              }
            ></Route>
          </Routes>
        </main>
      </div>
    </ColorProvider.Provider>
  )
}

export default App
