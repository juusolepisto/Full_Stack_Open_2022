import { useState } from 'react'

const Header = () => {
  return (
    <h2>
      Anecdote of the day
    </h2>
  )
}

const Favourite = (props) => {
  return (
    <div>
      <h2>
        Anecdote with the most votes
      </h2>
      <p>{props.anecdote}</p>
      <p>has {props.votes} votes</p>
    </div>
  )
}

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const Vote = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}


const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [voted, setVoted] = useState(0)

  const randomSelect = () => {
    const random = Math.floor(Math.random() * anecdotes.length);
    setSelected(random)
  }

  const points = new Uint8Array(anecdotes);

  const copy = {...points}

  const voteCounter = () => {
    setVoted(copy[points[selected]] += 1)
    console.log(copy)
  }

  return (
    <div>
      <Header/>
      {anecdotes[selected]} <br/>
      {'has ' + voted + ' votes.'}
      <div>
        <Vote handleClick={voteCounter} text='vote'/>
        <Button handleClick={randomSelect} text='next anecdote'/>
      </div>
      <Favourite />
    </div>
  )
}

export default App;
