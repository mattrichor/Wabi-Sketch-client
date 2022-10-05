const ChatBox = ({ msgArray, setMessage, sendChat, message }) => {
  return (
    <div className="chat-box">
      <div>
        {msgArray ? (
          <ul className="chat-ul">
            {msgArray.map((msg) => (
              <li className="chat-list">
                <span className="chat-user">{msg.username}</span>
                <span className="chat-msg">{msg.message}</span>
              </li>
            ))}
          </ul>
        ) : (
          <div></div>
        )}
      </div>
      <form onSubmit={sendChat}>
        <input
          className="msg-input"
          placeholder="Message..."
          onChange={(event) => {
            setMessage(event.target.value)
          }}
          value={message}
        />
        <button type="submit" className="send-button">
          SEND
        </button>
      </form>
    </div>
  )
}

export default ChatBox
