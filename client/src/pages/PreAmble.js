import { useNavigate } from 'react-router-dom'
import './CSS/Home.css'
const PreAmble = () => {
  let navigate = useNavigate()
  return (
    <body className="pre">
      <div className="pre-title">
        <h1 className="preH1">W A B I S K E T C H </h1>
        <h1 className="preH2"></h1>
      </div>
      <section>
        <div className="pre-btn-div">
          <a className="preButton" onClick={() => navigate('/signin')}>
            Begin
          </a>
        </div>
      </section>
    </body>
  )
}

export default PreAmble
