import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import MenuAppBar from './components/molecules/Header'
import Routes from './components/Routes'

console.log('globalThis :', globalThis.location)

function App(props: any) {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </div>
  )
}

export default App
