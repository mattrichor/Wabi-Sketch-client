import { useEffect, useRef, useContext } from 'react'
import { ColorProvider } from '../App'
import { SaveSketch, SendSketch, UploadSketch } from '../services/Sketches'
import { CreateNotif } from '../services/Notifs'

const Draw = (
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
  prompt,
  setDisplay
) => {
  const hexColor = useContext(ColorProvider)

  const mouseMoveRef = useRef(null)
  const mouseUnclickRef = useRef(null)

  useEffect(() => {
    const initializeMouseMoveListener = () => {
      const mouseMoveListener = (event) => {
        const pointInCanvas = getCanvasCoords(event.clientX, event.clientY)
        const ctx = canvasRef.current.getContext('2d')

        if (isDrawingRef.current) {
          lineArray.current.push({
            ctx: ctx,
            start: prevPoint.current,
            end: pointInCanvas,
            hexColor
          })
          onSketch(lineArray.current)
          prevPoint.current = pointInCanvas
        }
      }
      mouseMoveRef.current = mouseMoveListener
      window.addEventListener('mousemove', mouseMoveListener)
    }

    const getCanvasCoords = (x, y) => {
      if (canvasRef.current) {
        const canvasCoord = canvasRef.current.getBoundingClientRect()
        return {
          x: x - canvasCoord.left,
          y: y - canvasCoord.top
        }
      }
    }
    const cleanUpListeners = () => {
      if (mouseMoveRef.current) {
        window.removeEventListener('mousemove', mouseMoveRef.current)
      }
    }
    initializeMouseMoveListener()

    return () => {
      cleanUpListeners()
    }
  }, [onSketch])

  const drawAndSaveLine = () => {
    if (!isDrawingRef.current) {
      isDrawingRef.current = true
    } else if (isDrawingRef.current) {
      isDrawingRef.current = false
      prevPoint.current = null
      const ctx = canvasRef.current.getContext('2d')
      canvasData.current = ctx.getImageData(0, 0, width, height)
      canvasArray.current.push(canvasData.current)
      lineArray.current = []
      lineCount.current++
    }
  }

  const undoLine = () => {
    const ctx = canvasRef.current.getContext('2d')
    if (lineCount.current === 0) {
      ctx.clearRect(0, 0, width, height)
      canvasArray.current.pop()
      lineCount.current--
      if (selSketch) {
        let sketch = new Image()
        sketch.src = selSketch.sketchData
        ctx.drawImage(sketch, 0, 0)
        canvasData.current = ctx.getImageData(0, 0, width, height)
        canvasArray.current.push(canvasData.current)
      }
    } else {
      ctx.putImageData(canvasArray.current[lineCount.current - 1], 0, 0)
      canvasArray.current.pop()
      lineCount.current--
    }
  }

  const saveSketch = async () => {
    const sketchData = canvasRef.current.toDataURL('image/png', 1)
    let user = JSON.parse(localStorage.getItem('userObj'))
    if (prompt) {
      if (selSketch.id !== undefined) {
        const sketch = await SaveSketch(user.id, selSketch.id, {
          sketchData: sketchData,
          promptId: prompt.id
        })
        setDisplay('Sketch Saved!')
      } else {
        const sketch = await UploadSketch(user.id, {
          sketchData: sketchData,
          promptId: prompt.id
        })
        setSelSketch(sketch)
        setDisplay('Sketch Uploaded!')
      }
    } else if (!prompt) {
      if (selSketch.id !== undefined) {
        const sketch = await SaveSketch(user.id, selSketch.id, {
          sketchData: sketchData
        })
        setDisplay('Sketch Saved!')
      } else {
        const sketch = await UploadSketch(user.id, {
          sketchData: sketchData
        })
        setSelSketch(sketch)
        setDisplay('Sketch Uploaded!')
      }
    }
  }

  return {
    drawAndSaveLine,
    undoLine,
    saveSketch
  }
}

export default Draw
