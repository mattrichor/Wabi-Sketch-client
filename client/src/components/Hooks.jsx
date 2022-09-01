import { useEffect, useRef, useContext } from 'react'
import { ColorProvider } from '../App'

const Draw = (onSketch) => {
  const canvasRef = useRef(null)

  const hexColor = useContext(ColorProvider)

  const isDrawingRef = useRef(false)

  const setCanvasRef = (ref) => {
    if (!ref) {
      return
    } else {
      canvasRef.current = ref
      initializeMouseMoveListener()
      initializeMouseClickListener()
    }
  }

  const initializeMouseClickListener = () => {
    if (!canvasRef.current) {
      return
    }
    const listener = () => {
      isDrawingRef.current = true
    }
    canvasRef.current.addEventListener('mousedown', listener)
  }

  const initializeMouseMoveListener = () => {
    const mouseMoveListener = (event) => {
      const pointInCanvas = getCanvasCoords(event.clientX, event.clientY)
      const context = canvasRef.current.getContext('2d')
      if (isDrawingRef.current) {
        onSketch(context, pointInCanvas, hexColor)
      }
    }
    return mouseMoveListener
  }

  useEffect(() => {
    let mouseMoveListener = initializeMouseMoveListener()
    if (canvasRef) {
      window.addEventListener('mousemove', mouseMoveListener)
    }
    return () => {
      window.removeEventListener('mousemove', mouseMoveListener)
    }
  }, [canvasRef])

  const getCanvasCoords = (x, y) => {
    if (canvasRef.current) {
      const canvasCoord = canvasRef.current.getBoundingClientRect()
      return {
        x: x - canvasCoord.left,
        y: y - canvasCoord.top
      }
    }
  }

  return setCanvasRef
}

export default Draw
