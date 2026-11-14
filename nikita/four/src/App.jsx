import { useState } from 'react'
import './App.css'
import ClickButton from './ClickButton'

function App() {
  const [votes1, setVotes1] = useState(0)
  const [votes2, setVotes2] = useState(0)
  const [isEnded, setIsEnded] = useState(false)

  return (
    <div>
      <h1>Голосование</h1>
      <ClickButton label="Вариант 1" count={votes1} onClick={() => setVotes1(votes1 + 1)} />
      <ClickButton label="Вариант 2" count={votes2} onClick={() => setVotes2(votes2 + 1)} />

      <br />
      <button onClick={() => setIsEnded(true)}>Завершить голосование</button>

      {isEnded && <h2>{votes1 > votes2 ? 'Победил Вариант 1' : 'Победил Вариант 2'}</h2>}
    </div>
  )
}

export default App
