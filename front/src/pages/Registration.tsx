import { useState, useMemo, useCallback } from 'react'
import { useMutation, ApolloError } from "@apollo/client";
import { makeStyles } from '@mui/styles'
import { Box, Button, IconButton, InputAdornment, TextField } from '@mui/material'
import { Visibility, VisibilityOff } from '@mui/icons-material'
import { useHistory } from 'react-router-dom'
import { SIGN_UP } from "../queries/login"
import { MY_PROFILE } from '../queries/user';

const useStyles = makeStyles({
    globalContainer: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#061B2E',
        height: '100vh',
        width: '100vw',
    },
    container: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginBottom: '2rem',
    },
    title: {
        color: '#fff',
    },
    form: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        width: '60%',
        maxWidth: '750px',
        padding: '2rem',
        backgroundColor: '#0F4473',
        borderRadius: '12px',
    },
    inputsContainer: {
        display: 'grid',
        gridGap: '2rem',
        gridTemplateColumns: 'repeat(2, 1fr)',
    },
    topImg: {

    },
    topTitle: {
        color: '#fff',
    },
    inputFirstname: {
        gridColumn: '1',
        gridRow: '1',
    },
    inputLastname: {
        gridColumn: '2',
        gridRow: '1',
    },
    inputEmail: {
        gridColumn: '1',
        gridRow: '2',
    },
    inputPassword: {
        gridColumn: '2',
        gridRow: '2',
    },
    button: {
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
    signUpError: {
        color: '#FF0000',
        backgroundColor: '#FFFFF',
    },
})

const Registration = () => {
  const classes = useStyles();
  const history = useHistory();

  const [firstName, setFirstname] = useState('');
  const [lastName, setLastname] = useState('');
  const [email, setEmail] = useState('');

  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState('');

  // ---------------------------------------

  const [signUp] = useMutation(SIGN_UP);

  const [error, setError] = useState<ApolloError | null>(null)

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    try {
        await signUp({
            variables: { firstName, lastName, email, password },
            refetchQueries: [ MY_PROFILE ]
        });
        history.push('/login')
    } catch (error) {
        setError(error as ApolloError)
    }
  }, [signUp, firstName, lastName, email, password]);
  
  const signUpError = useMemo(() => {
    if (error) return error.graphQLErrors[0].message
    return null
  }, [error]);

    return (
        <Box className={classes.globalContainer}>
            <Box className={classes.container}>
                <img src={'../../../logo.svg'} className={classes.topImg} onClick={() => history.push('/registration')} alt={''} />
                <h1 className={classes.topTitle}>"Think Lion, not kitty"</h1>
            </Box>
            <form className={classes.form} onSubmit={handleSubmit}>
                <Box className={classes.inputsContainer}>
                    <TextField
                        id="lastname"
                        type="string"
                        label="Lastname"
                        className={classes.inputFirstname}
                        value={lastName}
                        onChange={event => setLastname(event.target.value)}
                        />
                    <TextField
                        id="firstname"
                        type="string"
                        label="Firstname"
                        className={classes.inputLastname}
                        value={firstName}
                        onChange={event => setFirstname(event.target.value)}
                        />
                    <TextField
                        id="email"
                        type="email"
                        label="E-mail"
                        className={classes.inputEmail}
                        value={email}
                        onChange={event => setEmail(event.target.value)}
                    />
                    <TextField
                        type={showPassword ? 'text' : 'password'}
                        label="Password"
                        onChange={event => setPassword(event.target.value)}
                        value={password}
                        className={classes.inputPassword}
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
                    />
                    {signUpError && <Box className={classes.signUpError}>{signUpError}</Box>}
                </Box>
                <Button
                    className={classes.button}
                    onClick={() => {}}
                    type={'submit'}
                >
                    Register
                </Button>
            </form>
        </Box>
    )
}

export default Registration
