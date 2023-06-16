const BlogForm = ({ addBlog, title, setTitle, author, setAuthor, url, setURL }) => (
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

export default BlogForm
