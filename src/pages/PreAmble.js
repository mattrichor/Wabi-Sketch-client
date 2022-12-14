import { useNavigate } from 'react-router-dom'
import './CSS/Home.css'
const PreAmble = () => {
  let navigate = useNavigate()
  return (
    <div className="pre">
      <div className="pre-title">
        <h1 className="home-title">W A B I S K E T C H </h1>
        <h1 className="preH2"></h1>
      </div>
      <section>
        <div className="pre-btn-div">
          <a className="preButton" onClick={() => navigate('/signin')}>
            Begin
          </a>
        </div>
      </section>
    </div>
  )
}

export default PreAmble
