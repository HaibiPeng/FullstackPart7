/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react'
import Blogs from './components/blogList'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import SignupForm from './components/SignupForm'
import LogoutForm from './components/LogoutForm'
import Notification from './components/Notification'
import Users from './components/Users'
import UserBlogs from './components/UserBlogs'
import OneBlog from './components/OneBlog'
import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { getToken } from './reducers/userReducer'
import { Switch, Route, Link } from "react-router-dom"
import { Container, Button, AppBar, Toolbar } from '@material-ui/core'

const Menu = ({ user, token } ) => {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" component={Link} to="/">blogs</Button>
          <Button color="inherit" component={Link} to="/users">users</Button>
          {(user !== null) && (token !== null)?
          <span>{user.username} logged in <LogoutForm /></span>
          : 
          <div>
            <Button color="inherit" component={Link} to="/login">login</Button>
            <Button color="inherit" component={Link} to="/signup">signup</Button>
          </div>
          }
        </Toolbar>
      </AppBar>
    </div>
  )
}

const App = () => {
  var token = null
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
  if (loggedUserJSON !== null){
    token = loggedUserJSON.token
  }

  useEffect(() => {
    dispatch(getToken())
  },[dispatch])

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  return (
    <Container>
    <div className="container">
        <Menu user={user} token={token}/>
      <Notification />
      <Switch>
        <Route path="/users/:id">
          <UserBlogs />
        </Route>
        <Route path="/blogs/:id">
          <OneBlog user={user}/>
        </Route>
        <Route path="/login">
          <LoginForm />
        </Route>
        <Route path="/signup">
          <SignupForm />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
        <Route path="/">
          {user ?
          <div>
          <h2>Blog App</h2>
          <BlogForm />
          <Blogs user={user}/>
          </div>
          :
          <div>
          <h2>You're not logged in. Please login</h2>
          <Route path="/login">
            <LoginForm />
          </Route>
          </div>
          }
        </Route>
      </Switch>  
    </div>
    </Container>
  )
}

export default App