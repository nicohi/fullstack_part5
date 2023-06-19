import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, user, updateBlog, deleteBlog }) => {
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const [visible, setVisible] = useState(false)
  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }
  const showWhenUser = { display: user.username === blog.user.username ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const likeBlog = async (event) => {
    event.preventDefault()
    const likedBlog = { ...blog,
      user: blog.user.id.toString(),
      likes: blog.likes + 1 }
    updateBlog(likedBlog)
  }

  const removeBlog = () => {
    return window.confirm(`Remove blog "${blog.title}" by "${blog.author}"`) && deleteBlog(blog)
  }

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible}>
        <div>
          {blog.title} {blog.author} <button onClick={toggleVisibility}>view</button>
        </div>
      </div>
      <div style={showWhenVisible}>
        <div> {blog.title} {blog.author} <button onClick={toggleVisibility}>hide</button> </div>
        <div><a href={blog.url}>{blog.url}</a></div>
        <div> likes {blog.likes} <button onClick={likeBlog}>like</button> </div>
        <div> {blog.user.name} </div>
        <div style={showWhenUser}><button onClick={removeBlog}>remove</button></div>
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  deleteBlog: PropTypes.func.isRequired,
}

export default Blog
