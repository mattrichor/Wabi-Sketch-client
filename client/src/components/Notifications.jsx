import { useEffect } from 'react'
import '../pages/CSS/Notifications.css'

const Notifications = ({ messageRecieved, socket, notifications }) => {
  // useEffect(() => {
  //   const setNotifications = () => {
  //     let notifCount = JSON.parse(localStorage.getItem('notifications'))
  //     console.log(notifCount)
  //   }
  //   setNotifications()
  // }, [socket])

  return (
    <div>
      {notifications ? (
        <div>
          {notifications.map((notif) => (
            <div key={notif.id}>
              <div className="notif-content">
                <div className="notif-identifier"></div>
                <div className="notif-text">
                  {notif.senderName} sent a sketch!
                </div>
              </div>
              <div className="notif-num">{notifications.length}</div>
            </div>
          ))}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  )
}

export default Notifications
