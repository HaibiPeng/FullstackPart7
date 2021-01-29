import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
//import { prettyDOM } from '@testing-library/dom'
import Blog from './Blog'
import BlogForm from './BlogForm'

test('renders title and author', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'newAuthor',
    url: 'https://fullstackopen.com/zh/part5/%E6%B5%8B%E8%AF%95_react_%E5%BA%94%E7%94%A8',
    user :{
      username: 'hello'
    }
  }

  const component = render(
    <Blog blog={blog}/>
  )

  expect(component.container).toHaveTextContent(
    'Component testing is done with react-testing-library'
  )
  expect(component.container).toHaveTextContent(
    'newAuthor'
  )
})

test('clicking the view button to see the details', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'newAuthor',
    url: 'https://fullstackopen.com/zh/part5/%E6%B5%8B%E8%AF%95_react_%E5%BA%94%E7%94%A8',
    user :{
      username: 'hello'
    },
    likes: 10
  }

  const component = render(
    <Blog blog={blog}/>
  )

  const button = component.getByText('view')
  fireEvent.click(button)

  expect(component.container).toHaveTextContent(
    'https://fullstackopen.com/zh/part5/%E6%B5%8B%E8%AF%95_react_%E5%BA%94%E7%94%A8'
  )

  expect(component.container).toHaveTextContent(10)
})

test('clicking the like button twice', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'newAuthor',
    url: 'https://fullstackopen.com/zh/part5/%E6%B5%8B%E8%AF%95_react_%E5%BA%94%E7%94%A8',
    user :{
      username: 'hello'
    },
    likes: 10
  }

  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} addLikes={mockHandler}/>
  )

  fireEvent.click(component.getByText('view'))

  const like = component.getByTitle('Addlikes')
  fireEvent.click(like)
  fireEvent.click(like)

  expect(mockHandler.mock.calls).toHaveLength(2)
})

test('<BlogForm /> updates parent state and calls onSubmit', () => {
  const createBlog = jest.fn()

  const component = render(
    <BlogForm createBlog={createBlog} />
  )

  const title = component.container.querySelector('#title')
  const author = component.container.querySelector('#author')
  const url = component.container.querySelector('#url')
  const form = component.container.querySelector('form')

  fireEvent.change(title, {
    target: { value: 'testing of forms could be easier' }
  })
  fireEvent.change(author, {
    target: { value: 'haibi' }
  })
  fireEvent.change(url, {
    target: { value: 'https://fullstackopen.com/zh/part5/%E6%B5%8B%E8%AF%95_react_%E5%BA%94%E7%94%A8' }
  })
  fireEvent.submit(form)

  expect(createBlog.mock.calls).toHaveLength(1)
  expect(createBlog.mock.calls[0][0].title).toBe('testing of forms could be easier' )
  expect(createBlog.mock.calls[0][0].author).toBe('haibi' )
  expect(createBlog.mock.calls[0][0].url).toBe(
    'https://fullstackopen.com/zh/part5/%E6%B5%8B%E8%AF%95_react_%E5%BA%94%E7%94%A8' )
})