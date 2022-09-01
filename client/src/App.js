import './App.css'
import Canvas from './components/Canvas'
import { useState } from 'react'

function App() {
  const [hexColor, setHexColor] = useState('#000000')

  return (
    <div className="App">
      <Canvas width={700} height={500} hexColor={hexColor} />
    </div>
  )
}

export default App
