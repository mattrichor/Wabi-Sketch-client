import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Canvas from '../components/Canvas'
import ColorPicker from '../components/ColorPicker'
// import '../Home.css'
const PreAmble = () => {
  let navigate = useNavigate()
  const [hexColor, setHexColor] = useState('#000000')

  return (
    <div className="home">
      <div className="home-title">
        <h1>What's in your brain?</h1>
      </div>
      <section>
        <ColorPicker hexColor={hexColor} setHexColor={setHexColor} />
        <div className="canvas">
          <Canvas width={700} height={500} hexColor={hexColor} />
        </div>
      </section>
    </div>
  )
}

export default PreAmble
