import { HexColorPicker } from 'react-colorful'
import { useState } from 'react'

const ColorPicker = ({ hexColor, setHexColor }) => {
  return <HexColorPicker color={hexColor} onChange={setHexColor} />
}

export default ColorPicker
