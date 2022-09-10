import './CSS/Canvas.css'
import Draw from './Hooks'
import { createContext, useState, useEffect } from 'react'
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
  setHexColor,
  socket,
  sketchRecip,
  setSketchRecip,
  setMessageRecieved
}) => {
  const [hexToggle, setHexToggle] = useState(false)

  const [message, setMessage] = useState('')

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

  ///////// SOCKET ////////////
  const sendNotification = (id) => {
    socket.emit('send_message', { sketchRecip: id, user: user })
  }
  useEffect(() => {
    socket.on('receive_notification', (data) => {
      console.log(data.user.username)
      setMessageRecieved(data.user.username)
    })
  }, [socket])
  ///////// SOCKET ////////////

  const { drawAndSaveLine, setCanvasRef, undoLine, saveSketch, sendSketch } =
    Draw(
      onSketch,
      width,
      height,
      selSketch,
      setSelSketch,
      sketchRecip,
      setSketchRecip,
      sendNotification
    )

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
          <button
            className="ctn-btn ctn-btn-bottom"
            style={{ backgroundColor: hexColor }}
            onClick={showColor}
          >
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
      <FriendsList
        user={user}
        sendSketch={sendSketch}
        sketchRecip={sketchRecip}
        setSketchRecip={setSketchRecip}
      />
      <input
        placeholder="Message..."
        onChange={(event) => {
          setMessage(event.target.value)
        }}
      />
      {/* <button onClick={sendMessage}>SEND MSG</button> */}
      <h3></h3>
    </ImageDimensions.Provider>
  )
}
export default Canvas
