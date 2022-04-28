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
    backgroundColor: '#7273FF',
    color: '#061B2E',
  },
  textFieldArea: {
    backgroundColor: '#FFFFF',
  },
  loginError: {
    color: '#FF0000',
    backgroundColor: '#FFFFF',
  }
})

interface loginProps {
  setConnectionOn: React.Dispatch<React.SetStateAction<boolean>>
}

const Login = ({ setConnectionOn }: loginProps) => {
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
              label="Email"
              variant="standard"
              value={email}
              onChange={event => setEmail(event.target.value)}
            />
            <TextField
              variant="standard"
              type={showPassword ? 'text' : 'password'}
              label="Mot de passe"
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
            Se connecter
          </Button>
        </Box>
      </form>
      <Button
        className={classes.connectionButton}
      >
        Accueil
      </Button>
    </>
  )
}

export default Login
