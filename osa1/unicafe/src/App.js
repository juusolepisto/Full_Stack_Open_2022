import { useState } from "react";

const Header = () => {
  return (
    <h2>
      give feedback 
    </h2>
  )
} 

const StatsHeader = () => {
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

const StatisticLine = (props) => {
  return (
    <tr>{props.text} {props.value}</tr>
  )
}

const Statistics = (props) => {
  if (props.all===0)
  {
    return (
      <StatisticLine text='No feedback given'/>
    )
  }
  else {
    return(
      <table>
        <tbody>
            <StatisticLine text='good' value={props.good}/>
            <StatisticLine text='neutral' value={props.neutral}/>
            <StatisticLine text='bad' value={props.bad}/>
            <StatisticLine text='all' value={props.all}/>
            <StatisticLine text='average' value={props.average}/>
            <StatisticLine text='positive' value={props.positive}/>
        </tbody>
      </table>
    )
  }
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
      <StatsHeader/>
      <Statistics good={good} neutral={neutral} bad={bad} 
      all={good + neutral + bad} average={(good / (good + neutral + bad))}
      positive={(good / (good + neutral + bad)) * 100}/>
    </div>
  ) 
}

export default App