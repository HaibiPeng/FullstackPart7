import React from 'react'
import { useDispatch } from 'react-redux'
import { addComment } from '../reducers/blogReducer'

const CommentForm = ({ id }) => {
  const dispatch = useDispatch()

  const handleAddComment = async (event) => {
    event.preventDefault()
    const comment = event.target.comment.value
    if(comment){
      dispatch(addComment(id, { content: comment }))
      event.target.comment.value = ''
    }
  }

  return (
    <form name='commentform' onSubmit={handleAddComment}>
      <input id='comment' type="text" name="comment"/>
      <button id='creating-button' type='submit'>add comment</button>
    </form>
  )}

export default CommentForm