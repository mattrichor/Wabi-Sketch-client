import { NavLink } from 'react-router-dom'
import { useState } from 'react'
import './CSS/Nav.css'

const Nav = ({ authenticated, user, handleLogOut, entered }) => {
  const [isChecked, setIsChecked] = useState(false)

  const handleChange = () => {
    if (!isChecked) {
      setIsChecked(true)
    } else if (isChecked) {
      setIsChecked(false)
    }
  }

  let authenticatedOptions
  let publicOptions
  if (user) {
    authenticatedOptions = (
      <div>
        <input
          className="menu-icon"
          type="checkbox"
          id="menu-icon"
          name="menu-icon"
          value={isChecked}
          onChange={handleChange}
        />
        <label htmlFor="menu-icon"></label>
        <nav className="nav">
          <ul className="pt-5">
            <li>
              <li>
                <NavLink
                  to="/home"
                  className="my-sketches"
                  onClick={() => handleChange()}
                >
                  Home
                </NavLink>
              </li>
              <NavLink to="/my_sketches" className="my-sketches">
                My Sketches
              </NavLink>
            </li>
            <li>
              <NavLink to="/daily_muse" className="daily-musing">
                Daily Musing
              </NavLink>
            </li>
            <li>
              <NavLink to="/explore" className="explore">
                Explore
              </NavLink>
            </li>
            <li>
              <NavLink className="depart" onClick={handleLogOut} to="/">
                Depart
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    )
  }

  if (entered) {
    publicOptions = (
      <nav className="nav-hidden">
        <NavLink to="/register">Register</NavLink>
        <NavLink to="/signin">Sign In</NavLink>
        <div className="dot"></div>
      </nav>
    )
  }

  return (
    <header>
      <NavLink to="/">
        <div className="logo-wrapper" alt="logo"></div>
      </NavLink>
      {authenticated && user ? authenticatedOptions : publicOptions}
    </header>
  )
}

export default Nav
