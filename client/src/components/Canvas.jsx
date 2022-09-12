import './CSS/Canvas.css'
import Draw from './Hooks'
import tinycolor from 'tinycolor2'
import { createContext, useState, useEffect, useRef, createRef } from 'react'
import FriendsList from './FriendsList'
import ColorPicker from '../components/ColorPicker'
import PromptColorPicker from './PromptColorPicker'

import { SaveSketch, SendSketch, UploadSketch } from '../services/Sketches'
import { CreateNotif } from '../services/Notifs'

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
  canvasRef,
  sendNotification,
  promptCanvas,
  prompt
}) => {
  // const canvasRef = createRef()
  const isDrawingRef = useRef(false)
  const prevPoint = useRef(null)

  const lineArray = useRef([])
  const canvasData = useRef([])
  const canvasArray = useRef([])
  const lineCount = useRef(-1)

  const [hexToggle, setHexToggle] = useState(false)
  const [drawToolState, setDrawToolState] = useState('line')
  const [message, setMessage] = useState('')

  useEffect(() => {
    const setCanvasRef = async () => {
      if (selSketch) {
        const ctx = canvasRef.current.getContext('2d')
        let sketch = new Image()
        sketch.src = await selSketch.sketchData
        setTimeout(() => {
          ctx.drawImage(sketch, 0, 0)
        }, 3000)
        canvasData.current = ctx.getImageData(0, 0, width, height)
        canvasArray.current.push(canvasData.current)
        lineArray.current = []
        lineCount.current++
      } else {
        console.log('not loaded...')
      }
    }

    setCanvasRef()
  }, [selSketch])

  const varyColor = (color) => {
    const amount = Math.round(Math.random() * 10)
    const c = tinycolor(color)
    const varied = amount > 5 ? c.brighten(amount - 5) : c.darken(amount)
    return varied.toHexString()
  }

  const onSketch = (data) => {
    // if (point.x >= 0 && point.x <= width && point.y >= 0 && point.y <= height) {
    data.map((point) => {
      fillPoints(point.start, point.end, point.ctx, point.hexColor, 4)
      point.ctx.fillStyle = point.hexColor
    })
  }

  const strokeBristle = (ctx, start, end, width, variedColor) => {
    ctx.beginPath()

    ctx.moveTo(start.originX, start.originY)
    ctx.strokeStyle = variedColor
    ctx.lineWidth = width
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.shadowColor = variedColor
    ctx.shadowBlur = width / 3
    ctx.lineTo(end.destinationX, end.destinationY)
    ctx.stroke()
    ctx.fill()
  }

  const chooseTool = () => {}

  const fillPoints = (start, end, ctx, hexColor, width) => {
    if (!start) {
      start = end
    }
    const strokeWidth = width * 5.5
    const bristleCount = Math.round(strokeWidth / 3)
    const gap = strokeWidth / bristleCount

    if (drawToolState === 'brush') {
      for (let i = 0; i < bristleCount; i++) {
        let variedColor = varyColor(hexColor)
        strokeBristle(
          ctx,
          {
            originX: start.x + (i * gap) / 2,
            originY: start.y + (i * gap) / 2
          },
          {
            destinationX: end.x + (i * gap) / 2,
            destinationY: end.y + (i * gap) / 2
          },
          1.5,
          variedColor
        )
      }
    }

    ctx.beginPath()
    ctx.lineWidth = width
    ctx.strokeStyle = hexColor
    ctx.moveTo(start.x, start.y)
    ctx.lineTo(end.x, end.y)
    ctx.stroke()
    ctx.lineCap = 'round'
    ctx.lineJoin = 'round'
    ctx.beginPath()
    ctx.arc(start.x, start.y, 1.8, 0, 1.8 * Math.PI)
    ctx.fill()
  }

  const { drawAndSaveLine, undoLine, saveSketch } = Draw(
    onSketch,
    width,
    height,
    canvasRef,
    isDrawingRef,
    prevPoint,
    lineArray,
    canvasData,
    canvasArray,
    lineCount,
    selSketch,
    setSelSketch,
    sketchRecip,
    setSketchRecip,
    sendNotification,
    prompt
  )

  let colorPickerOption
  if (!promptCanvas) {
    colorPickerOption = (
      <div className="color-picker">
        <ColorPicker hexColor={hexColor} setHexColor={setHexColor} />
      </div>
    )
  } else if (promptCanvas) {
    colorPickerOption = (
      <div className="color-picker">
        <PromptColorPicker
          hexColor={hexColor}
          setHexColor={setHexColor}
          prompt={prompt}
        />
      </div>
    )
  }

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
          ref={canvasRef}
          onMouseDown={drawAndSaveLine}
        ></canvas>
        <div className="control-panel">
          <button className="ctn-btn ctn-btn-top" onClick={undoLine}>
            UNDO
          </button>
          <button className="ctn-btn" onClick={saveSketch}>
            SAVE
          </button>
          <button className="ctn-btn" onClick={chooseTool}>
            TOOL
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
        {hexToggle ? colorPickerOption : <div></div>}
      </div>
      {/* </div> */}

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
