import { useEffect } from 'react'

const Notifications = ({ messageRecieved, socket }) => {
  useEffect(() => {
    const setNotifications = () => {
      let notifCount = JSON.parse(localStorage.getItem('notifications'))
      console.log(notifCount)
    }
    setNotifications()
  }, [socket])

  return (
    <div>
      <div class="content">
        <div class="identifier"></div>
        <div class="text">{messageRecieved} sent a sketch!</div>
      </div>
      <div class="number">4</div>
    </div>
  )
}

export default Notifications
