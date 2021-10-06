import React, { useState } from 'react'
import { Button, Typography, Card, CardActions, CardContent, CardMedia, Box, IconButton } from '@material-ui/core'
import { PropTypes } from 'prop-types'
import './styles.scss'
import { useDispatch } from 'react-redux'
import { subQuantity, addQuantity, addToCart } from '../../redux/reducers/cartReducer'
import { Add, Remove } from '@material-ui/icons'
import SuccessSnackbar from '../success-snackbar'
import imagePlaceholder from '../../assets/image-placeholder.jpg'
import { useHistory } from 'react-router-dom'
const ProductCard = ({ item, inCart }) => {

  const [successMessage, setSuccessMessage] = useState('')
  const [isMessageShown, setIsMessageShown] = useState(false)
  const history = useHistory()
  const dispatch = useDispatch()

  const onButtonClick = (_id) => {
    dispatch(addToCart({ _id: _id }))

    setSuccessMessage('Added to shopping cart)')
    setIsMessageShown(true)
  }

  return (
    <Card className='card-container'>
      <CardMedia
        component='img'
        image={item.image || imagePlaceholder}
        alt='card image'
      />
      <CardContent>
        <Box className='card-title-section'>
          <Typography variant='h5' component='p'>
            {item.title}
          </Typography>

          <Typography className='card-item-price' variant='h5' component='p'>
            {item.price}$
          </Typography>

        </Box>

        <Typography variant='body2'>
          {item.description}
        </Typography>
        <CardActions className='card-actions-section'>
          {inCart ?
            <>
              <IconButton
                size='medium'
                edge='start'
                color='inherit'
                sx={{ mr: 2 }}
                onClick={() => dispatch(addQuantity({ _id: item._id }))}
              >
                <Add />
              </IconButton>
              <Typography variant='h4' component='div'>
                Quantity: {item.quantity}
              </Typography>

              <IconButton
                size='medium'
                edge='start'
                color='inherit'
                sx={{ mr: 2 }}
                onClick={() => dispatch(subQuantity({ _id: item._id }))}>
                <Remove />
              </IconButton>
            </>

            :

            <>
              <Button size='small'
                variant='contained'
                color='primary'
                /*if role == moder*/
                onClick={() => history.replace(`/add-item/${item._id}`)}>
                Learn more
              </Button>
              <Button size='small'
                variant='contained'
                color='primary'
                onClick={() => onButtonClick(item._id)}>
                Add to cart
              </Button>
            </>
          }

        </CardActions>
      </CardContent>

      {isMessageShown && <SuccessSnackbar successMessage={successMessage} setIsMessageShown={setIsMessageShown} />}
    </Card>
  )
}


ProductCard.propTypes = {
  item: PropTypes.shape({
    _id: PropTypes.string,
    title: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    price: PropTypes.number,
    quantity: PropTypes.number
  }),
  inCart: PropTypes.bool
}
export default ProductCard


