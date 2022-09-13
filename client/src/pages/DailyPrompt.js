import { useEffect, useState, createRef } from 'react'
import { GetPromptByDate } from '../services/Prompts'

import Typewriter from 'typewriter-effect'

import Canvas from '../components/Canvas'
const DailyPrompt = ({
  user,
  setSelSketch,
  selSketch,
  setPromptCanvas,
  promptCanvas,
  hexColor,
  setHexColor,
  socket
}) => {
  const canvasRef = createRef()
  const [msgArray, setMsgArray] = useState([])

  const [message, setMessage] = useState('')
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

  const sendChat = () => {
    socket.emit('send_chat', { username: user.username, message: message })
    setMessage('')
  }

  useEffect(() => {
    socket.on('receive_chat', (data) =>
      setMsgArray((msgArray) => [...msgArray, data])
    )
    console.log(msgArray)
  }, [socket])
  return (
    <div>
      <div>
        {prompt.colors ? (
          <div style={{ backgroundColor: prompt.colors[0] }}>
            <div
              className="prompt-subtitle"
              style={{ backgroundColor: prompt.colors[0] }}
            >
              {prompt.date}
            </div>
            <div
              className="home-title"
              style={{
                backgroundColor: prompt.colors[1],
                color: prompt.colors[4]
              }}
            >
              <Typewriter
                wrapperClassName="home-title"
                options={{ loop: false }}
                onInit={(typewriter) => {
                  typewriter
                    .typeString(`today's prompt...`)
                    .pauseFor(1000)
                    .deleteAll()
                    .typeString(`${prompt.text}`)
                    .start()
                }}
              />
            </div>
            <div className="home-page-grid">
              <div className="chat-box">
                <div>
                  {msgArray ? (
                    <ul>
                      {msgArray.map((msg) => (
                        <li>
                          <div>{msg.username}</div>
                          <div>{msg.message}</div>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <div></div>
                  )}
                </div>
                <input
                  placeholder="Message..."
                  onChange={(event) => {
                    setMessage(event.target.value)
                  }}
                />
                <button onClick={sendChat}>SEND MSG</button>
              </div>
              <div className="canvas-div">
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
            </div>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    </div>
  )
}
export default DailyPrompt
