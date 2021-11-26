import React from 'react'
import ReactDOM from 'react-dom'
import { ThemeProvider } from '@mui/styles'
import App from './App'
// import commonTheme from './styles/theme'
import reportWebVitals from './reportWebVitals'
import { CssBaseline } from '@mui/material'

ReactDOM.render(
  <React.StrictMode>
    {/* <ThemeProvider theme={commonTheme}> */}
    <CssBaseline />
    <App />
    {/* </ThemeProvider> */}
  </React.StrictMode>,
  document.getElementById('root')
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals()
