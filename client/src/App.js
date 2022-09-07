import './App.css'

import { useState, useEffect, useRef } from 'react'
import { CheckSession } from './services/Auth'
import { useNavigate, Routes, Route } from 'react-router-dom'
import React from 'react'

import useWebSocket, { ReadyState } from 'react-use-websocket'

import Home from './pages/Home'
import SignIn from './pages/SignIn'
import Register from './pages/Register'
import Nav from './components/Nav'
import PreAmble from './pages/PreAmble'

import Draw from './components/Hooks'
import axios from 'axios'
import { GetUserAndFriends } from './services/Users'

function App() {
  const [user, setUser] = useState({})

  const [authenticated, toggleAuthenticated] = useState(false)

  const [notifications, setNotifications] = useState()
  const [formValue, setFormValue] = useState('')

  const client = useRef(null)

  let navigate = useNavigate()

  const handleLogOut = () => {
    setUser(null)
    toggleAuthenticated(false)
    localStorage.clear()
  }

  const checkToken = async () => {
    const user = await CheckSession()
    setUser(user)
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

  // useEffect(() => {
  //   const getUserData = async () => {
  //     const data = await GetUserAndFriends(userId)
  //     // let userId = JSON.stringify(data.id)
  //     localStorage.setItem('userId', userId)
  //   }
  //   getUserData()
  // }, [userId])

  return (
    <div>
      <header>
        <Nav
          authenticated={authenticated}
          user={user}
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
                user={user}
                setUser={setUser}
                toggleAuthenticated={toggleAuthenticated}
              />
            }
          ></Route>
          <Route path="/" element={<PreAmble />}></Route>
          <Route path="/home" element={<Home />}></Route>
        </Routes>

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
    </div>
  )
}

export default App
