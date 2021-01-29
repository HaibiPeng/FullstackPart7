/* eslint-disable linebreak-style */
import React, { useState } from 'react'
import { Link } from "react-router-dom"
import { Table, TableBody, TableCell, TableContainer, TableRow, Paper } from '@material-ui/core'

const Blog = ({ blog, user, addLikes, deleteBlog }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div id='blog'>
      <TableContainer component={Paper}>
      <Table>
      <TableBody>
      <TableRow key={blog.id}>
      <TableCell>
      <div style={hideWhenVisible} className='titleandauthor'>
        <Link to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
        <button onClick={toggleVisibility}>view</button>
      </div>
      <div style={showWhenVisible} className='titleandauthor'>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>hide</button>
        <p>{blog.url}</p>
        likes <span className='likes'>{blog.likes}</span>
        <button id='addlikes' onClick={() => addLikes(blog.id)}>like</button>
        <p>
          {blog.user.username === undefined ? user : blog.user.username}
        </p>
        <button onClick={() => deleteBlog(blog.id)}>remove</button>
      </div>
      </TableCell>
      </TableRow>
      </TableBody>
      </Table>
      </TableContainer>
    </div>
  )
}

export default Blog
