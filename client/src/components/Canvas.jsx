import './CSS/Canvas.css'
import Draw from './Hooks'
import { createContext } from 'react'
import FriendsList from './FriendsList'

export const ImageDimensions = createContext({ width: 0, height: 0 })

const Canvas = ({ width, height, user }) => {
  const onSketch = (data) => {
    // if (point.x >= 0 && point.x <= width && point.y >= 0 && point.y <= height) {
    data.map((point) => {
      fillPoints(point.start, point.end, point.ctx, point.hexColor, 4)
      point.ctx.fillStyle = point.hexColor
    })
  }

  const fillPoints = (start, end, ctx, hexColor, width) => {
    if (!start) {
      start = end
    }
    ctx.beginPath()
    ctx.lineWidth = width
    ctx.strokeStyle = hexColor
    ctx.moveTo(start.x, start.y)
    ctx.lineTo(end.x, end.y)
    ctx.stroke()
    ctx.beginPath()
    ctx.arc(start.x, start.y, 1.8, 0, 1.8 * Math.PI)
    ctx.fill()
  }

  const { drawAndSaveLine, setCanvasRef, undoLine, saveSketch, sendSketch } =
    Draw(onSketch, width, height)

  return (
    <ImageDimensions.Provider value={{ width: width, height: height }}>
      <div className="canvas-container">
        <canvas
          width={width}
          height={height}
          className="canvas"
          ref={setCanvasRef}
          onMouseDown={drawAndSaveLine}
        ></canvas>
        <button onClick={undoLine}>UNDO</button>
        <button onClick={saveSketch}>SAVE</button>
        <button>COLOR</button>
      </div>
      <FriendsList user={user} sendSketch={sendSketch} />
    </ImageDimensions.Provider>
  )
}
export default Canvas
