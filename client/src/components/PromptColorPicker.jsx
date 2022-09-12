const PromptColorPicker = ({ hexColor, setHexColor, prompt }) => {
  const pickHex = (color) => {
    setHexColor(color)
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
