import './CSS/Canvas.css'
import Draw from './Hooks'
import { createContext, useState } from 'react'
import FriendsList from './FriendsList'
import ColorPicker from '../components/ColorPicker'

export const ImageDimensions = createContext({ width: 0, height: 0 })

const Canvas = ({
  width,
  height,
  user,
  selSketch,
  setSelSketch,
  hexColor,
  setHexColor
}) => {
  const [hexToggle, setHexToggle] = useState(false)

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
    Draw(onSketch, width, height, selSketch)

  const showColor = () => {
    if (hexToggle) {
      setHexToggle(false)
    } else if (!hexToggle) {
      setHexToggle(true)
    }
  }

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
        <div className="control-panel">
          <button className="ctn-btn ctn-btn-top" onClick={undoLine}>
            UNDO
          </button>
          <button className="ctn-btn" onClick={saveSketch}>
            SAVE
          </button>
          <button className="ctn-btn ctn-btn-bottom" onClick={showColor}>
            COLOR
          </button>
          <div className="ctn-empty-space"></div>
        </div>
        {hexToggle ? (
          <div className="color-picker">
            <ColorPicker hexColor={hexColor} setHexColor={setHexColor} />
          </div>
        ) : (
          <div></div>
        )}
      </div>
      <FriendsList user={user} sendSketch={sendSketch} />
    </ImageDimensions.Provider>
  )
}
export default Canvas
