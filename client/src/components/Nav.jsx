import { NavLink } from 'react-router-dom'
import './CSS/Nav.css'

const Nav = ({ authenticated, user, handleLogOut }) => {
  console.log(user)
  console.log(authenticated)
  let authenticatedOptions
  if (user) {
    authenticatedOptions = (
      <div>
        <div className="welcome-msg">Welcome {user.username}</div>
        <nav className="nav">
          <input
            class="menu-icon"
            type="checkbox"
            id="menu-icon"
            name="menu-icon"
          />
          <label for="menu-icon"></label>
          <ul className="pt-5">
            <li>
              <NavLink to="/my_sketches">My Sketches</NavLink>
            </li>
            <li>
              <NavLink onClick={handleLogOut} to="/">
                Depart
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    )
  }

  const publicOptions = (
    <nav className="nav">
      <NavLink to="/register">Register</NavLink>
      <NavLink to="/signin">Sign In</NavLink>
      <div class="dot"></div>
    </nav>
  )

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
