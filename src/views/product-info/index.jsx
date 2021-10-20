import React, { useEffect, useState } from 'react'
import { Container, Typography, Box, Button } from '@material-ui/core'
import imagePlaceholder from '../../assets/image-placeholder.jpg'
import { useParams } from 'react-router'
import { getData } from '../../requests'
import ErrorSnackbar from '../../components/error-snackbar'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../redux/reducers/cartReducer'
import SuccessSnackbar from '../../components/success-snackbar'
import Spinner from '../../components/spinner'

const ProductInfo = () => {

  const [error, setError] = useState('')
  const [isErrorShown, setIsErrorShown] = useState(false)

  const [loading, setLoading] = useState(false)

  const [product, setProduct] = useState({
    title: '',
    description: '',
    price: 0
  })

  const [successMessage, setSuccessMessage] = useState('')
  const [isMessageShown, setIsMessageShown] = useState(false)

  const dispatch = useDispatch()

  const { id } = useParams()
  useEffect(() => {
    setLoading(true)
    getData(`/api/products/${id}`)
      .then(response => {
        setProduct(response)
      })
      .catch(e => {
        setError(e.statusText)
        setIsErrorShown(true)
      })
      .finally(() => setTimeout(() => setLoading(false), 1000))
  }, [])

  const onButtonClick = (_id) => {
    dispatch(addToCart({ _id: _id }))

    setSuccessMessage('Added to shopping cart)')
    setIsMessageShown(true)
  }

  return (
    <Container>
      {loading && <Spinner />}
      {!loading &&
        <Box display='flex' justifyContent='space-between' alignItems='center'>
          <Box mx={5}>
            <Box mb={4}>
              <Typography variant='h4' align='center'>
                {product.title}
              </Typography>
            </Box>

            <img src={imagePlaceholder} alt="product" width='500px' />

            <Box mt={4}>
              <Typography variant='h5' align='center'>
                Price: {product.price}$
              </Typography>
            </Box>
          </Box>

          <Box mx={5}>

            <Typography variant='h4'>
              {product.description}
            </Typography>

            <Box display='flex' justifyContent='center' mt={6}>
              <Button
                size='large'
                variant='contained'
                color='primary'
                onClick={() => onButtonClick(product._id)}>
                Add to cart
              </Button>
            </Box>

          </Box>
        </Box>
      }
      {isErrorShown && <ErrorSnackbar errorMessage={error} setIsErrorShown={setIsErrorShown} />}
      {isMessageShown && <SuccessSnackbar successMessage={successMessage} setIsMessageShown={setIsMessageShown} />}
    </Container>
  )

}


export default ProductInfo

