import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setURL] = useState('')

  const addBlog = async (event) => {
    event.preventDefault()
    const blogObject = {
      title,
      author,
      url,
    }
    setTitle('')
    setAuthor('')
    setURL('')
    await createBlog(blogObject)
  }

  return (
    <form onSubmit={addBlog}>
      <div>
          title
        <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
        />
      </div>
      <div>
          author
        <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
        />
      </div>
      <div>
          url
        <input
            value={url}
            onChange={({ target }) => setURL(target.value)}
        />
      </div>
      <button type="submit">save</button>
    </form>
  )
}

export default BlogForm
