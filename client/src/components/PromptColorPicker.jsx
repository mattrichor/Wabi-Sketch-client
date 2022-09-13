import { useEffect } from 'react'

const PromptColorPicker = ({ hexColor, setHexColor, prompt, showColor }) => {
  const pickHex = (color) => {
    setHexColor(color)
    showColor()
  }

  useEffect(() => {
    if (prompt) {
      setHexColor(prompt.colors[1])
    }
  }, [])

  return (
    <div className="square-holder">
      {prompt.colors.map((color) => (
        <button
          className="color-square"
          style={{ backgroundColor: color }}
          onClick={() => pickHex(color)}
        >
          {color}
        </button>
      ))}
    </div>
  )
}
export default PromptColorPicker
