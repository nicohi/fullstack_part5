import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setURL] = useState('')
  const [message, setMessage] = useState(['error', null])

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
      setMessage(['error', 'wrong username or password'])
      setTimeout(() => {
        setMessage([null,null])
      }, 5000)
    }
  }

  const handleLogout = async (event) => {
    window.localStorage.clear()
    blogService.setToken(null)
    setUser(null)
  }

  const addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title,
      author,
      url,
    }

    blogService
      .create(blogObject)
        .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
          setMessage(['success', `a new blog "${title}" by "${author}" added`])
        setTimeout(() => {
          setMessage([null,null])
        }, 5000)
        setTitle('')
        setAuthor('')
        setURL('')
      })
  }

  return (
    <>
      { user && <div>
                  <h2>blogs</h2>
                  <Notification message={message}/>
                  <p>
                    {user.name} logged in
                    <button onClick={handleLogout}>logout</button>
                  </p>
                  <h2>create new</h2>
                  <BlogForm  addBlog={addBlog}
                             title={title}setTitle={setTitle}
                             author={author} setAuthor={setAuthor}
                             url={url} setURL={setURL}  />
                  {blogs.map(blog =>
                    <Blog key={blog.id} blog={blog} />
                  )}
                </div>
      }
      { !user && <div>
                  <h2>log in to application</h2>
                  <Notification message={message}/>
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
