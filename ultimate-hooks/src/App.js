/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from 'react'
import axios from 'axios'


const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return [{
    type,
    value,
    onChange
  }, setValue]
}

const useResource = (baseUrl) => {
  const [resources, setResources] = useState([])

  useEffect(() => {
    axios
       .get(baseUrl)
       .then(initialResources => setResources(initialResources.data))
  }, [])

  const getAll = () => {
    const request = axios.get(baseUrl)
    return request.then(response => response.data)
  }

  const create = async newObject => {
    const response = await axios.post(baseUrl, newObject)
    return response.data
  }

  const service = {
    getAll,
    create,
    setResources
  }

  return [
    resources, service
  ]
}

const App = () => {
  const [content, setcontentValue] = useField('text')
  const [name, setnameValue] = useField('text')
  const [number, setnumberValue] = useField('text')

  const [notes, noteService] = useResource('http://localhost:3005/notes')
  const [persons, personService] = useResource('http://localhost:3005/persons')

  const handleNoteSubmit = (event) => {
    event.preventDefault()
    noteService.create({ content: content.value })
    .then(returnedNote => {
      noteService.setResources(notes.concat(returnedNote))}, 
      setcontentValue(''))
  }
 
  const handlePersonSubmit = (event) => {
    event.preventDefault()
    personService.create({ name: name.value, number: number.value})
    .then(returnedPerson => {
      personService.setResources(persons.concat(returnedPerson))},
      setnameValue(''), setnumberValue(''))
  }

  return (
    <div>
      <h2>notes</h2>
      <form onSubmit={handleNoteSubmit}>
        <input {...content} />
        <button>create</button>
      </form>
      {notes.map(n => <p key={n.id}>{n.content}</p>)}

      <h2>persons</h2>
      <form onSubmit={handlePersonSubmit}>
        name <input {...name} /> <br/>
        number <input {...number} />
        <button>create</button>
      </form>
      {persons.map(n => <p key={n.id}>{n.name} {n.number}</p>)}
    </div>
  )
}

export default App