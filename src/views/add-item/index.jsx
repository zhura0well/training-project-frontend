import React, { useEffect, useState } from 'react'
import { Container, Typography, Box, TextField, Button } from '@material-ui/core'
import { deleteData, getData, postData, putData } from '../../requests'
import ErrorSnackbar from '../../components/error-snackbar'
import SuccessSnackbar from '../../components/success-snackbar'
import { PropTypes } from 'prop-types'
import { useParams } from 'react-router'

const AddItem = ({ isEditable }) => {

  const { id } = useParams()
  const [item, setItem] = useState({
    title: '',
    description: '',
    price: 0
  })

  const [error, setError] = useState('')
  const [isErrorShown, setIsErrorShown] = useState(false)

  const [successMessage, setSuccessMessage] = useState('')
  const [isMessageShown, setIsMessageShown] = useState(false)


  useEffect(() => {
    if (isEditable) {
      getData(`/api/products/${id}`)
        .then(response => setItem(response))
        .catch(e => {
          setError(e.statusText)
          setIsErrorShown(true)
        })
    }

  }, [])


  const reset = () => setItem({
    title: '',
    description: '',
    price: 0
  })


  const addItem = () => {
    postData(`/api/products`, item)
      .then(() => {
        setSuccessMessage('Successfully added!')
        setIsMessageShown(true)
        reset()
      })
      .catch(e => {
        setError(e.statusText)
        setIsErrorShown(true)
      })
  }


  const editItem = () => {
    putData(`/api/products/${id}`, item)
      .then(() => {
        setSuccessMessage('Successfully updated!')
        setIsMessageShown(true)
        reset()
      })
      .catch(e => {
        setError(e.statusText)
        setIsErrorShown(true)
      })
  }

  const deleteItem = () => {
    deleteData(`/api/products/${id}`)
      .then(() => {
        setSuccessMessage('Successfully deleted!')
        setIsMessageShown(true)
        reset()
      })
      .catch(e => {
        setError(e.statusText)
        setIsErrorShown(true)
      })
  }


  return (
    <Container component='main'>

      <Box mb={5}>
        <Typography variant='h5' align='center'>
          Do you want to add/edit an item?
        </Typography>
        <Typography variant='h6' align='center'>
          Please fill in
        </Typography>

      </Box>

      <Box>
        <form>
          <Box display='flex' justifyContent='space-evenly'>

            <TextField
              value={item.title}
              onChange={(e) => setItem({ ...item, title: e.target.value })}
              variant='filled'
              helperText='Please enter discount title'
              label='Title'
              required
              autoFocus
            />

            <TextField
              value={item.price}
              type='number'
              onChange={(e) => setItem({ ...item, price: e.target.value })}
              variant='filled'
              required
              helperText='Please enter price (for 1 item in $)'
              label='Price'
            />
          </Box>

          <Box mx='auto' mt={5} width='50%'>
            <TextField
              multiline
              minRows={4}
              value={item.description}
              onChange={(e) => setItem({ ...item, description: e.target.value })}
              variant='outlined'
              required
              fullWidth
              helperText='Please enter description (full) '
              label='Description'
            />
          </Box>

          <Box mx='auto' mt={5} display='flex' justifyContent='space-evenly'>
            <Button
              variant='contained'
              color='primary'
              onClick={isEditable ? () => editItem() : () => addItem()}
              size='large'
            >
              Save
            </Button>

            <Button
              variant='contained'
              onClick={reset}
              size='large'
            >
              Reset
            </Button>

            {isEditable && <Button
              variant='contained'
              onClick={deleteItem}
              size='large'
              style={{ backgroundColor: '#bf2202', color: '#FFFFFF' }}
            >
              Delete
            </Button>}
          </Box>


        </form>
      </Box>
      {isMessageShown && <SuccessSnackbar successMessage={successMessage} setIsMessageShown={setIsMessageShown} />}
      {isErrorShown && <ErrorSnackbar errorMessage={error} setIsErrorShown={setIsErrorShown} />}
    </Container>
  )

}

AddItem.propTypes = {
  isEditable: PropTypes.bool
}



export default AddItem

