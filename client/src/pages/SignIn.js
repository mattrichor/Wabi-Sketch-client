// import '../SignIn.css'
// import '../Feed.css'

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { SignInUser } from '../services/Auth'

const SignIn = (props) => {
  let navigate = useNavigate()
  const [formValues, setFormValues] = useState({ email: '', password: '' })
  const [loginToggle, setLoginToggle] = useState(false)
  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const toggleLogin = () => {
    if (loginToggle === false) {
      setLoginToggle(true)
      console.log(loginToggle)
    } else if (loginToggle === true) {
      setLoginToggle(false)
      console.log(loginToggle)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const payload = await SignInUser(formValues)
    setFormValues({ email: '', password: '' })
    props.setUser(payload)
    props.toggleAuthenticated(true)
    navigate('/')
  }

  return (
    <div className="bg-sign-in">
      <div className="signin-col-ch">
        <div className="card-overlay-centered-ch">
          We Welcome You Freely
          <form className="col" onSubmit={handleSubmit}>
            <div className="input-wrapper">
              <label htmlFor="email"></label>
              <input
                className="email"
                onChange={handleChange}
                name="email"
                type="email"
                placeholder="example@example.com"
                value={formValues.email}
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
                disabled={!formValues.email || !formValues.password}
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
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default SignIn
