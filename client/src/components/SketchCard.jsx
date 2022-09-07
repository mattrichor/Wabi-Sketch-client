const SketchCard = (props) => {
  return (
    <div className="sketch-wrap">
      <div>
        <img src={props.thumbnail} alt="" />
      </div>
    </div>
  )
}

export default SketchCard
