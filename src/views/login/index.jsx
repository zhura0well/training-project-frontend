import React, { useState } from 'react'
import { Avatar, Button, TextField, Link, Container, makeStyles, Typography, Box } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import PropTypes from 'prop-types'
import { postData } from '../../requests'
import ErrorSnackbar from '../../components/error-snackbar'
import { useHistory } from 'react-router'
import LoadingContainer from '../../components/loading-container'

const Login = (props) => {

  //Styles
  const useStyles = makeStyles((theme) => ({
    paper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
    },
    avatar: {
      margin: theme.spacing(1),
      backgroundColor: theme.palette.secondary.main,
    },
    form: {
      width: '100%',
      marginTop: theme.spacing(1),
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }))

  const classes = useStyles()

  //Logic
  const history = useHistory()

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const [error, setError] = useState('')
  const [isErrorShown, setIsErrorShown] = useState(false)

  const [loading, setLoading] = useState(false)


  const login = async () => {
    setLoading(true)
    const url = props.isRegistered ? '/api/login' : '/api/register'

    postData(url, { username, password })
      .then(response => localStorage.setItem('roles', response.roles))
      .then(() => {
        setUsername('')
        setPassword('')
        history.replace('/')
      })
      .catch(e => {
        setError(e.statusText)
        setIsErrorShown(true)
      })
      .finally(() => setTimeout(() => setLoading(false), 1000))
  }

  return (
    <Container component='main' maxWidth='xs'>
      <LoadingContainer loading={loading}>

        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component='h1' variant='h5'>
            {props.isRegistered ? 'Sign in' : 'Sign up'}
          </Typography>
          <form className={classes.form}>
            <TextField
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              variant='outlined'
              margin='normal'
              required
              fullWidth
              label='Username'
              autoFocus
            />
            <TextField
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              variant='outlined'
              margin='normal'
              required
              fullWidth
              label='Password'
              type='password'
              autoComplete='current-password'
            />
            <Button
              fullWidth
              variant='contained'
              color='primary'
              onClick={login}
              className={classes.submit}
            >
              {props.isRegistered ? 'Sign in' : 'Sign up'}
            </Button>

            <Box align='center'>
              <Link href='/register' variant='body2'>
                {props.isRegistered && 'Don`t have an account? Sign Up'}
              </Link>
            </Box>
          </form>
        </div>

      </LoadingContainer>
      {isErrorShown && <ErrorSnackbar errorMessage={error} setIsErrorShown={setIsErrorShown} />}
    </Container>
  )
}

Login.propTypes = { isRegistered: PropTypes.bool }

export default Login

