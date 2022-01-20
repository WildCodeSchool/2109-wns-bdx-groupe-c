import { useState } from 'react'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Box, Button, IconButton, InputAdornment, TextField } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles({
  connectionButton: {
    backgroundColor: '#7273FF',
    color: '#061B2E',
  },
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
  return (
    <>
      <form>
        <Box display="flex" flexDirection="column">
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
          <Button className={classes.connectionButton} type="submit">
            Se connecter
          </Button>
        </Box>
      </form>
      <Button
        className={classes.connectionButton}
        onClick={() => {
          setConnectionOn(false)
          history.push('/')
        }}
      >
        Accueil
      </Button>
    </>
  )
}

export default Login
