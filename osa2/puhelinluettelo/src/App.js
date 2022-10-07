import { useState, useEffect } from 'react'
import personService from './services/numbers'

const Person = ({person, removeName}) => {
  return (
    <li>
      {person.name} {person.number}
      <button onClick={removeName}>delete</button>
    </li>
  )}

  const Filter = ({filter, handleFilterChange}) => {
    return (
      <div>
      filter shown with :
      <input 
        value={filter}
        onChange={handleFilterChange}
      />
    </div>

    )
  }

  const Form = ({addName, newName, handleNameChange, newNumber, handleNumberChange}) => {
    return(
      <form onSubmit={addName}>
        <div>
          name: 
          <input 
            value={newName}
            onChange={handleNameChange}
          />
        </div>
        <div>
          number:
          <input
            value={newNumber}
            onChange={handleNumberChange}
          />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
    )
  }

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [filter, setFilter] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  const hook = () => {
    personService
    .getAll()
    .then(initialPersons => {
      setPersons(initialPersons)
    })
  }

  useEffect(hook, [])

  const addName = (event) => {
    event.preventDefault()
    if (checkExistance() === false){
      const nameObject = {
        name: newName,
        number: newNumber,
      }
      
      personService
        .create(nameObject)
        .then(returnedPerson => {
          setPersons(persons.concat(returnedPerson))
          setNewName('')
          setNewNumber('')
        })
    }
  }

  const removeName = (id) => {
    const person = persons.find(p => p.id === id)
    console.log(person.id)
    if (window.confirm(`Do you want to delete ${person.name}?`)) {
      personService.remove(person.id)
      window.location.reload()
      }
  }

  // HandleChanges...

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }
  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const checkExistance = (id) => {
    const person = persons.some(person => person.name.includes(newName))
    const changedPerson = { ...person, number: newNumber}

    if (person === true){
      personService
        .update(id, changedPerson)
        .then(returnedPerson => {
          setPersons(persons.map(person => person.id !== id ? person : returnedPerson))
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange}/>
      <h3>Add a new</h3>
      <Form addName={addName} 
      newName={newName} handleNameChange={handleNameChange} 
      newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h3>Numbers</h3>
      <ul>
        {persons
        .filter(person => {
          if (!filter) return true;
          if (person.name.includes(filter)) return true;
          return false;
        })
        .map(person => 
          <Person 
            key={person.id}
            person={person}
            removeName={() => removeName(person.id)}
          />  
        )}
      </ul>
    </div>
  )
}

export default App