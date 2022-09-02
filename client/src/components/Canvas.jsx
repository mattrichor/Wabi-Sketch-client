import './Canvas.css'
import Draw from './Hooks'

const Canvas = ({ width, height }) => {
  const canvasArray = []

  const onSketch = (ctx, point, hexColor, prevPoint) => {
    // console.log(hexColor)
    if (point.x >= 0 && point.x <= width && point.y >= 0 && point.y <= height) {
      fillPoints(prevPoint, point, ctx, hexColor, 4)
      ctx.fillStyle = hexColor
      console.log(canvasArray)
    }
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
    canvasArray.push({ x: start.x, y: start.y, hexColor })
    ctx.fill()
  }

  const { drawAndSaveLine, setCanvasRef } = Draw(onSketch)
  // const setCanvasRef = Draw(onSketch)

  return (
    <div className="canvas-container">
      <canvas
        width={width}
        height={height}
        className="canvas"
        ref={setCanvasRef}
        onMouseDown={drawAndSaveLine}
      ></canvas>
    </div>
  )
}
export default Canvas
