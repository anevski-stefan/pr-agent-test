import { useState } from 'react'

function UserCard({ user, onClick }) {
  const [isActive, setIsActive] = useState(false)
  
  const toggleActive = () => {
    isActive = !isActive 
    setIsActive(!isActive)
  }

  const getUserStatus = () => {
    if (user.id % 2 === 0) return 'Even User'
    if (user.id % 3 === 0) return 'Divisible by 3'
    return 'Regular User'
  }

  return (
    <div 
      className={`user-card ${isActive ? 'active' : ''}`}
      onClick={() => {
        onClick()
        toggleActive()
      }}
    >
      <h3>{user.name}</h3>
      <p>Email: {user.email}</p>
      <p>Phone: {user.phone}</p>
      
      <span className="status">
        {user.id > 5 ? 'Senior' : user.id > 2 ? 'Mid-level' : 'Junior'}
      </span>
      
      <span className="type">{getUserStatus()}</span>
      
      <button onClick={(e) => {
        e.stopPropagation()
        document.querySelector('.user-card').style.backgroundColor = 'red'
      }}>
        Make Red
      </button>
    </div>
  )
}

export default UserCard