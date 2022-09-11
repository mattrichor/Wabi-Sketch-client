import { NavLink } from 'react-router-dom'
import './CSS/Nav.css'

const Nav = ({ authenticated, user, handleLogOut, entered }) => {
  console.log(user)
  console.log(authenticated)
  let authenticatedOptions
  let publicOptions
  if (user) {
    authenticatedOptions = (
      <div>
        <div className="welcome-msg">Welcome {user.username}</div>

        <input
          className="menu-icon"
          type="checkbox"
          id="menu-icon"
          name="menu-icon"
        />
        <label htmlFor="menu-icon"></label>
        <nav className="nav">
          <ul className="pt-5">
            <li>
              <li>
                <NavLink to="/home" className="my-sketches">
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
