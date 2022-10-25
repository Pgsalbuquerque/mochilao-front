import React, {useEffect, useState} from 'react';
import './App.css';
import Email from './Email'
import Travel from './Travel'
import Dashboard from './Dashboard'
 
 function App() {
  const [tokenValid, setTokenValid] = useState(false)
  const [tokenTravel, setTokenTravel] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('email-mochilao')
    const tokenTravel = localStorage.getItem('travel-mochilao')
    if (token) {
      setTokenValid(true)
    }
    if (tokenTravel) {
      setTokenTravel(true)
    }
  }, [])

  return tokenValid ? tokenTravel ? <Dashboard/>: <Travel/> : <Email/>
}

export default App;
