import { useState } from 'react'
import './App.css'
import NavPanel from './components/NavPanel'
import Note from './components/Note'
import AllNotes from './components/AllNotes'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
    <NavPanel />
    <AllNotes />
    </>
  )
}

export default App
