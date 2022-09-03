import './App.css'
import Canvas from './components/Canvas'
import ColorPicker from './components/ColorPicker'
import { useState } from 'react'
import { createContext } from 'react'
import React from 'react'
import Draw from './components/Hooks'

export const ColorProvider = createContext('#000000')

// const canvasArray

function App() {
  const [hexColor, setHexColor] = useState('#000000')

  const undoLine = () => {
    // console.log(canvasArray)
    // canvasArray.current.pop()
  }

  return (
    <ColorProvider.Provider value={hexColor}>
      <div className="App">
        <ColorPicker hexColor={hexColor} setHexColor={setHexColor} />
        <Canvas width={700} height={500} hexColor={hexColor} />
      </div>
    </ColorProvider.Provider>
  )
}

export default App
