import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setSuccessNotification, setErrorNotification } from '../reducers/notificationReducer'
import Togglable from './Togglable'
import { Container, TextField, Button } from '@material-ui/core'
import SaveIcon from '@material-ui/icons/Save';

const BlogForm = () => {
  const dispatch = useDispatch()
  const blogFormRef = useRef()

  const addBlog = (event) => {
    blogFormRef.current.toggleVisibility()
    event.preventDefault()
    const newTitle = event.target.title.value
    const newAuthor = event.target.author.value
    const newUrl = event.target.url.value
    event.target.title.value = ''
    event.target.author.value = ''
    event.target.url.value = ''
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl
    }
    dispatch(createBlog(blogObject)).then(() => {
      dispatch(setSuccessNotification(`a new blog '${blogObject.title}' by ${blogObject.author} added`, 5))
    })
    .catch (error => {
        dispatch(setErrorNotification(error.response.data.error, 5))
    })
  }

  return (
    <Container>
    <div className="formDiv">
      <Togglable buttonLabel='new blog' ref={blogFormRef}>
      <h2>Create a new blog</h2>

      <form onSubmit={addBlog}>
        <div>
          <TextField label="title" placeholder="title" variant="outlined" margin="dense" type="text" id={'title'} name="title"/>
        </div>
        <div>
          <TextField label="author" placeholder="author" variant="outlined" margin="dense" type="text" id={'author'} name="author"/>
        </div>
        <div>
          <TextField label="url" placeholder="url" variant="outlined" margin="dense" type="text" id={'url'} name="url" />
        </div>
        <Button variant="contained" color="primary" startIcon={<SaveIcon />} type="submit">create</Button>
      </form>
      </Togglable>
    </div>
    </Container>
  )
}

export default BlogForm