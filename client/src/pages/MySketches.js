import { useEffect, useState } from 'react'
import { GetSketches } from '../services/Sketches'
import SketchCard from '../components/SketchCard'

const MySketches = ({ chooseSketch }) => {
  const [sketches, setSketches] = useState([])

  useEffect(() => {
    const handleSketches = async () => {
      let userData = JSON.parse(localStorage.getItem('userObj'))
      const data = await GetSketches(userData.id)
      setSketches(data)
    }
    handleSketches()
  }, [])

  return (
    <div>
      <h2>echoes of the past :</h2>
      <div className="SketchCard">
        {sketches.map((sketch) => (
          <div onClick={() => chooseSketch(sketch)}>
            <SketchCard
              key={sketch.id}
              promptId={sketch.promptId}
              sketchData={sketch.sketchData}
              userId={sketch.userId}
              thumbnail={sketch.thumbnail}
            ></SketchCard>
          </div>
        ))}
      </div>
    </div>
  )
}

export default MySketches
