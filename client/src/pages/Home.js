import { useNavigate } from 'react-router-dom'
// import '../Home.css'
const Home = () => {
  let navigate = useNavigate()
  return (
    <div className="home">
      <div className="home-title">
        <h1 className="homeH1">W A B I S K E T C H </h1>
        <h1 className="homeH2"> welcome</h1>
      </div>
      <section>
        <div className="home-btn-div">
          <button className="homeButton" onClick={() => navigate('/signin')}>
            Click Here To Get Started
          </button>
        </div>
      </section>
    </div>
  )
}

export default Home
