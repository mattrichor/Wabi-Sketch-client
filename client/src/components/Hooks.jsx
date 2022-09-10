import { useEffect, useRef, useContext } from 'react'
import { ColorProvider } from '../pages/Home'
import { SaveSketch, SendSketch, UploadSketch } from '../services/Sketches'

const Draw = (
  onSketch,
  width,
  height,
  selSketch,
  setSelSketch,
  sketchRecip,
  setSketchRecip,
  sendNotification
) => {
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

    return () => {
      cleanUpListeners()
    }
  }, [onSketch])

  const setCanvasRef = (ref) => {
    // console.log(ref)
    canvasRef.current = ref
    if (canvasRef.current) {
      const ctx = canvasRef.current.getContext('2d')
      // console.log(ctx)
      if (selSketch.sketchData !== undefined) {
        let sketch = new Image()
        sketch.src = selSketch.sketchData
        console.log(sketch)
        ctx.drawImage(sketch, 0, 0)
        canvasData.current = ctx.getImageData(0, 0, width, height)
        console.log(canvasData.current)
        canvasArray.current.push(canvasData.current)
        lineArray.current = []
        lineCount.current++
      }
    }
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
    // const ctx = canvasRef.current.getContext('2d')
    const sketchData = canvasRef.current.toDataURL('image/png', 0.2)
    // let sketchData = ctx.getImageData(0, 0, width, height)
    let user = JSON.parse(localStorage.getItem('userObj'))
    if (selSketch.id !== undefined) {
      console.log('saving!')
      const sketch = await SaveSketch(user.id, selSketch.id, {
        sketchData: sketchData
      })
      console.log(sketch)
    } else {
      console.log('uploading!')
      const sketch = await UploadSketch(user.id, {
        sketchData: sketchData
      })
      setSelSketch(sketch)
    }
  }

  const sendSketch = async (friendId) => {
    const ctx = canvasRef.current.getContext('2d')
    const sketchData = canvasRef.current.toDataURL('image/png', 0.2)
    // let sketchData = ctx.getImageData(0, 0, width, height)
    let user = JSON.parse(localStorage.getItem('userObj'))
    if (selSketch.id === undefined) {
      const sketch = await UploadSketch(user.id, {
        sketchData: sketchData
      })
      console.log(sketch)
      setSelSketch(sketch)
      const sentSketch = await SendSketch(friendId, sketch.id, {
        sketchData: sketchData
      })
      console.log(sketch)
      // setSketchRecip(friendId)
      sendNotification(friendId)
    } else {
      const sketch = await SendSketch(friendId, selSketch.id, {
        sketchData: sketchData
      })
      setSketchRecip(friendId)
      sendNotification(friendId)

      console.log(sketch)
    }
  }

  return {
    setCanvasRef,
    drawAndSaveLine,
    undoLine,
    saveSketch,
    sendSketch
  }
}

export default Draw
