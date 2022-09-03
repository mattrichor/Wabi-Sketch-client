import { useEffect, useRef, useContext } from 'react'
import { ColorProvider } from '../App'

const Draw = (onSketch) => {
  const hexColor = useContext(ColorProvider)

  const canvasRef = useRef(null)
  const isDrawingRef = useRef(false)
  const prevPoint = useRef(null)

  const mouseMoveRef = useRef(null)
  const mouseUnclickRef = useRef(null)

  const lineArray = useRef([])
  const canvasArray = useRef([])

  useEffect(() => {
    const initializeMouseMoveListener = () => {
      const mouseMoveListener = (event) => {
        const pointInCanvas = getCanvasCoords(event.clientX, event.clientY)
        const context = canvasRef.current.getContext('2d')
        if (isDrawingRef.current) {
          lineArray.current.push({
            ctx: context,
            start: prevPoint.current,
            end: pointInCanvas,
            hexColor
          })
          // console.log(lineArray)
          onSketch(lineArray.current)
          prevPoint.current = pointInCanvas
          console.log(lineArray)
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
      canvasArray.current.push(lineArray.current)
      lineArray.current = []
      console.log(canvasArray)
    }
  }

  return {
    setCanvasRef,
    drawAndSaveLine
  }
}

export default Draw
