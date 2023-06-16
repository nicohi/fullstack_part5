import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedNoteappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedNoteappUser', JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    window.localStorage.clear()
    blogService.setToken(null)
    setUser(null)
  }

  return (
    <>
      { user && <div>
                  <h2>blogs</h2>
                  <p>
                    {user.name} logged in
                    <button onClick={handleLogout}>logout</button>
                  </p>
                  {blogs.map(blog =>
                    <Blog key={blog.id} blog={blog} />
                  )}
                </div>
      }
      { !user && <div>
                  <h2>log in to application</h2>
                   <LoginForm  handleLogin={handleLogin}
                               username={username}
                               setUsername={setUsername}
                               password={password}
                               setPassword={setPassword} />
                 </div>
      }
    </>
  )
}

export default App
