import '../pages/CSS/Sketches.css'
import deleteIcon from './CSS/x.png'

const SketchCard = (props) => {
  return (
    <div className="sketch-wrap" key={props.sketchId}>
      <img className="sketch-thumbnail" src={props.sketchData} alt="" />
      <img className="remove-sketch" src={deleteIcon}></img>
    </div>
  )
}

export default SketchCard
