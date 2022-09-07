import './App.css'
import Canvas from './components/Canvas'
import ColorPicker from './components/ColorPicker'
import { useState, createContext, useEffect } from 'react'
import { CheckSession } from './services/Auth'
import { useNavigate, Routes, Route } from 'react-router-dom'
import React from 'react'

import { w3cwebsocket as W3CWebSocket } from 'websocket'

import SignIn from './pages/SignIn'
import Register from './pages/Register'
import Nav from './components/Nav'
import Draw from './components/Hooks'
import axios from 'axios'
import { GetUserAndFriends } from './services/Users'

export const ColorProvider = createContext('#000000')

function App() {
  const [userId, setUserId] = useState(null)
  const [hexColor, setHexColor] = useState('#000000')
  const [authenticated, toggleAuthenticated] = useState(false)
  const [notifications, setNotifications] = useState()

  let url = `ws://localhost:8000/ws/socket-server/`
  const chatSocket = new WebSocket(url)

  useEffect(() => {
    chatSocket.onmessage = (e) => {
      let data = JSON.parse(e.data)
      console.log(data)

      if (data.type === 'chat') {
        setNotifications(data.message)
      }
    }
  }, [])

  let navigate = useNavigate()

  const handleLogOut = () => {
    setUserId(null)
    toggleAuthenticated(false)
    localStorage.clear()
  }

  const checkToken = async () => {
    const user = await CheckSession()
    setUserId(user)
    toggleAuthenticated(true)
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      checkToken()
    }
  }, [])

  useEffect(() => {
    const getUserData = async () => {
      const data = await GetUserAndFriends(userId)
      // let userId = JSON.stringify(data.id)
      localStorage.setItem('userId', userId)
    }
    getUserData()
  }, [userId])

  return (
    <ColorProvider.Provider value={hexColor}>
      <header>
        <Nav
          authenticated={authenticated}
          userId={userId}
          handleLogOut={handleLogOut}
        />
      </header>
      <main className="App">
        <div className="notification">Notifications go here</div>
        <Routes>
          <Route path="/register" element={<Register />}></Route>
          <Route
            path="/signin"
            element={
              <SignIn
                userId={userId}
                setUserId={setUserId}
                toggleAuthenticated={toggleAuthenticated}
              />
            }
          ></Route>
        </Routes>
        <ColorPicker hexColor={hexColor} setHexColor={setHexColor} />
        <Canvas width={700} height={500} hexColor={hexColor} />
      </main>
    </ColorProvider.Provider>
  )
}

export default App
