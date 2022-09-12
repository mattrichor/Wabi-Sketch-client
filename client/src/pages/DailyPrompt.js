import { useEffect, useState, createRef } from 'react'
import { GetPromptByDate } from '../services/Prompts'
import Canvas from '../components/Canvas'
const DailyPrompt = ({ user, setSelSketch, selSketch }) => {
  const canvasRef = createRef()

  const [prompt, setPrompt] = useState({})

  useEffect(() => {
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
      <div>{prompt.text}</div>
      <div>
        {prompt.colors ? (
          <div>
            {prompt.colors.map((color) => (
              <li>{color}</li>
            ))}
          </div>
        ) : (
          <div></div>
        )}
      </div>
      <Canvas
        width={700}
        height={500}
        user={user}
        setSelSketch={setSelSketch}
        selSketch={selSketch}
        canvasRef={canvasRef}
      />
    </div>
  )
}
export default DailyPrompt
