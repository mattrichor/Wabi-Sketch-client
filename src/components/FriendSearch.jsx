import { useEffect, useState } from 'react'
import { SendFriendRequest, GetAllUsers } from '../services/Users'
import { useNavigate } from 'react-router-dom'

const FriendSearch = ({ user }) => {
  const [searchTerm, setSearchTerm] = useState('')
  const [searchedName, setSearchedName] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [users, setUsers] = useState([])
  const [currentUser, setCurrentUser] = useState([])

  const handleChange = (e) => {
    setSearchTerm(e.target.value)
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    setSearchedName(searchTerm)
  }

  useEffect(() => {
    const results = users.filter((user) =>
      user.username.toLowerCase().includes(searchTerm)
    )
    setSearchResults(results)
  }, [searchedName])

  useEffect(() => {
    const userObj = localStorage.getItem('userObj')
    let selUser = JSON.parse(userObj)
    setCurrentUser(selUser)
  }, [])

  useEffect(() => {
    const getUsers = async () => {
      const res = await GetAllUsers(currentUser.id)
      setUsers(res)
    }
    if (currentUser.id) {
      getUsers()
    }
  }, [currentUser])

  const sendRequest = async (friendId) => {
    const friend = await SendFriendRequest(currentUser.id, friendId)
  }

  return (
    <div>
      <h2 className="find-friend-title">Find Friends</h2>
      <form onSubmit={handleSubmit}>
        <input
          className="search-input"
          type="text"
          placeholder="username"
          value={searchTerm}
          onChange={handleChange}
        />
        <button type="submit" className="send-button">
          Search
        </button>
      </form>

      {searchResults.map((user) => (
        <div className="grid-container">
          <div className="search-item">{user.username}</div>

          <div className="choose-btn-div">
            <button className="choose-btn" onClick={() => sendRequest(user.id)}>
              Connect
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}

export default FriendSearch
