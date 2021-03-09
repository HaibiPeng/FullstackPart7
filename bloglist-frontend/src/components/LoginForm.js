import React from 'react'
import { saveToken } from '../reducers/userReducer'
import { useDispatch } from 'react-redux'
import { setErrorNotification, setSuccessNotification } from '../reducers/notificationReducer'
import { useHistory } from "react-router-dom"
import { Container, TextField, Button } from '@material-ui/core'

const LoginForm = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const handleLogin = async (event) => {
    event.preventDefault()
    const username = event.target.username.value
    const password = event.target.password.value
    dispatch(saveToken(username, password)).then(() => {
      dispatch(setSuccessNotification('Login succussfully!', 5))
    })
      .catch(error => {
        dispatch(setErrorNotification(error.response.data.error, 5))
      })
      history.push('/')
  }

  return (
    <div>
      <h2>Login to application</h2>
      <Container>
      <form onSubmit={handleLogin}>
        <div>
            <TextField required label="username" placeholder="username" variant="outlined" margin="dense" 
            id='username' type="text" name="username"/>
        </div>
        <div>
            <TextField required label="password" placeholder="password" variant="outlined" margin="dense" 
            id='password' type="password" name="Password"/>
        </div>
        <Button variant="contained" color="primary" id="login-button" type="submit">login</Button>
      </form>
      </Container>
    </div>
  )
}

export default LoginForm