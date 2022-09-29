const ChatBox = ({ msgArray, setMessage, sendChat }) => {
  return (
    <div className="chat-box">
      <div>
        {msgArray ? (
          <ul>
            {msgArray.map((msg) => (
              <div class="chat-message">
                <div class="flex items-end justify-end">
                  <div class="flex flex-col space-y-2 text-xs max-w-xs mx-2 order-1 items-end">
                    <div>
                      <span class="px-4 py-2 rounded-lg inline-block rounded-br-none bg-blue-600 text-white ">
                        {msg.message}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
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
