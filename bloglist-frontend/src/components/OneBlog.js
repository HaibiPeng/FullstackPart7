import React from 'react'
import { useRouteMatch } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { AddLikes, DeleteBlog } from '../reducers/blogReducer'
import { setSuccessNotification, setErrorNotification } from '../reducers/notificationReducer'
import { useHistory } from "react-router-dom"
import blogService from '../services/blogs'
import CommentForm from './CommentForm'

const OneBlog = ( { user } ) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const blogs = useSelector(state => state.blogs)
    const match = useRouteMatch('/blogs/:id')
    const blog = match
    ? blogs.find(blog => blog.id === match.params.id)
    : null
    
    if (!blog) {
        return null
    }

    const addLikes = (blog) => {
        dispatch(AddLikes(blog))
      }

    const deleteBlog = (blog) => {
        if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)){
          if (blog.user.username === user.username || blog.user.username === undefined) {
              dispatch(DeleteBlog(blog))
              dispatch(setSuccessNotification(`blog '${blog.title}' by ${blog.author} deleted`, 5))
              history.push('/')
          } else {
            blogService
              .deleteBlog(blog.id)
              .catch (error => {
                dispatch(setErrorNotification(error.response.data.error, 5))
              })
          }
        }
      }

  return (
    <div id='blog'>
        <h3>{blog.title}</h3>
        <a href={blog.url}>{blog.url}</a>
        <p>
        likes <span className='likes'>{blog.likes}</span>
        <button id='addlikes' onClick={() => addLikes(blog)}>like</button>
        </p>
        <p>
          added by {blog.user.username === undefined ? user : blog.user.username}
        </p>
        <button onClick={() => deleteBlog(blog)}>remove</button>
        <div>
        <h4>Comments</h4>
        <CommentForm id={blog.id}/>
        <ul>
          {blog.comments.map((comment, index) =>
            <li key={index}>{comment}</li>
          )}
        </ul>
      </div>
    </div>
  )
}

export default OneBlog
