import { useState, useEffect } from 'react'
import { GetFriendRequests, SendFriendRequest } from '../services/Users'
import './CSS/FriendList.css'

const FriendsList = ({ user, sendSketch }) => {
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

  let randImg
  //test /test

  return (
    <div>
      <ul id="friend-list">
        <li className="li-tit">Connections</li>
        {friends !== [] ? (
          <div>
            {friends.map((friend) => (
              <li key={friend.id} className="friend">
                <img className="friend-img" src={randImg} />
                <div className="friend-name">{friend.username}</div>
                <div className="friend-btn-div">
                  <button
                    className="friend-btn"
                    onClick={() => sendSketch(friend.id)}
                  >
                    Send Sketch
                  </button>
                </div>
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
                  <img className="friend-img" src={randImg} />
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
