import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { RegisterUser } from '../services/Auth'
// import '../register.css'

const Register = () => {
  let navigate = useNavigate()
  const [formValues, setFormValues] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const handleChange = (e) => {
    setFormValues({ ...formValues, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    await RegisterUser({
      name: formValues.name,
      email: formValues.email,
      password: formValues.password
    })
    setFormValues({
      name: '',
      email: '',
      password: '',
      confirmPassword: ''
    })
    if (formValues.password !== formValues.confirmPassword) {
      alert('Passwords do not match! Please try again!')
    } else {
      navigate('/signin')
    }
  }
  return (
    <div className="signin-col-ch">
      <div className="card-overlay-centered-ch coach-reg">
        <h1 className="reg-title">Transience...</h1>
        <form className="col" onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="name"></label>
            <input
              className="reg-input"
              onChange={handleChange}
              name="name"
              type="text"
              placeholder="Full Name"
              value={formValues.name}
              required
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="email"></label>
            <input
              className="reg-input"
              onChange={handleChange}
              name="email"
              type="email"
              placeholder="Email"
              value={formValues.email}
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
              value={formValues.password}
              placeholder="Password"
              required
            />
          </div>
          <div className="input-wrapper">
            <label htmlFor="confirmPassword"></label>
            <input
              className="reg-input"
              onChange={handleChange}
              type="password"
              name="confirmPassword"
              placeholder="Confirm Password"
              value={formValues.confirmPassword}
              required
            />
          </div>
          <button
            className="submit-btn reg-submit-btn"
            disabled={
              !formValues.email ||
              (!formValues.password &&
                formValues.confirmPassword === formValues.password)
            }
          >
            Awaits
          </button>
        </form>
      </div>
    </div>
  )
}

export default Register
