import React, { useEffect, useState } from 'react'
import Title from '../Title'

const ProfileContent = () => {
  const [user, setUser] = useState(null)

  useEffect(() => {
    const storedUser = getStoredUser();
    setUser(storedUser)
  }, [])
  function getStoredUser() {
    const user = JSON.parse(localStorage.getItem("user"))
    return user
  }
  return (
    <div className="profile-content">
      <Title text={"Account"} />
      <div className="profile-content__inner">
        <span className="profile-content__inner-item">
          <p>
            username
          </p>
          <li>
            {user?.username}
          </li>
        </span>
        <span className="profile-content__inner-item">
          <p>
            email address
          </p>
          <li>
            {user?.email}
          </li>
        </span>
        <span className="profile-content__inner-item">
          <p>
            pin
          </p>
          <li>
            {user?.password}
          </li>
        </span>
      </div>
    </div>
  )
}

export default React.memo(ProfileContent)