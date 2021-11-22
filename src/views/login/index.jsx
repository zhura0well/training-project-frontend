import React, { useState } from 'react'
import { Avatar, Button, TextField, Link, Container, makeStyles, Typography, Box } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import PropTypes from 'prop-types'
import { getData, postData } from '../../requests/requests'
import ErrorSnackbar from '../../components/error-snackbar'
import { useHistory } from 'react-router'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../redux/reducers/cartReducer'
import LoadingContainer from '../../components/loading-container'
import { GoogleLogin } from 'react-google-login'
import { GOOGLE_CLIENT_ID } from '../../clientConfig'


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
  const [userData, setUserData] = useState({
    username: '',
    password: '',
    firstName: '',
    lastName: ''
  })

  const [error, setError] = useState('')
  const [isErrorShown, setIsErrorShown] = useState(false)

  const dispatch = useDispatch()
  const [loading, setLoading] = useState(false)


  const login = async (usingGoogle, user) => {
    setLoading(true)
    const url = props.isRegistered ? usingGoogle ? '/api/googleLogin' : '/api/login' : '/api/register'

    postData(url, user)
      .then(response => {
        localStorage.setItem('roles', response.roles)
        localStorage.setItem('userId', response._id)
        history.push('/')
      })
      .then(() => {
        const id = localStorage.getItem('userId')
        getData(`/api/shoppingCart/${id}`)
          .then(response => {
            const cartItems = response.items
            for (let i = 0; i < cartItems.length; i++) {
              dispatch(addToCart({ _id: cartItems[i]._id, quantity: cartItems[i].quantity }))
            }
          })
        setUserData({})
        window.location.reload()
      })
      .catch(e => {
        setError(usingGoogle ? 'Non-existent username.Sign up first)' : e.statusText)
        setIsErrorShown(true)
      })
      .finally(() => setTimeout(() => {

        setLoading(false)
      }, 1000))
  }

  const googleSuccess = async (res) => {
    const response = res?.profileObj
    if (props.isRegistered) {
      login(true, { username: response.email })
    } else {
      setUserData({
        username: response.email,
        firstName: response.givenName,
        lastName: response.familyName,
      })
    }
  }


  const googleFailure = (res) => {
    console.log(res)
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
            {!props.isRegistered && <>
              <Box display='flex' justifyContent='space-between'>
                <TextField
                  value={userData.firstName}
                  onChange={(e) => setUserData({ ...userData, firstName: e.target.value })}
                  variant='outlined'
                  margin='normal'
                  required
                  fullWidth
                  label='First name'
                  autoFocus
                />
                <TextField
                  value={userData.lastName}
                  onChange={(e) => setUserData({ ...userData, lastName: e.target.value })}
                  variant='outlined'
                  margin='normal'
                  required
                  fullWidth
                  label='Last name'
                />
              </Box>
            </>}

            <TextField
              value={userData.username}
              onChange={(e) => setUserData({ ...userData, username: e.target.value })}
              variant='outlined'
              margin='normal'
              required
              fullWidth
              inputProps={{ 'data-testid': 'username' }}
              label='Username'
              autoFocus
            />
            <TextField
              value={userData.password}
              onChange={(e) => setUserData({ ...userData, password: e.target.value })}
              variant='outlined'
              margin='normal'
              required
              fullWidth
              label='Password'
              inputProps={{ 'data-testid': 'password' }}
              type='password'
              autoComplete='current-password'
            />


            <Button
              fullWidth
              variant='contained'
              color='primary'
              onClick={() => login(false, userData)}
              className={classes.submit}
            >
              {props.isRegistered ? 'Sign in' : 'Sign up'}
            </Button>

            <GoogleLogin
              clientId={GOOGLE_CLIENT_ID}
              render={(renderProps) => (
                <Button
                  className={classes.googleButton}
                  color='primary'
                  fullWidth
                  onClick={renderProps.onClick}
                  variant='contained'>
                  {props.isRegistered ? 'Sign In using Google' : 'Synchronize with Google'}
                </Button>
              )}
              onSuccess={googleSuccess}
              onFailure={googleFailure}
              cookiePolicy='single_host_origin'
            />

            <Box align='center' mt={2}>
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

