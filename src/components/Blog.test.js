import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'

import Blog from './Blog'

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


test('renders blog title and author by default, url and likes are hidden', () => {

  const { container } = render(<Blog blog={blog} user={user} />)

  const shortDiv = container.querySelector('.shortBlogDiv')
  expect(shortDiv).not.toHaveStyle('display: none')
  expect(shortDiv).toHaveTextContent(blog.title)
  expect(shortDiv).toHaveTextContent(blog.author)
  expect(shortDiv).not.toHaveTextContent(blog.url)
  expect(shortDiv).not.toHaveTextContent(blog.likes)

  const longDiv = container.querySelector('.longBlogDiv')
  expect(longDiv).toHaveStyle('display: none')
  expect(longDiv).toHaveTextContent(blog.title)
  expect(longDiv).toHaveTextContent(blog.author)
  expect(longDiv).toHaveTextContent(blog.url)
  expect(longDiv).toHaveTextContent(blog.likes)
})

test('renders blog title, author, url, and likes after view is clicked', async () => {

  const { container } = render(<Blog blog={blog} user={user} />)

  const user_ = userEvent.setup()
  const button = screen.getByText('view')
  await user_.click(button)

  const longDiv = container.querySelector('.longBlogDiv')
  expect(longDiv).not.toHaveStyle('display: none')
  expect(longDiv).toHaveTextContent(blog.title)
  expect(longDiv).toHaveTextContent(blog.author)
  expect(longDiv).toHaveTextContent(blog.url)
  expect(longDiv).toHaveTextContent(blog.likes)
})

test('updateBlog is called twice when like is clicked twice', async () => {

  const mockHandler = jest.fn()

  render(<Blog blog={blog} user={user} updateBlog={mockHandler} />)

  const user_ = userEvent.setup()
  const button = screen.getByText('like')
  await user_.click(button)
  await user_.click(button)

  expect(mockHandler.mock.calls).toHaveLength(2)
})
