import './App.css'
import Canvas from './components/Canvas'
import ColorPicker from './components/ColorPicker'
import { useState, createContext, useEffect } from 'react'
import { CheckSession } from './services/Auth'
import { useNavigate, Routes, Route } from 'react-router-dom'
import React from 'react'

import SignIn from './pages/SignIn'
import Register from './pages/Register'
import Nav from './components/Nav'
import Draw from './components/Hooks'

export const ColorProvider = createContext('#000000')

// const canvasArray

function App() {
  const [user, setUser] = useState(null)
  const [hexColor, setHexColor] = useState('#000000')
  const [authenticated, toggleAuthenticated] = useState(false)

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

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      checkToken()
    }
  }, [])

  return (
    <ColorProvider.Provider value={hexColor}>
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
          <Route path="/signin" element={<SignIn />}></Route>
          <Route></Route>
        </Routes>
        <ColorPicker hexColor={hexColor} setHexColor={setHexColor} />
        <Canvas width={700} height={500} hexColor={hexColor} />
      </main>
    </ColorProvider.Provider>
  )
}

export default App
