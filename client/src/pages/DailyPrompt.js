import { useEffect, useState, createRef } from 'react'
import { GetPromptByDate } from '../services/Prompts'
import Canvas from '../components/Canvas'
const DailyPrompt = ({
  user,
  setSelSketch,
  selSketch,
  setPromptCanvas,
  promptCanvas,
  hexColor,
  setHexColor
}) => {
  const canvasRef = createRef()

  const [prompt, setPrompt] = useState({})

  useEffect(() => {
    setSelSketch({})
    setPromptCanvas(true)
    const date = new Date()
    let today =
      date.getFullYear() * 1e4 +
      (date.getMonth() + 1) * 100 +
      date.getDate() +
      ''
    console.log(today)
    const getDailyPrompt = async () => {
      const prompt = await GetPromptByDate(today)
      setPrompt(prompt)
      console.log(prompt.colors)
    }
    getDailyPrompt()
  }, [])

  return (
    <div>
      <div className="prompt-subtitle">{prompt.date}</div>
      <div className="home-title">{prompt.text}</div>

      <div>
        {prompt.colors ? (
          <div>
            <Canvas
              width={700}
              height={500}
              user={user}
              setSelSketch={setSelSketch}
              selSketch={selSketch}
              canvasRef={canvasRef}
              promptCanvas={promptCanvas}
              prompt={prompt}
              setHexColor={setHexColor}
              hexColor={hexColor}
            />
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  )
}
export default DailyPrompt
