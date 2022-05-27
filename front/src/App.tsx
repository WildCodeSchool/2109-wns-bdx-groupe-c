import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Routes from './components/Routes'

function App(props: any) {

  return (
    <div className="App" style={{ backgroundColor: '#061B2E' }}>
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </div>
  )
}

export default App
