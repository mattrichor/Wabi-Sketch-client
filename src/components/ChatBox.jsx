const ChatBox = ({ msgArray, setMessage, sendChat }) => {
  return (
    <div className="chat-box">
      <div>
        {msgArray ? (
          <ul>
            {msgArray.map((msg) => (
              <li className="chat-list">
                <div className="chat-user">{msg.username}</div>
                <div className="chat-msg">{msg.message}</div>
              </li>
            ))}
          </ul>
        ) : (
          <div></div>
        )}
      </div>
      <input
        placeholder="Message..."
        onChange={(event) => {
          setMessage(event.target.value)
        }}
      />
      <button onClick={sendChat}>SEND MSG</button>
    </div>
  )
}

export default ChatBox
