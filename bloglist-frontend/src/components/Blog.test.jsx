import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { expect } from 'vitest'

describe('Blog compoment renders its title and author', () => {
  test('renders its children', () => {
    const blog = {
      title: 'blog title',
      author: 'blog author',
      url: 'https://blog-content.com',
      likes: '1',
    }

    const deleteBlog = vi.fn()

    render(<Blog blog={blog} deleteBlog={deleteBlog} />)

    const titleElement = screen.getByText(blog.title)
    expect(titleElement).toBeDefined()

    const authorElement = screen.getByText(blog.author)
    expect(authorElement).toBeDefined()

    const urlElement = screen.queryByText(blog.url)
    expect(urlElement).toBeNull()

    const likesElement = screen.queryByText(blog.likes)
    expect(likesElement).toBeNull()

    screen.debug()
  })
})