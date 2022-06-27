import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import Toast from './components/molecules/Toast'
import Routes from './components/Routes'
import { ToastContextProvider } from './contexts/ToastContext'

function App(props: any) {

  return (
    <div className="App" style={{ backgroundColor: '#061B2E' }}>
      <ToastContextProvider>
        <BrowserRouter>
          <Routes />
        </BrowserRouter>
        <Toast />
      </ToastContextProvider>
    </div>
  )
}

export default App
