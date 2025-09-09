import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import userEvent from '@testing-library/user-event'
import ToggleButton from './ToggleButton'
import BlogForm from './BlogForm'
import { assert, expect } from 'vitest'

test('When clicked, new blog form is displayed and the add from button sends the correct details', async () => {
  const blog = {
    title: 'blog title',
    author: 'blog author',
    url: 'https://blog-content.com',
  }

  const addBlogMock = vi.fn()

  render(
    <BlogForm addBlogFunction={addBlogMock}/>
  )

  const titleInput = screen.getByLabelText('title:')
  const authorInput = screen.getByLabelText('author:')
  const urlInput = screen.getByLabelText('url:')
  const createButton = screen.getByText('create')

  await userEvent.type(titleInput, blog.title)
  await userEvent.type(authorInput, blog.author)
  await userEvent.type(urlInput, blog.url)
  await userEvent.click(createButton)

  expect(addBlogMock.mock.calls).toHaveLength(1)
  console.log('calls: ', addBlogMock.mock.calls)
  console.log('[0][0]: ', addBlogMock.mock.calls[0][0])
  expect(addBlogMock.mock.calls[0][0].title).toBe(blog.title)
  expect(addBlogMock.mock.calls[0][0].author).toBe(blog.author)
  expect(addBlogMock.mock.calls[0][0].url).toBe(blog.url)

})