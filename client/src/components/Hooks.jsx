import { useEffect, useRef, useContext } from 'react'
import { ColorProvider } from '../App'

const Draw = (onSketch) => {
  const canvasRef = useRef(null)

  const hexColor = useContext(ColorProvider)

  const isDrawingRef = useRef(false)
  const prevPoint = useRef(null)

  const setCanvasRef = (ref) => {
    if (!ref) {
      return
    } else {
      canvasRef.current = ref
      initializeMouseMoveListener()
      initializeMouseClickListener()
      initializeMouseUnclickListener()
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

  const initializeMouseUnclickListener = () => {
    const listener = () => {
      isDrawingRef.current = false
      prevPoint.current = null
    }
    window.addEventListener('mouseup', listener)
  }

  const initializeMouseMoveListener = () => {
    const mouseMoveListener = (event) => {
      const pointInCanvas = getCanvasCoords(event.clientX, event.clientY)
      const context = canvasRef.current.getContext('2d')
      if (isDrawingRef.current) {
        onSketch(context, pointInCanvas, hexColor, prevPoint.current)
        prevPoint.current = pointInCanvas
        console.log()
      }
    }
    return mouseMoveListener
  }

  useEffect(() => {
    let mouseMoveListener = initializeMouseMoveListener()
    let mouseClickListener = initializeMouseClickListener()
    let mouseUnclickListener = initializeMouseUnclickListener()
    if (canvasRef) {
      window.addEventListener('mousemove', mouseMoveListener)
    }
    return () => {
      window.removeEventListener('mousemove', mouseMoveListener)
      canvasRef.current.removeEventListener('mousedown', mouseClickListener)
      window.removeEventListener('mouseup', mouseUnclickListener)
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
