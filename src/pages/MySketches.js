import { useEffect, useState } from 'react'
import { GetSketches } from '../services/Sketches'
import SketchCard from '../components/SketchCard'
import { useNavigate } from 'react-router-dom'

import './CSS/Sketches.css'

const MySketches = ({ user, selSketch, setSelSketch, setIsLoading }) => {
  let navigate = useNavigate()
  const [sketches, setSketches] = useState([])

  const chooseSketch = (sketch) => {
    let confirmation = window.confirm('Add to this sketch?')
    if (confirmation) {
      setSelSketch(sketch)
      setIsLoading(true)
      navigate('/home')
    }
  }

  useEffect(() => {
    const handleSketches = async () => {
      const data = await GetSketches(user.id)
      setSketches(data)
    }
    if (user.id) {
      handleSketches()
    }
  }, [user])

  return (
    <div className="sketches-pg">
      <h2 className="home-title sketches-title">R E M I N I S C E</h2>
      <div className="sketch-card">
        {sketches.map((sketch) => (
          <div onClick={() => chooseSketch(sketch)}>
            <SketchCard
              sketchId={sketch.id}
              promptId={sketch.promptId}
              sketchData={sketch.sketchData}
              userId={sketch.userId}
            ></SketchCard>
          </div>
        ))}
      </div>
      <button className="button-55" onClick={() => navigate('/home')}>
        Back to Create
      </button>
    </div>
  )
}

export default MySketches
