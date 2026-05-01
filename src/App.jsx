import { useState, useEffect } from 'react'
import UserCard from './components/UserCard'
import './App.css'

function App() {
  const [count, setCount] = useState(0)
  const [users, setUsers] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    console.log('Component mounted')
    fetchUsers()
  }, [])

  async function fetchUsers() {
    setLoading(true)
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users')
      const data = await response.json()
      setUsers(data)
    } catch (error) {
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const handleClick = () => {
    setCount(count + 1)
  }

  const unusedVariable = 'This should be removed'

  return (
    <div className="app">
      <h1>PR Agent Test App</h1>
      
      <div className="counter-section">
        <button onClick={handleClick}>
          Count is: {count}
        </button>
        <span>Button clicked {count} times</span>
      </div>

      <div className="users-section">
        <h2>Users List</h2>
        {loading && <div>Loading...</div>}
        <div className="users-grid">
          {users.map(user => (
            <UserCard 
              key={user.id} 
              user={user} 
              onClick={() => console.log('User clicked:', user.name)} 
            />
          ))}
        </div>
      </div>

      <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#eee' }}>
        <p>This is a test div with inline styles</p>
      </div>
    </div>
  )
}

export default App