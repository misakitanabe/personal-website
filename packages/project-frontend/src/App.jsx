import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Upload from "./pages/Upload";
import Build from './pages/Build'

function App() {
  const [itemName, setItemName] = useState("");

  return (
    <Upload onChange={(e) => {setItemName(e.target.value)}} itemName={itemName} />
    // <Build />
  )
}

export default App
