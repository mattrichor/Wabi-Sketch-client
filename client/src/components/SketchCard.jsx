import '../pages/CSS/Sketches.css'

const SketchCard = (props) => {
  return (
    <div className="sketch-wrap">
      <img className="sketch-thumbnail" src={props.thumbnail} alt="" />
    </div>
  )
}

export default SketchCard
