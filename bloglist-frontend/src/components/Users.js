import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { initializeUsers } from '../reducers/usersReducer'
import { Link } from 'react-router-dom'
import { Table, TableHead, TableBody, TableCell, TableContainer, TableRow, Paper } from '@material-ui/core'

const Users = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeUsers())
  },[dispatch])

  const users = useSelector(state => state.users)

  return (
    <div>
      <h2>Users</h2>
      <TableContainer component={Paper}>
          <Table>
              <TableHead>
                  <TableRow>
                      <TableCell>name</TableCell>
                      <TableCell>blogs</TableCell>
                  </TableRow>
              </TableHead>
              <TableBody>
                  {users.map(user => (
                  <TableRow key={user.id}>
                      <TableCell>
                          <Link to={`/users/${user.id}`}>{user.name}</Link>
                      </TableCell>
                      <TableCell>
                          {user.blogs.length}
                      </TableCell>
                  </TableRow>
                  ))}
              </TableBody>
         </Table>
      </TableContainer>
    </div>
  )}

export default Users