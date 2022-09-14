import './CSS/Canvas.css'
import Draw from './Hooks'
import tinycolor from 'tinycolor2'
import { createContext, useState, useEffect, useRef, createRef } from 'react'
import FriendsList from './FriendsList'
import LoadingSpinner from './LoadingSpinner'
import ColorPicker from '../components/ColorPicker'
import PromptColorPicker from './PromptColorPicker'

import pencil from '../pages/CSS/paintbrush.png'
import paintBrush from '../pages/CSS/brush.png'
import fractal from '../pages/CSS/galaxy-spiral.png'
import saveicon from '../pages/CSS/growth.png'
import undo from '../pages/CSS/eraser1.png'
import color from '../pages/CSS/zen3.png'

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
  prompt,
  isLoading,
  setIsLoading,
  sentDisplay,
  setSentDisplay
}) => {
  // const canvasRef = createRef()
  const isDrawingRef = useRef(false)
  const prevPoint = useRef(null)

  const lineArray = useRef([])
  const canvasData = useRef([])
  const canvasArray = useRef([])
  const lineCount = useRef(-1)

  const [hexToggle, setHexToggle] = useState(false)
  const [toolMenu, toggleToolMenu] = useState(false)
  const [drawToolState, setDrawToolState] = useState('line')
  const [toolSrc, setToolSrc] = useState(pencil)

  useEffect(() => {
    const setCanvasRef = async () => {
      if (selSketch) {
        const ctx = canvasRef.current.getContext('2d')
        let sketch = new Image()
        sketch.src = await selSketch.sketchData
        setTimeout(() => {
          ctx.drawImage(sketch, 0, 0)
          setIsLoading(false)
        }, 2000)
        canvasData.current = ctx.getImageData(0, 0, width, height)
        canvasArray.current.push(canvasData.current)
        lineArray.current = []
        lineCount.current++
      } else {
        alert(`Cannot access sketch at this time :(`)
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

  const showColor = () => {
    if (hexToggle) {
      setHexToggle(false)
    } else if (!hexToggle) {
      setHexToggle(true)
    }
  }

  const chooseTool = () => {
    if (toolMenu) {
      toggleToolMenu(false)
    } else if (!toolMenu) {
      toggleToolMenu(true)
    }
  }

  useEffect(() => {
    if (drawToolState === 'line') {
      setToolSrc(pencil)
    } else if (drawToolState === 'brush') {
      setToolSrc(paintBrush)
    } else if (drawToolState === 'fractal') {
      setToolSrc(fractal)
    }
  }, [drawToolState])

  const chooseDrawTool = (tool) => {
    setDrawToolState(tool)
    chooseTool()
  }

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
          showColor={showColor}
          hexColor={hexColor}
          setHexColor={setHexColor}
          prompt={prompt}
        />
      </div>
    )
  }

  return (
    <ImageDimensions.Provider value={{ width: width, height: height }}>
      <div className="canvas-container">
        {sentDisplay ? (
          <div className="sketch-sent-text">sketch sent!</div>
        ) : (
          <div></div>
        )}
        {isLoading ? <LoadingSpinner /> : <div></div>}
        <canvas
          width={width}
          height={height}
          className="canvas"
          ref={canvasRef}
          onMouseDown={drawAndSaveLine}
        ></canvas>
        <div className="control-panel">
          <img
            src={undo}
            className="ctn-btn ctn-btn-top"
            onClick={undoLine}
          ></img>
          <img className="ctn-btn" src={saveicon} onClick={saveSketch}></img>
          <img className="ctn-btn" src={toolSrc} onClick={chooseTool}></img>
          <img
            src={color}
            className="ctn-btn ctn-btn-bottom"
            style={{ backgroundColor: hexColor }}
            onClick={showColor}
          ></img>
          <div className="ctn-empty-space"></div>
        </div>
        {hexToggle ? colorPickerOption : <div></div>}
        {toolMenu ? (
          <div className="tool-toggle">
            <img
              className="tool"
              src={pencil}
              onClick={() => chooseDrawTool('line')}
            ></img>
            <img
              className="tool"
              src={paintBrush}
              onClick={() => chooseDrawTool('brush')}
            ></img>
            <img
              className="tool"
              src={fractal}
              onClick={() => chooseDrawTool('fractal')}
            ></img>
          </div>
        ) : (
          <div></div>
        )}
      </div>
      {/* </div> */}

      <h3></h3>
    </ImageDimensions.Provider>
  )
}
export default Canvas