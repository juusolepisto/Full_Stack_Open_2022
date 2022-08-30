import { useState, useEffect } from 'react'
import axios from 'axios'

const Persons = ({persons, filter}) => {
  return (
    <ul>
      {persons
      .filter(person => {
        if (!filter) return true;
        if (person.name.includes(filter)) return true;
        return false;
      })
      .map(person =>
        <li key={person.name}>{person.name} {person.number}</li>  
      )}
    </ul>
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
    console.log('effect')
    axios
    .get('http://localhost:3001/persons')
    .then(response => {
      console.log('promise fulfilled')
      setPersons(response.data)
    })
  }

  useEffect(hook, [])

  const addName = (event) => {
    event.preventDefault()
    if (checkExistance() === false){
      const nameObject = {
        name: newName,
        number: newNumber
      }
  
      setPersons(persons.concat(nameObject))
      setNewName('')
      setNewNumber('')
    }
  }

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

  const checkExistance = () => {
    const exists = persons.some(person => person.name.includes(newName))
    console.log(exists)
    return (exists ? alert(`${newName} is already added to phonebook`) : false)
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
      <Persons persons={persons} filter={filter}/>
    </div>
  )
}

export default App