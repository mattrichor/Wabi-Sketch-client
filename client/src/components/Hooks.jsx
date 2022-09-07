import { useEffect, useRef, useContext } from 'react'
import { ColorProvider } from '../pages/Home'
import { SaveSketch } from '../services/Sketches'

const Draw = (onSketch, width, height) => {
  const hexColor = useContext(ColorProvider)

  const canvasRef = useRef(null)
  const isDrawingRef = useRef(false)
  const prevPoint = useRef(null)

  const mouseMoveRef = useRef(null)
  const mouseUnclickRef = useRef(null)

  const lineArray = useRef([])
  const canvasData = useRef([])
  const canvasArray = useRef([])
  const lineCount = useRef(-1)

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

    // const initializeMouseUnclickListener = () => {
    //   const listener = () => {
    //     isDrawingRef.current = false
    //     prevPoint.current = null
    //   }
    //   window.addEventListener('mouseup', listener)
    // }

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
      // if (mouseUnclickRef.current) {
      //   window.removeEventListener('mouseup', mouseUnclickRef.current)
      // }
    }
    initializeMouseMoveListener()
    // initializeMouseUnclickListener()

    return () => {
      cleanUpListeners()
    }
  }, [onSketch])

  const setCanvasRef = (ref) => {
    canvasRef.current = ref
  }

  const drawAndSaveLine = () => {
    if (!isDrawingRef.current) {
      isDrawingRef.current = true
    } else if (isDrawingRef.current) {
      isDrawingRef.current = false
      prevPoint.current = null
      const ctx = canvasRef.current.getContext('2d')
      canvasData.current = ctx.getImageData(0, 0, width, height)
      console.log(canvasData.current)
      canvasArray.current.push(canvasData.current)
      lineArray.current = []
      lineCount.current++
      console.log(lineCount.current)
      // console.log(canvasArray)
    }
  }

  const undoLine = () => {
    const ctx = canvasRef.current.getContext('2d')
    if (lineCount.current === 0) {
      ctx.clearRect(0, 0, width, height)
      canvasArray.current.pop()
      lineCount.current--
    } else {
      ctx.putImageData(canvasArray.current[lineCount.current - 1], 0, 0)
      canvasArray.current.pop()
      lineCount.current--
    }
  }

  const saveSketch = async () => {
    console.log('clickd')
    const ctx = canvasRef.current.getContext('2d')
    const thumbnail = canvasRef.current.toDataURL('image/png', 0.2)
    console.log(thumbnail)
    let sketchData = ctx.getImageData(0, 0, width, height)
    let date = 12
    let user = JSON.parse(localStorage.getItem('userObj'))
    console.log(sketchData)
    const sketch = await SaveSketch(user.id, {
      sketchData: sketchData,
      thumbnail: thumbnail
    })
    console.log(sketch)
  }

  return {
    setCanvasRef,
    drawAndSaveLine,
    undoLine,
    saveSketch
  }
}

export default Draw
