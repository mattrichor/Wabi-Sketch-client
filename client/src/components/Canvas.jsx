import './Canvas.css'
import Draw from './Hooks'
import { createContext } from 'react'

export const ImageDimensions = createContext({ width: 0, height: 0 })

const Canvas = ({ width, height }) => {
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
    // console.log(ctx)
    ctx.beginPath()
    ctx.lineWidth = width
    ctx.strokeStyle = hexColor
    ctx.moveTo(start.x, start.y)
    ctx.lineTo(end.x, end.y)
    ctx.stroke()
    ctx.beginPath()
    ctx.arc(start.x, start.y, 1.8, 0, 1.8 * Math.PI)
    // lineArray.push({ start: start, end: end, hexColor, ctx })
    ctx.fill()
    // let imageData = ctx.getImageData(0, 0, width, height)

    // // ctx.putImageData(imageData, 0, 0)
    // console.log(imageData)
  }

  const { drawAndSaveLine, setCanvasRef, undoLine, saveSketch } = Draw(
    onSketch,
    width,
    height
  )
  // const setCanvasRef = Draw(onSketch)

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
    </ImageDimensions.Provider>
  )
}
export default Canvas
