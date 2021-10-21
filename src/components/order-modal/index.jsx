import { Box, Typography, Modal, IconButton, TextField, Button } from '@material-ui/core'
import { CloseOutlined } from '@material-ui/icons'
import { PropTypes } from 'prop-types'
import React, { useState } from 'react'
import { postData } from '../../requests'
import ErrorSnackbar from '../error-snackbar'
import SuccessSnackbar from '../success-snackbar'

const OrderModal = ({ isModalOpen, setIsModalOpen }) => {

  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')


  const [error, setError] = useState('')
  const [isErrorShown, setIsErrorShown] = useState(false)


  const [successMessage, setSuccessMessage] = useState('')
  const [isMessageShown, setIsMessageShown] = useState(false)


  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid blue',
    boxShadow: 24,
    py: 2,
    px: 10
  }

  const onModalClose = () => setIsModalOpen(false)

  const postOrderData = () => {
    postData('/api/testPoint', { email, phone })
      .then(() => {
        setSuccessMessage('Successfully updated!')
        setIsMessageShown(true)
      })
      .catch(e => {
        setError(e.statusText)
        setIsErrorShown(true)
      })
  }
  return (
    <>
      <Modal
        open={isModalOpen}
        onClose={onModalClose}
      >
        <Box sx={style}>
          <Box display='flex' justifyContent='end' mb={2}>
            <IconButton
              size='small'
              aria-label='close'
              color='inherit'
              onClick={onModalClose}
            >
              <CloseOutlined fontSize='small' />
            </IconButton>
          </Box>
          <Typography variant='h6' component='p' align='center'>
            Enter your data
          </Typography>
          <TextField
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            margin='normal'
            required
            fullWidth
            label='Username'
            autoFocus
            size='small'
            type='email'
          />
          <TextField
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            margin='normal'
            required
            fullWidth
            label='Phone Number'
            size='small'
            type='tel'
            mb={5}
          />
          <Box mt={5}>
            <Button

              fullWidth
              variant='contained'
              color='primary'
              onClick={() => postOrderData()}
            >
              Place an order
            </Button>
          </Box>

        </Box>

      </Modal>
      {isMessageShown && <SuccessSnackbar successMessage={successMessage} setIsMessageShown={setIsMessageShown} />}
      {isErrorShown && <ErrorSnackbar errorMessage={error} setIsErrorShown={setIsErrorShown} />}
    </>
  )
}

OrderModal.propTypes = {
  isModalOpen: PropTypes.bool,
  setIsModalOpen: PropTypes.func,
}
export default OrderModal

