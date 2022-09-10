import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import '../pages/CSS/Notifications.css'
import { GetSketchById } from '../services/Sketches'

const Notifications = ({
  messageRecieved,
  socket,
  notifications,
  setSelSketch
}) => {
  let navigate = useNavigate()

  const chooseSketch = async (sketchId) => {
    const sketch = await GetSketchById(sketchId)
    let confirmation = window.confirm('Add to this sketch?')
    if (confirmation) {
      setSelSketch(sketch)
      console.log(sketch)
      navigate('/home')
    }
    // console.log(sketchId)
  }

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
                <div
                  className="notif-identifier"
                  onClick={() => chooseSketch(notif.sketchId)}
                ></div>
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
