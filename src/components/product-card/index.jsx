import React, { useState } from 'react'
import { Button, Typography, Card, CardActions, CardContent, CardMedia, Box, IconButton } from '@material-ui/core'
import { PropTypes } from 'prop-types'
import './styles.scss'
import { useDispatch } from 'react-redux'
import { subQuantity, addQuantity, addToCart } from '../../redux/reducers/cartReducer'
import { Add, Remove } from '@material-ui/icons'
import SuccessSnackbar from '../success-snackbar'

const ProductCard = ({ item, inCart }) => {

  const [successMessage, setSuccessMessage] = useState('')
  const [isMessageShown, setIsMessageShown] = useState(false)

  const dispatch = useDispatch()

  const onButtonClick = (id) => {
    dispatch(addToCart({ id: id }))

    setSuccessMessage('Added to shopping cart)')
    setIsMessageShown(true)
  }

  return (
    <Card className='card-container'>
      <CardMedia
        component='img'
        image={item.image}
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
                onClick={() => dispatch(addQuantity({ id: item.id }))}
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
                onClick={() => dispatch(subQuantity({ id: item.id }))}>
                <Remove />
              </IconButton>
            </>

            :

            <>
              <Button size='small'
                variant='contained'
                color='primary'>
                Learn more
              </Button>
              <Button size='small'
                variant='contained'
                color='primary'
                onClick={() => onButtonClick(item.id)}>
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
    id: PropTypes.number,
    title: PropTypes.string,
    description: PropTypes.string,
    image: PropTypes.string,
    price: PropTypes.number,
    quantity: PropTypes.number
  }),
  inCart: PropTypes.bool
}
export default ProductCard


