const Person = ({person, removeName}) => {
    return (
      <li>
        {person.name} {person.number}
        <button onClick={removeName}>delete</button>
      </li>
    )
  }
  

  export default Person