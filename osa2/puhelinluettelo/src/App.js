import { useState, useEffect } from 'react'
import personService from './services/numbers'
import Notification from './components/Notification'
import Form from './components/Form'
import Person from './components/Person'
import Filter from './components/Filter'

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [filter, setFilter] = useState('')
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [successMessage, setSuccessMessage] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)

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
        setSuccessMessage(`${returnedPerson.name} added to phonebook`)
      })
      setTimeout(() => {
        window.location.reload(false)
      },3000)
    }
  }

  const removeName = (id) => {
    const person = persons.find(p => p.id === id)
    console.log(person.id)
    if (window.confirm(`Do you want to delete ${person.name}?`)) {
      personService
      .remove(person.id)
      .then(
        setTimeout(() => {
          setSuccessMessage(`${person.name} removed from phonebook`)
        }, 3000))
      .catch(error =>
      {
        setErrorMessage(`${person.name} data has already been deleted`)
      })
      setTimeout(() => {
        window.location.reload(false)
      }, 3000)
    }
  }

  const checkExistance = () => {
    const person = persons.find(p => p.name === newName)
    if (person === undefined){
      return (false)
    }
    const changedPerson = { ...person, number: newNumber}

    if (persons.includes(person)){
      if (window.confirm(`This person already has exists. Update the number?`)){
        console.log('updating...')
        return (          
          personService
            .update(person.id, changedPerson)
            .then(returnedPerson => {
              setSuccessMessage(`${returnedPerson.name} number updated`)
              setTimeout(() => {
                window.location.reload(false)
              }, 3000)
            })
        )
      }
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

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={successMessage} />
      <Filter filter={filter} handleFilterChange={handleFilterChange}/>
      <h3>Add a new</h3>
      <Form addName={addName} 
      newName={newName} handleNameChange={handleNameChange} 
      newNumber={newNumber} handleNumberChange={handleNumberChange}
      />
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