import './App.css'

// COLORS: G #205A31 P #b55d84 B #3c4993 y #E1DA79

import { useState, useEffect, useRef } from 'react'
import { CheckSession } from './services/Auth'
import { useNavigate, Routes, Route } from 'react-router-dom'
import React from 'react'

import Home from './pages/Home'
import SignIn from './pages/SignIn'
import Register from './pages/Register'
import Nav from './components/Nav'
import PreAmble from './pages/PreAmble'

import Draw from './components/Hooks'
import axios from 'axios'
import { GetUserAndFriends } from './services/Users'
import MySketches from './pages/MySketches'
import Explore from './pages/Explore'
import DailyPrompt from './pages/DailyPrompt'

function App() {
  const [user, setUser] = useState({})
  const [selSketch, setSelSketch] = useState({})

  const [authenticated, toggleAuthenticated] = useState(false)

  const [notifications, setNotifications] = useState()
  const [formValue, setFormValue] = useState('')

  const client = useRef(null)

  let navigate = useNavigate()

  const handleLogOut = () => {
    setUser(null)
    toggleAuthenticated(false)
    localStorage.clear()
    setSelSketch({})
  }

  const checkToken = async () => {
    const user = await CheckSession()
    console.log(user)
    setUser(user)
    toggleAuthenticated(true)
  }

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      checkToken()
    }
  }, [])

  return (
    <div>
      <Nav
        authenticated={authenticated}
        user={user}
        handleLogOut={handleLogOut}
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
                user={user}
                selSketch={selSketch}
                setSelSketch={setSelSketch}
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
              />
            }
          ></Route>
          <Route
            path="/daily_muse"
            element={<DailyPrompt user={user} />}
          ></Route>
          <Route
            path="/my_sketches"
            element={
              <MySketches
                user={user}
                selSketch={selSketch}
                setSelSketch={setSelSketch}
              />
            }
          ></Route>
        </Routes>
      </main>
    </div>
  )
}

export default App
