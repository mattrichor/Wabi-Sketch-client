// import '../SignIn.css'
// import '../Feed.css'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import jwt_decode from 'jwt-decode'

import { SignInUser } from '../services/Auth'

const SignIn = (props) => {
  let navigate = useNavigate()
  const [formValues, setFormValues] = useState({ username: '', password: '' })
  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const payload = await SignInUser(formValues)
    setFormValues({ username: '', password: '' })
    console.log(payload.payload.user_id)
    props.setUserId(payload.payload.user_id)
    props.toggleAuthenticated(true)
    navigate('/')
  }

  const apiTest = async (e) => {
    e.preventDefault()
    const res = await axios.get('http://localhost:8000/users')
    console.log(res)
  }

  return (
    <div className="bg-sign-in">
      <div className="signin-col-ch">
        <div className="card-overlay-centered-ch">
          We Welcome You Freely
          <form className="col" onSubmit={handleSubmit}>
            <div className="input-wrapper">
              <label htmlFor="username"></label>
              <input
                className="username"
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
                className="password"
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
                className="submit-btn"
              >
                Submit
              </button>
            </div>
            <div className="button-div">
              <button
                className="submit-btn reg-btn"
                onClick={() => {
                  navigate('/register')
                }}
              >
                Register Here
              </button>
              <button onClick={apiTest}>TEST</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignIn
