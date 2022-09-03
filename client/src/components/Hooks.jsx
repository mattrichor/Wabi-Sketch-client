import { useEffect, useRef, useContext } from 'react'
import { ColorProvider } from '../App'

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
      console.log(canvasArray.current)
      lineArray.current = []
      // console.log(canvasArray)
    }
  }

  const undoLine = () => {
    console.log('CLICKED ')
    const ctx = canvasRef.current.getContext('2d')
    ctx.putImageData(canvasArray.current[0], 0, 0)
  }

  return {
    setCanvasRef,
    drawAndSaveLine,
    undoLine
  }
}

export default Draw
