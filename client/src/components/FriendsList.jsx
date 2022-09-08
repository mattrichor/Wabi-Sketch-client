import { useState } from 'react'
import './CSS/FriendList.css'

const FriendsList = () => {
  const [requests, setRequests] = useState([])

  let randImg

  return (
    <div>
      <ul id="friend-list">
        <li class="friend">
          <img src={randImg} />
          <div class="friend-name">Leah Slaten</div>
        </li>
        <li class="friend">
          <img src={randImg} />
          <div class="friend-name">Leah Slaten</div>
        </li>
        <li class="friend">
          <img src={randImg} />
          <div class="friend-name">Leah Slaten</div>
        </li>
        <li class="friend">
          <img src={randImg} />
          <div class="friend-name">Leah Slaten</div>
        </li>
      </ul>
      <div>
        <h3>Reaching Hands</h3>
        <ul id="request-list">
          <li class="friend">
            <img src={randImg} />
            <div class="friend-name">REQUEST</div>
          </li>
        </ul>
      </div>
    </div>
  )
}

export default FriendsList
