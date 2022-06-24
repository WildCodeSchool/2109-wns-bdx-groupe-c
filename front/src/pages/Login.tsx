import { useState, useCallback, useMemo } from 'react'
import { useMutation, ApolloError } from "@apollo/client";
import { SIGN_IN } from "../queries/login"
import { MY_PROFILE } from '../queries/user';

import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Box, Button, IconButton, InputAdornment, TextField } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles({
  connectionButton: {
    marginTop: '2rem',
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
  textFieldArea: {
    backgroundColor: '#FFFFF',
    "& .MuiInput-root": {
      color: 'white',
    },
    "& .MuiInput-root::before": {
      borderColor: 'white',
    },
    "& .MuiInput-root:hover::before": {
      borderColor: '#1F84E1',
    },
    "& .MuiFormLabel-root": {
      color: "white",
      fontWeight: '700',
    },
    "& .MuiTextField-root": {
      marginBottom: '2rem',
    }
  },
  loginError: {
    color: '#FF0000',
    backgroundColor: '#FFFFF',
  }
})

const Login = () => {
  const classes = useStyles()
  const history = useHistory()
  const [showPassword, setShowPassword] = useState(false)
  const [password, setPassword] = useState('')
  const [email, setEmail] = useState('')

  const [signIn] = useMutation(SIGN_IN);

  const [error, setError] = useState<ApolloError | null>(null)

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
      await signIn({
        variables: { email, password },
        refetchQueries: [ MY_PROFILE ]
      });
      history.push('/')
    } catch (error) {
      setError(error as ApolloError)
    }
  }, [signIn, email, password])

  const loginError = useMemo(() => {
    if (error) return error.graphQLErrors[0].message
    return null
  }, [error]);

  return (
    <>
      <form onSubmit={handleSubmit}>
        <Box display="flex" flexDirection="column">
          <Box display="flex" flexDirection="column" className={classes.textFieldArea}>
            <TextField
              id="email"
              type="email"
              label="E-mail"
              variant="standard"
              value={email}
              onChange={event => setEmail(event.target.value)}
            />
            <TextField
              variant="standard"
              type={showPassword ? 'text' : 'password'}
              label="Password"
              onChange={event => setPassword(event.target.value)}
              value={password}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={() => setShowPassword(!showPassword)}
                      onMouseDown={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <Visibility sx={{ color: 'white' }} />
                      ) : (
                        <VisibilityOff sx={{ color: 'white' }} />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{ color: 'white' }}
            />
          </Box>
          {loginError && <Box className={classes.loginError}>{loginError}</Box>}
          <Button className={classes.connectionButton} type="submit">
            Connect
          </Button>
        </Box>
      </form>
      <Button
        className={classes.connectionButton}
      >
        Home
      </Button>
    </>
  )
}

export default Login
