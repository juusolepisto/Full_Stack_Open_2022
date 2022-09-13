import { useState, useEffect } from "react";
import axios from 'axios'

const Results = ({countries, filter}) => {
  return(
    <ul>
      {countries
      .filter(country => {
        if (!filter) return true;
        if (country.name.common.includes(filter)) return true;
        return false;
      })
      .map(country => {
        console.log("Size",country.size)
        if (country.size <= 10){
          return (<li key={country.cca2}>{country.name.common}</li>)
        }
        else if (country.size = 1){
          return (
            <div key={country.cca2}>
              <h2>{country.name.common}</h2>
              capital {country.capital} <br/>
              area {country.area} <br/>
              languages: 
              <br/>

              <img src={country.flags.png} />
            </div>
          )
        }
        }
        )}
    </ul>
  )}

const Filter = ({filter, handleFiltering}) => {
  return(
    <div>
      find countries&nbsp;
        <input
        value={filter}
        onChange={handleFiltering}
        />
    </div>      
  )
}

const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  const hook = () => {
    console.log('effect')
    axios
    .get('https://restcountries.com/v3.1/all')
    .then(response => {
      console.log('promise fulfilled')
      setCountries(response.data)
      console.log(response.data)
    })
  }

  useEffect(hook, [])

  const handleFiltering = (event) => {
    event.preventDefault()
    setFilter(event.target.value)
  }

  return (
    <div>
      <Filter filter={filter} handleFiltering={handleFiltering}/>
      <Results countries={countries} filter={filter}/>
    </div>
  );
}

export default App;
