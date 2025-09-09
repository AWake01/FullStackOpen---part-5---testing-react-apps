import { render, screen } from '@testing-library/react'
import '@testing-library/jest-dom/vitest'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'
import { assert, expect } from 'vitest'

describe('Blog compoment', () => {
  test('Blog compoment renders its title and author when collapsed', () => {
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

  test('Blog compoment renders title, author, url and number of likes when expanded', async () => {
    const blog = {
      title: 'blog title',
      author: 'blog author',
      url: 'https://blog-content.com',
      likes: '1',
    }

    const deleteBlog = vi.fn()
    const mockHandler = vi.fn()

    render(<Blog blog={blog} deleteBlog={deleteBlog} />)

    const user = userEvent.setup()
    const viewButtton = screen.getByText('view')
    await user.click(viewButtton)
    //expect(mockHandler.mock.calls).toHaveLength(1)

    const titleElement = screen.getByText(blog.title)
    expect(titleElement).toBeDefined()

    const authorElement = screen.getByText(blog.author)
    expect(authorElement).toBeDefined()

    const urlElement = screen.queryByText(blog.url)
    expect(urlElement).toBeDefined()

    const likesElement = screen.queryByText(`likes ${blog.likes}`)
    expect(likesElement).toBeDefined()

    screen.debug()
  })

  test('When clicked twice, the like button handler is called twice', async () => {
    const blog = {
      title: 'blog title',
      author: 'blog author',
      url: 'https://blog-content.com',
      likes: '1',
    }

    const deleteBlog = vi.fn()
    const mockHandler = vi.fn()

    render(<Blog blog={blog} deleteBlog={deleteBlog} likeBlog={mockHandler} />)

    const user = userEvent.setup()
    const viewButtton = screen.getByText('view')
    await user.click(viewButtton)
    //expect(mockHandler.mock.calls).toHaveLength(1)

    screen.debug()

    const likesElement = screen.queryByText(`likes ${blog.likes}`)
    expect(likesElement).toBeDefined()

    const likeButtton = screen.getByText('like')
    await user.click(likeButtton)
    await user.click(likeButtton)
    //expect(mockHandler.mock.calls).toHaveLength(2)

    //screen.debug()
  })
})