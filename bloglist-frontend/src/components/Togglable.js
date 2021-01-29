/* eslint-disable react/display-name */
import React, { useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'
import { Container, Button } from '@material-ui/core'

const Togglable = React.forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <Container>
    <div>
      <div style={hideWhenVisible}>
        <Button variant="contained" color="primary" onClick={toggleVisibility}>{props.buttonLabel}</Button>
      </div>
      <div style={showWhenVisible}>
        {props.children}
        <Button variant="contained" onClick={toggleVisibility}>cancel</Button>
      </div>
    </div>
    </Container>
  )
})

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable