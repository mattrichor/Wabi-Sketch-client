import './App.css'
import Canvas from './components/Canvas'
import ColorPicker from './components/ColorPicker'
import { useState, createContext, useEffect } from 'react'
import { CheckSession } from './services/Auth'
import { useNavigate, Routes, Route } from 'react-router-dom'
import React from 'react'

import useWebSocket, { ReadyState } from 'react-use-websocket'

import SignIn from './pages/SignIn'
import Register from './pages/Register'
import Nav from './components/Nav'
import Home from './pages/Home'

import Draw from './components/Hooks'
import axios from 'axios'
import { GetUserAndFriends } from './services/Users'

export const ColorProvider = createContext('#000000')

function App() {
  const [userId, setUserId] = useState(null)
  const [hexColor, setHexColor] = useState('#000000')
  const [authenticated, toggleAuthenticated] = useState(false)

  const [notifications, setNotifications] = useState()
  const [formValue, setFormValue] = useState('')

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

  ///////// SOCKET ////////////

  let url = `ws://localhost:8000/ws/socket-server/`
  const chatSocket = new WebSocket(url)

  useEffect(() => {
    chatSocket.onMessage = (e) => {
      let data = JSON.parse(e.data)
      console.log(data)

      if (data.type === 'chat') {
        console.log(data.message)
        setNotifications(data.message)
      }
    }
  }, [])

  const handleChange = (e) => {
    setFormValue(e.target.value)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    chatSocket.send(JSON.stringify(formValue))
    console.log(formValue)
    setFormValue('')
  }

  ///////// SOCKET ////////////

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
          <Route path="/" element={<Home />}></Route>
        </Routes>
        <ColorPicker hexColor={hexColor} setHexColor={setHexColor} />
        <div className="canvas">
          <Canvas width={700} height={500} hexColor={hexColor} />
        </div>
        <div className="notification">
          Notifications go here
          <form onSubmit={handleSubmit}>
            <input
              type="message"
              onChange={handleChange}
              name="message"
              placeholder="message"
              value={formValue}
            ></input>
          </form>
        </div>
      </main>
    </ColorProvider.Provider>
  )
}

export default App
