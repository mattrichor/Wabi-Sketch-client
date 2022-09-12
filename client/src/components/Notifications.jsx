import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import '../pages/CSS/Notifications.css'
import { DeleteNotif } from '../services/Notifs'
import { GetSketchById } from '../services/Sketches'

const Notifications = ({ socket, notifications, setSelSketch }) => {
  let navigate = useNavigate()
  const [notifToggle, setNotiftoggle] = useState(false)
  const [randomMessage, setRandomMessage] = useState('sent a sketch!')
  const [randNum, setRandNum] = useState(1)

  const showNotifs = () => {
    if (!notifToggle) {
      setNotiftoggle(true)
      setRandNum(Math.floor(Math.random() * 5))
      chooseRandomMessage()
    } else if (notifToggle) {
      setNotiftoggle(false)
      setRandNum(Math.floor(Math.random() * 5))
      chooseRandomMessage()
    }
  }

  const chooseSketch = async (sketchId, notifId) => {
    const sketch = await GetSketchById(sketchId)
    if (sketch) {
      let confirmation = window.confirm('Add to this sketch?')
      if (confirmation) {
        setSelSketch(sketch)
        const res = await DeleteNotif(notifId)
        navigate('/home')
        //
      }
    }
  }
  let chooseRandomMessage = () => {
    switch (randNum) {
      case 1:
        setRandomMessage('sent a sketch!')
        break
      case 2:
        setRandomMessage('bequeathed a sketch!')
        break
      case 3:
        setRandomMessage('delivered a piece!')
        break
      case 4:
        setRandomMessage('created a work!')
        break
      case 5:
        setRandomMessage('made a masterpiece!')
    }
  }

  return (
    <div>
      {notifications ? (
        <div>
          <ul className="notif-list">
            {notifications.map((notif) => (
              <div key={notif.id}>
                <div className="notif-content">
                  <button
                    className="notif-identifier"
                    onClick={() => showNotifs()}
                  >
                    {notifications.length}
                  </button>
                  {notifToggle ? (
                    <li
                      className="notif-text"
                      onClick={() => chooseSketch(notif.sketchId, notif.id)}
                    >
                      {notif.senderName} {randomMessage}
                    </li>
                  ) : (
                    <div></div>
                  )}
                </div>
              </div>
            ))}
          </ul>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  )
}

export default Notifications
