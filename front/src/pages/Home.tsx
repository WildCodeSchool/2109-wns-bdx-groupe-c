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
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  formContainer: {
    display: 'grid',
    justifyContent: 'center',
    gridGap: '15px 0',
    alignItems: 'center',
    flexDirection: 'column',
    position: 'relative',
  },
  connectionButton: {
    backgroundColor: '#1F84E1',
    color: 'white',
    borderRadius:'20px',
    fontWeight: '700',
    minWidth: '150px',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    '&:hover': {
      backgroundColor: '#114e85',
      color: 'white',
    },
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
              Connect
            </Button>
          )}
          {connectionOn && <Login />}
        </Box>
      </Box>
    </>
  )
}
export default Home
