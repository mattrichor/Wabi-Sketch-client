// import '../SignIn.css'
// import '../Feed.css'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

import { SignInUser } from '../services/Auth'

const SignIn = (props) => {
  let navigate = useNavigate()
  const [formValues, setFormValues] = useState({ username: '', password: '' })
  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const loginGuest = async () => {
    const payload = await SignInUser({ username: 'Guest', password: '1234' })
    props.setUser(payload)
    props.toggleAuthenticated(true)
    navigate('/home')
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const payload = await SignInUser(formValues)
    setFormValues({ username: '', password: '' })
    props.setUser(payload)
    props.toggleAuthenticated(true)
    navigate('/home')
  }

  return (
    <div className="signin">
      <div className="signin-col-ch">
        <div className="card-overlay-centered-ch">
          <h2 className="login-title">
            We Welcome You <br></br>Fondly
          </h2>
          <form className="col" onSubmit={handleSubmit}>
            <div className="input-wrapper">
              <label htmlFor="username"></label>
              <input
                className="reg-input"
                onChange={handleChange}
                name="username"
                type="username"
                placeholder="username"
                value={formValues.username}
                required
              />
            </div>
            <div className="input-wrapper">
              <label htmlFor="password"></label>
              <input
                className="reg-input"
                onChange={handleChange}
                type="password"
                name="password"
                placeholder="password"
                value={formValues.password}
                required
              />
            </div>
            <div className="button-div">
              <button
                disabled={!formValues.username || !formValues.password}
                className="submit-btn button-55"
              >
                Submit
              </button>
            </div>
            <div className="button-div">
              <button
                className="submit-btn reg-btn button-55"
                onClick={() => {
                  navigate('/register')
                }}
              >
                Register Here
              </button>
            </div>
          </form>
          <button
            className="submit-btn reg-btn button-55"
            onClick={() => loginGuest()}
          >
            Guest Login
          </button>
        </div>
      </div>
    </div>
  )
}

export default SignIn
