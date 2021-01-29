import React from 'react'
import { saveToken } from '../reducers/userReducer'
import { useDispatch } from 'react-redux'
import { setErrorNotification } from '../reducers/notificationReducer'
import { useHistory } from "react-router-dom"
import { Container, TextField, Button } from '@material-ui/core'

const LoginForm = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const handleLogin = async (event) => {
    event.preventDefault()
    const username = event.target.username.value
    const password = event.target.password.value
    dispatch(saveToken(username, password))
      .catch(() => {
        dispatch(setErrorNotification('Wrong username or password', 5))
      })
    history.push('/')
  }

  return (
    <div>
      <h2>login to application</h2>
      <Container>
      <form onSubmit={handleLogin}>
        <div>
          <TextField label="username" placeholder="username" variant="outlined" margin="dense" id='username' type="text" name="username"/>
        </div>
        <div>
          <TextField label="password" placeholder="password" variant="outlined" margin="dense" id='password' type="password" name="Password"/>
        </div>
        <Button variant="contained" color="primary" id="login-button" type="submit">login</Button>
      </form>
      </Container>
    </div>
  )
}

export default LoginForm