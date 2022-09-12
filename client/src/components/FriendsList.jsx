import { useState, useEffect } from 'react'
import { GetFriendRequests, SendFriendRequest } from '../services/Users'
import './CSS/FriendList.css'
import iconBird from './CSS/iconbird.png'
import iconCat from './CSS/iconcat.png'
import iconKoi from './CSS/iconkoi.png'
import iconFish from './CSS/iconfish.png'
import iconFlower from './CSS/iconflower.png'
import iconMtn from './CSS/iconmtn.png'

const FriendsList = ({ user, sendSketch, exploreToggle }) => {
  const [requests, setRequests] = useState([])
  const [friends, setFriends] = useState([])

  // Friend Request Logic & friendslist view
  useEffect(() => {
    console.log(user)
    const getFriendRequests = async () => {
      const res = await GetFriendRequests(user.id)
      setRequests(res.requests)
      setFriends(res.friends)
      console.log(res)
    }
    if (user.id) {
      getFriendRequests()
    }
  }, [user])

  const acceptRequest = async (friendId) => {
    const friend = await SendFriendRequest(user.id, friendId)
  }

  const chooseRandImg = (username) => {
    switch (username.charAt(0)) {
      case 'a' || 'b' || 'c' || 'd':
        return iconBird
      case 'e' || 'f' || 'g' || 'h':
        return iconCat
      case 'i' || 'j' || 'k' || 'l':
        return iconKoi
      case 'm' || 'n' || 'o' || 'p':
        return iconMtn
      case 'q' || 'r' || 's' || 't':
        return iconFish
      case 'u' || 'v' || 'w' || 'x' || 'y' || 'z':
        return iconFlower
    }
  }

  return (
    <div className="friend-container">
      <ul id="friend-list">
        <li className="li-tit">Connections</li>
        {friends !== [] ? (
          <div>
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
                      className="friend-btn"
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
        <ul id="request-list">
          {requests !== [] ? (
            <div>
              <li className="li-tit">Reaching Hands</li>
              {requests.map((request) => (
                <li className="friend">
                  <img
                    className="friend-img"
                    src={chooseRandImg(request.username)}
                  />
                  <div className="friend-name">{request.username}</div>
                  <div className="friend-btn-div">
                    <button
                      className="friend-btn"
                      onClick={() => acceptRequest(request.id)}
                    >
                      Accept
                    </button>
                  </div>
                </li>
              ))}
            </div>
          ) : (
            <div></div>
          )}
        </ul>
      </div>
    </div>
  )
}

export default FriendsList
