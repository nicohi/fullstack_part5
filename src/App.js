import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(['error', null])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  const blogOrder = (a,b) => b.likes - a.likes

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs.sort(blogOrder))
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

  const handleLogout = async () => {
    window.localStorage.clear()
    blogService.setToken(null)
    setUser(null)
  }

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    const returnedBlog = await blogService.create(blogObject)
    const blog = await blogService.get(returnedBlog.id)
    setBlogs(blogs.concat(blog).sort(blogOrder))
    setMessage(['success', `a new blog "${blog.title}" by "${blog.author}" added`])
    setTimeout(() => {
      setMessage([null,null])
    }, 5000)
  }

  const updateBlog = async (blogObject) => {
    const returnedBlog = await blogService.update(blogObject.id, blogObject)
    const blog = await blogService.get(returnedBlog.id)
    setBlogs(blogs.map(b => (b.id === blog.id) ? blog : b).sort(blogOrder))
    setMessage(['success', `blog "${blog.title}" by "${blog.author}" updated`])
    setTimeout(() => {
      setMessage([null,null])
    }, 5000)
  }

  const deleteBlog = async (blog) => {
    await blogService.delet(blog.id)
    setBlogs(blogs.filter(b => b.id !== blog.id).sort(blogOrder))
    setMessage(['success', `blog "${blog.title}" by "${blog.author}" deleted`])
    setTimeout(() => {
      setMessage([null,null])
    }, 5000)
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
        <Togglable buttonLabel="create new" ref={blogFormRef}>
          <BlogForm  createBlog={addBlog} />
        </Togglable>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} user={user} updateBlog={updateBlog} deleteBlog={deleteBlog} />
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
