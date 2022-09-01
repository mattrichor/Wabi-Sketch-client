import { useEffect, useRef } from 'react'

const Draw = (onSketch) => {
  const canvasRef = useRef(null)

  const setCanvasRef = (ref) => {
    if (!ref) {
      return
    } else {
      canvasRef.current = ref
      initializeMouseMoveListener()
    }
  }

  const initializeMouseMoveListener = () => {
    const mouseMoveListener = (event) => {
      const pointInCanvas = getCanvasCoords(event.clientX, event.clientY)
      const context = canvasRef.current.getContext('2d')
      if (onSketch && canvasRef.current) {
        onSketch(context, pointInCanvas)
      }
    }
    return mouseMoveListener
    // ref.addEventListener('mousemove', mouseMoveListener)
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
