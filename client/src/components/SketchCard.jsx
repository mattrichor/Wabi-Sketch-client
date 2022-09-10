import '../pages/CSS/Sketches.css'

const SketchCard = (props) => {
  return (
    <div className="sketch-wrap" key={props.sketchId}>
      <img className="sketch-thumbnail" src={props.sketchData} alt="" />
    </div>
  )
}

export default SketchCard
