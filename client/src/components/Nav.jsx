import { NavLink } from 'react-router-dom'

const Nav = ({ authenticated, user, handleLogOut }) => {
  let authenticatedOptions
  if (user) {
    authenticatedOptions = (
      <nav className="navbar">
        <h3>Welcome {user.username}</h3>
        <NavLink to="/my_sketches">My Sketches</NavLink>
        <NavLink onClick={handleLogOut} to="/">
          Depart For Now
        </NavLink>
      </nav>
    )
  }

  const publicOptions = (
    <nav className="navbar">
      <NavLink to="/register">Register</NavLink>
      <NavLink to="/signin">Sign In</NavLink>
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
