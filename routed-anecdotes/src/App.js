import React, { useState } from 'react'
import {
  Switch,
  Route,
  Link,
  useRouteMatch,
  useHistory,
} from "react-router-dom"
import { useField } from './hooks/index'
import {
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  TextField,
  Button,
  AppBar,
  Toolbar
} from '@material-ui/core'
import { Alert } from '@material-ui/lab'

const Menu = () => {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" component={Link} to="/">anecdotes</Button>
          <Button color="inherit" component={Link} to="/create">create new</Button>
          <Button color="inherit" component={Link} to="/about">about</Button>                    
        </Toolbar>
      </AppBar>
    </div>
  )
}

const AnecdoteList = ({ anecdotes }) => (
    <div>
    <h2>Anecdotes</h2>

    <TableContainer component={Paper}>
      <Table>
        <TableBody>
          {anecdotes.map(anecdote => (
            <TableRow key={anecdote.id}>
              <TableCell>
                <Link to={`/anecdotes/${anecdote.id}`}>{anecdote.content}</Link>
              </TableCell>
              <TableCell>
                {anecdote.author}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  </div>
)

const Anecdote = ({ anecdote, votehandleClick }) => (
    <div>
      <TableContainer component={Paper}>
      <Table>
        <TableBody>
            <TableRow key={anecdote.id}>
              <TableCell>
                <h3>{anecdote.content} by {anecdote.author}</h3>
              </TableCell>
              <TableCell>
                <h3>has {anecdote.votes} votes <button onClick={votehandleClick} id='vote'>vote</button></h3>
              </TableCell>
            </TableRow>
        </TableBody>
      </Table>
    </TableContainer>
    </div>
)

const About = () => (
  <div>
    <h2>About anecdote app</h2>
    <p>According to Wikipedia:</p>

    <em>An anecdote is a brief, revealing account of an individual person or an incident.
      Occasionally humorous, anecdotes differ from jokes because their primary purpose is not simply to provoke laughter but to reveal a truth more general than the brief tale itself,
      such as to characterize a person by delineating a specific quirk or trait, to communicate an abstract idea about a person, place, or thing through the concrete details of a short narrative.
      An anecdote is "a story with a point."</em>

    <p>Software engineering is full of excellent anecdotes, at this app you can find the best and add more.</p>
  </div>
)

const Footer = () => (
  <div>
    Anecdote app for <a href='https://courses.helsinki.fi/fi/tkt21009'>Full Stack -websovelluskehitys</a>.

    See <a href='https://github.com/fullstack-hy2020/routed-anecdotes/blob/master/src/App.js'>https://github.com/fullstack-hy2019/routed-anecdotes/blob/master/src/App.js</a> for the source code.
  </div>
)

const CreateNew = (props) => {
  const history = useHistory()

  const [content, contentValue] = useField('text')
  const [author, authorValue] = useField('text')
  const [info, infoValue] = useField('text')

  const handleSubmit = (e) => {
    e.preventDefault()
    props.addNew({
      content,
      author,
      info,
      votes: 0
    })
    history.push('/')
  }

  const handleReset = (e) => {
    e.preventDefault()
    contentValue.onReset()
    authorValue.onReset()
    infoValue.onReset()
  }

  return (
    <Container>
    <div>
      <h2>create a new anecdote</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <TextField label="content" {...contentValue}/>
        </div>
        <div>
          <TextField label="author" {...authorValue}/>
        </div>
        <div>
          <TextField label="url for more info" {...infoValue}/>
        </div>
        <Button variant="contained" color="primary" type="submit">create</Button>
        <Button variant="contained" color="primary" onClick={(e) => handleReset(e)}>reset</Button>
      </form>
    </div>
    </Container>
  )
}

const Notification = ({ notification }) => {
  if (notification) {
    return (
      <Alert severity="success">
        {notification}
      </Alert>
    )
  } else {
    return null
  }
}

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: '1'
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: '2'
    }
  ])

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = (Math.random() * 10000).toFixed(0)
    setAnecdotes(anecdotes.concat(anecdote))
    setNotification(`a new anecdote '${anecdote.content}' created`)
    setTimeout(() => {
      setNotification('')
    }, 10000);
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  const match = useRouteMatch('/anecdotes/:id')
  const anecdote = match 
    ? anecdotes.find(anecdote => Number(anecdote.id) === Number(match.params.id))
    : null

  return (
    <div className="container">
      <h1>Software anecdotes</h1>
      <Menu />
      <Notification notification={notification}/>
      <Switch>
        <Route path="/anecdotes/:id">
          <Anecdote anecdote={anecdote} votehandleClick={() => vote(anecdote.id)}/>
        </Route>
        <Route path="/create">
          <CreateNew addNew={addNew} />
        </Route>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/">
          <AnecdoteList anecdotes={anecdotes}/>
        </Route>
      </Switch>  
      <Footer />
    </div>
  )
}

export default App;
