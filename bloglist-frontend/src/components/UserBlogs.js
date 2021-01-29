import React from 'react'
import { useRouteMatch } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Table, TableHead, TableBody, TableCell, TableContainer, TableRow, Paper } from '@material-ui/core'

const UserView = () => {
  const users = useSelector(state => state.users)
  const match = useRouteMatch('/users/:id')
  const user = match
    ? users.find(user => user.id === match.params.id)
    : null

  if (!user) {
    return null
  }

  return (
    <div>
      <h2>{user.username}</h2>
      <TableContainer component={Paper}>
          <Table>
              <TableHead>
                  <TableRow>
                      <TableCell>added blogs</TableCell>
                  </TableRow>
              </TableHead>
              <TableBody>
                  {user.blogs.map(blog =>
                  <TableRow key={blog.id}>
                      <TableCell>
                          <li>{blog.title}</li>
                      </TableCell>
                  </TableRow>
                  )}
              </TableBody>
         </Table>
      </TableContainer>
    </div>
  )}

export default UserView
