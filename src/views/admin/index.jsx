import React from 'react'
import { Container, Typography} from '@material-ui/core'

const Admin = () => {

  return (
    <Container component='main' maxWidth='xs'>

      <Typography component='h1' variant='h5'>
        TEST
        only admin can see this text
      </Typography>

    </Container>
  )

}

export default Admin

