import { useState } from 'react'
import Login from './components/Login/Login'
import './App.css'

function App() {
  const [loggedIn, setLoggedIn] = useState<boolean>(false)

  return (
    <>
    <div>
      <div className='login'>
        {!loggedIn &&}
        <Login onLoggedIn={setLoggedIn}/>
      </div>
    </div>
    </>
  )
}

export default App
