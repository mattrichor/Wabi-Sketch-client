import './CSS/FriendList.css'

const FriendsList = () => {
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
    </div>
  )
}

export default FriendsList
