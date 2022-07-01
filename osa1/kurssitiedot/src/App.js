
const Header = (props) => {
  return (
    <div>
      <h1>{props.course}</h1>
    </div>
  )
}

const Part = (props) => {
  return(
    <div>
      <p>{props.part} {props.excercises}</p>
    </div>
  )
}

const Content = () => {
  return (
    <div>
      <Part part='Fundamentals of React' excercises={10} />
      <Part part='Using props to pass data' excercises={7} />
      <Part part='State of a component' excercises={14} />
    </div>
  )
}

const Total = (props) => {
  return (
    <div>
      <p>
        Number of excercises {props.total}
      </p>
    </div>
  )
}

const App = () => {
  const course = 'Half Stack application development'
  const excercises1 = 10
  const excercises2 = 7
  const excercises3 = 14
  const total = excercises1+excercises2+excercises3

  return (
    <div>
      <Header course={course}/>
      <Content />
      <Total total={total}/>
    </div>
  )
}

export default App