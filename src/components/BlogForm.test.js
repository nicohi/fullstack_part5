import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import BlogForm from './BlogForm'

const user = {
  id: '22222222222222222',
  username: 'TESTUSER',
  name: 'TEST USER',
}

const blog = {
  id: '1111111111111111111111',
  title: 'TEST TITLE FOR BLOG',
  author: 'TEST AUTHOR FOR BLOG',
  url: 'TEST URL FOR BLOG',
  likes: 100,
  user: user,
}

test('check blog creation event handler is called with correct data on form submit', async () => {
  const user = userEvent.setup()
  const createBlog = jest.fn()

  const { container } = render(<BlogForm createBlog={createBlog} />)

  const title = container.querySelector('#blog-title')
  const author = container.querySelector('#blog-author')
  const url = container.querySelector('#blog-url')
  const sendButton = screen.getByText('save')

  await user.type(title, blog.title)
  await user.type(author, blog.author)
  await user.type(url, blog.url)
  await user.click(sendButton)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe(blog.title)
  expect(createBlog.mock.calls[0][0].author).toBe(blog.author)
  expect(createBlog.mock.calls[0][0].url).toBe(blog.url)
})
