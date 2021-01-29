import React from 'react'
import { useDispatch } from 'react-redux'
import { removeToken } from '../reducers/userReducer'
import { setSuccessNotification } from '../reducers/notificationReducer'
import { useHistory } from "react-router-dom"

const LogoutForm = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const handleLogout = async (event) => {
    event.preventDefault()
    dispatch(removeToken())
    dispatch(setSuccessNotification('logged out successfully', 5))
    history.push('/login')
  }

  return (
      <button name='logoutform' onClick={(e) => handleLogout(e)}>Logout</button>
  )}

export default LogoutForm