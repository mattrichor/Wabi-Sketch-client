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
      <h2>Connections</h2>
      <ul id="friend-list">
        {friends !== [] ? (
          <div>
            {friends.map((friend) => (
              <li class="friend">
                <img src={randImg} />
                <div class="friend-name">{friend.username}</div>
                <button onClick={() => sendSketch(friend.id)}>
                  Send Sketch
                </button>
              </li>
            ))}
          </div>
        ) : (
          <div></div>
        )}
      </ul>
      <div>
        <h2>Reaching Hands</h2>
        <ul id="request-list friend-list">
          {requests !== [] ? (
            <div>
              {requests.map((request) => (
                <li class="friend">
                  <img src={randImg} />
                  <div class="friend-name">{request.username}</div>
                  <button onClick={() => acceptRequest(request.id)}>
                    Accept
                  </button>
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
