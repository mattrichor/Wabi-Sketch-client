import './Canvas.css'
import Draw from './Hooks'

const Canvas = ({ width, height }) => {
  const onSketch = (data) => {
    // console.log(hexColor)
    // if (point.x >= 0 && point.x <= width && point.y >= 0 && point.y <= height) {
    data.map((point) => {
      fillPoints(point.start, point.end, point.ctx, point.hexColor, 4)
      point.ctx.fillStyle = point.hexColor
    })
    // console.log(data[1].ctx)

    // console.log(lineArray)
    // }
  }

  const fillPoints = (start, end, ctx, hexColor, width) => {
    if (!start) {
      start = end
    }
    console.log(ctx)
    ctx.beginPath()
    ctx.lineWidth = width
    ctx.strokeStyle = hexColor
    ctx.moveTo(start.x, start.y)
    ctx.lineTo(end.x, end.y)
    ctx.stroke()
    ctx.beginPath()
    ctx.arc(start.x, start.y, 1.8, 0, 1.8 * Math.PI)
    // lineArray.push({ start: start, end: end, hexColor, ctx })
    // console.log(lineArray)
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
