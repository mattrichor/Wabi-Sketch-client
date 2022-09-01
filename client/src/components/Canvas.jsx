import { useState } from 'react'
import './Canvas.css'
import Draw from './Hooks'

const Canvas = ({ width, height, hexColor }) => {
  //   const [canvasArray, setCanvasArray] = useState([])
  const canvasArray = []

  const onSketch = (ctx, point) => {
    if (point.x >= 0 && point.x <= width && point.y >= 0 && point.y <= height) {
      ctx.fillStyle = hexColor
      ctx.beginPath()
      ctx.arc(point.x, point.y, 2, 0, 2 * Math.PI)
      canvasArray.push({ x: point.x, y: point.y, hexColor })
      console.log(canvasArray)
      ctx.fill()
    }
  }
  const setCanvasRef = Draw(onSketch)

  return (
    <div className="canvas-container">
      <canvas
        width={width}
        height={height}
        className="canvas"
        ref={setCanvasRef}
      ></canvas>
    </div>
  )
}
export default Canvas
