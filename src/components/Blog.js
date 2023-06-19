import { useState } from 'react'

const Blog = ({blog, updateBlog}) => {
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
      </div>
    </div>
  )
}

export default Blog
