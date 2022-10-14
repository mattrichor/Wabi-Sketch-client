import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { GetFriendRequests, SendFriendRequest } from '../services/Users'
import './CSS/FriendList.css'
import iconBird from './CSS/iconbird.png'
import iconCat from './CSS/iconcat.png'
import iconKoi from './CSS/iconkoi.png'
import iconFish from './CSS/iconfish.png'
import iconFlower from './CSS/iconflower.png'
import iconMtn from './CSS/iconmtn.png'

const FriendsList = ({ user, sendSketch, exploreToggle }) => {
  let navigate = useNavigate()

  const [requests, setRequests] = useState([])
  const [friends, setFriends] = useState([])
  const [currentPage, setCurrentPage] = useState(1)

  // Friend Request Logic & friendslist view
  useEffect(() => {
    const getFriendRequests = async () => {
      const res = await GetFriendRequests(user.id)
      setRequests(res.requests)
      setFriends(res.friends)
    }
    if (user.id) {
      getFriendRequests()
    }
  }, [user])

  const acceptRequest = async (friendId) => {
    const friend = await SendFriendRequest(user.id, friendId)
  }

  const chooseRandImg = (username) => {
    let uName = username.toLowerCase()
    switch (uName.charAt(0)) {
      case 'a':
      case 'b':
      case 'c':
      case 'd':
        return iconBird
      case 'e':
      case 'f':
      case 'g':
      case 'h':
        return iconCat
      case 'i':
      case 'j':
      case 'k':
      case 'l':
        return iconKoi
      case 'm':
      case 'n':
      case 'o':
      case 'p':
        return iconMtn
      case 'q':
      case 'r':
      case 's':
      case 't':
        return iconFish
      case 'u':
      case 'v':
      case 'w':
      case 'x':
      case 'y':
      case 'z':
        return iconFlower
    }
  }

  return (
    <div className={exploreToggle ? 'ex-whole' : 'fr-whole'}>
      <div className={exploreToggle ? 'explore-container' : 'friend-container'}>
        <ul id="friend-list">
          <li className="li-tit">Connections</li>
          {friends !== [] ? (
            <div className="friends-scroll">
              {friends.map((friend) => (
                <li key={friend.id} className="friend">
                  <img
                    className="friend-img"
                    src={chooseRandImg(friend.username)}
                  />
                  <div className="friend-name">{friend.username}</div>
                  {exploreToggle ? (
                    <div></div>
                  ) : (
                    <div className="friend-btn-div">
                      <button
                        className="friend-btn button-55"
                        onClick={() => sendSketch(friend.id)}
                      >
                        Send Sketch
                      </button>
                    </div>
                  )}
                </li>
              ))}
            </div>
          ) : (
            <div></div>
          )}
        </ul>
        <div>
          {requests !== [] ? (
            <ul id="request-list">
              <li className="li-tit">Requests</li>
              <div className="friends-scroll">
                {requests.map((request) => (
                  <li className="friend">
                    <img
                      className="friend-img"
                      src={chooseRandImg(request.username)}
                    />
                    <div className="friend-name">{request.username}</div>
                    <div className="friend-btn-div">
                      <button
                        className="friend-btn button-55"
                        onClick={() => acceptRequest(request.id)}
                      >
                        Accept
                      </button>
                    </div>
                  </li>
                ))}
              </div>
            </ul>
          ) : (
            <div></div>
          )}
        </div>
      </div>
      {!exploreToggle ? (
        <button
          className="button-55 explore-btn"
          onClick={() => navigate('/explore')}
        >
          Explore
        </button>
      ) : (
        <button className="button-55" onClick={() => navigate('/home')}>
          Back Home
        </button>
      )}
    </div>
  )
}

export default FriendsList
