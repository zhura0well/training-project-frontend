import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Container, Box, Typography, Divider } from '@material-ui/core'
import { getData } from '../../requests'
import LinearUserInfo from '../../components/linear-user-info'
import { setUsers } from '../../redux/reducers/allUsersReducer'

const AllUsers = () => {

  const users = useSelector(state => state.allUsers.users)
  const dispatch = useDispatch()

  useEffect(() => {
    getData('/api/roles')
      .then(response => {
        dispatch(setUsers({ users: response }))
      })

  }, [])

  return (
    <Container component='main' maxWidth='lg'>
      <Box mt={10} className='user-info-container' sx={{bgcolor: '#ceb19c'}}>

        <Box p={3}>
          <Typography variant='h6' >Avatar</Typography>
        </Box>

        <Box p={3}>
          <Typography variant='h6' >User id</Typography>
        </Box>

        <Box p={3}>
          <Typography variant='h6' >Username</Typography>
        </Box>

        <Box p={3}>
          <Typography variant='h6' >Roles</Typography>
        </Box>

      </Box>
      <Divider/>
      {users && users.map((user, index) => <LinearUserInfo key={index} user={{ ...user, id: index + 1 }} />)}
    </Container>

  )

}

export default AllUsers

