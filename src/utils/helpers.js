// Utility file with poor practices

// Global variable that should be avoided
globalCounter = 0

// Function with side effects and no return type
function incrementCounter() {
  globalCounter++
  return globalCounter
}

// Function that mutates its arguments
export function processUserData(users) {
  for (let i = 0; i < users.length; i++) {
    users[i].processed = true // Mutating original array
    users[i].timestamp = Date.now()
  }
  return users
}

// Deeply nested callback hell
export function fetchUserData(userId, callback) {
  fetch(`https://jsonplaceholder.typicode.com/users/${userId}`)
    .then(response => response.json())
    .then(user => {
      fetch(`https://jsonplaceholder.typicode.com/posts?userId=${userId}`)
        .then(response => response.json())
        .then(posts => {
          user.posts = posts
          callback(null, user)
        })
        .catch(error => callback(error))
    })
    .catch(error => callback(error))
}

// Inconsistent naming conventions
const Badly_named_variable = 'test'
const anotherPoorlyNamedVariable = 123

// Exporting multiple things inconsistently
export default {
  incrementCounter,
  processUserData,
  fetchUserData
}