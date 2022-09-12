const PromptColorPicker = ({ hexColor, setHexColor, prompt }) => {
  const pickHex = (color) => {
    setHexColor(color)
  }

  return (
    <div>
      {prompt.colors.map((color) => (
        <div style={{ backgroundColor: color }} onClick={() => pickHex(color)}>
          {color}
        </div>
      ))}
    </div>
  )
}
export default PromptColorPicker
