import { useState } from 'react'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { Box, Button, FormControl, IconButton, InputAdornment, TextField } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles({})

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
        <FormControl hiddenLabel variant="standard">
          <Box sx={{ display: 'grid', gridTemplate: 'repeat(3, auto) / auto', gridGap: '40px' }}>
            <TextField
              id="email"
              type="email"
              aria-label="Email"
              hiddenLabel
              placeholder="Email"
              variant="standard"
              value={email}
              onChange={event => setEmail(event.target.value)}
              sx={{
                borderBottom: '2px solid #A5A6F6',
                '&::after': {
                  borderBottom: '2px solid #A5A6F6',
                },
                '&::placeholder': {
                  color: 'white',
                },
                '& .MuiInput-input': {
                  color: 'white',
                  lineHeight: '46px',
                  height: '46px',
                  fontSize: '28px',
                },
              }}
            />
            <TextField
              variant="standard"
              type={showPassword ? 'text' : 'password'}
              aria-label="Mot de passe"
              hiddenLabel
              placeholder="Mot de passe"
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
              sx={{
                borderBottom: '2px solid #A5A6F6',
                '&::after': {
                  borderBottom: '2px solid #A5A6F6',
                },
                '& .MuiInput-input': {
                  color: 'white',
                  lineHeight: '46px',
                  height: '46px',
                  fontSize: '28px',
                },
              }}
            />
            <Button
              sx={{
                backgroundColor: '#1F84E1',
                color: 'white',
                fontSize: '26px',
                lineHeight: '31px',
                fontWeight: '400',
                borderRadius: '36px',
                padding: '20px 33px',
                justifySelf: 'center',
              }}
              type="submit"
            >
              Se connecter
            </Button>
          </Box>
        </FormControl>
      </form>
      <Button
        sx={{
          backgroundColor: '#1F84E1',
          color: 'white',
          fontSize: '26px',
          lineHeight: '31px',
          fontWeight: '400',
          borderRadius: '36px',
          padding: '20px 33px',
          justifySelf: 'center',
        }}
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
