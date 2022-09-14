import './CSS/Spinner.css'
import zen from './CSS/zen.png'

const LoadingSpinner = () => {
  return (
    <div className="spinner-container">
      <img className="spinner" src={zen}></img>
    </div>
  )
}

export default LoadingSpinner
