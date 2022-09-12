const PromptColorPicker = ({ hexColor, setHexColor, prompt, showColor }) => {
  const pickHex = (color) => {
    setHexColor(color)
    showColor()
  }

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
