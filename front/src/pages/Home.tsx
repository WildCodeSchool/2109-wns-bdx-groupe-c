import { useState } from 'react'
import { makeStyles } from '@mui/styles'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import { useHistory } from 'react-router-dom'

import Login from './Login'

const useStyles = makeStyles({
  mainContainer: {
    backgroundColor: '#061B2E',
    height: '100vh',
    width: '100vw',
  },
  formContainer: {
    display: 'grid',
    justifyContent: 'center',
    gridGap: '15px 0',
    alignItems: 'center',
    flexDirection: 'column',
    position: 'relative',
    top: '40%',
  },
  connectionButton: {
    backgroundColor: '#7273FF',
    color: '#061B2E',
  },
})

const Home = () => {
  const classes = useStyles()
  const history = useHistory()
  
  const [connectionOn, setConnectionOn] = useState(false)

  return (
    <>
      <Box className={classes.mainContainer}>
        <Box className={classes.formContainer}>
          {!connectionOn && (
            <Button
              className={classes.connectionButton}
              onClick={() => {
                setConnectionOn(true)
                history.push('/login')
              }}
            >
              Se connecter
            </Button>
          )}
          {connectionOn && <Login setConnectionOn={setConnectionOn} />}
        </Box>
      </Box>
    </>
  )
}
export default Home
