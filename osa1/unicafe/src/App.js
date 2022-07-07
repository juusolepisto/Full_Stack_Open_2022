import { useState } from "react";

const Header = () => {
  return (
    <h2>
      give feedback 
    </h2>
  )
} 

const Statistics = () => {
  return (
    <h2>statistics</h2>
  )
}

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
    )
  }

const Stats = ({title, data}) => {
  return (
    <p>{title} {data}</p>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodHandle = () => {
    setGood(good + 1)
  }
  const neutralHandle = () => {
    setNeutral(neutral + 1)
  }
  const badHandle = () => {
    setBad(bad + 1)
  }
  
  return (
    <div>
      <Header/>
      <div>
        <Button handleClick={goodHandle} text='good'/>
        <Button handleClick={neutralHandle} text='neutral'/>
        <Button handleClick={badHandle} text='bad'/>
      </div>
      <Statistics/>
      <Stats title='good' data={good}/>
      <Stats title='neutral' data={neutral}/>
      <Stats title='bad' data={bad}/>
      <Stats />
      <Stats />
    </div>
  ) 
}

export default App