import React from 'react'
import { Button, Typography, Card, CardActions, CardContent, CardMedia, Box } from '@material-ui/core'
import { PropTypes } from 'prop-types'
import './styles.scss'
import { useDispatch } from 'react-redux'
import { addToCart } from '../../redux/reducers/cartReducer'

const ProductCard = ({ item, inCart }) => {

  const dispatch = useDispatch()

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

        {inCart &&
          <Typography variant='h4' component='div'>
            Quantity: {item.quantity}
          </Typography>
        }
      </CardContent>
      {!inCart &&
        <CardActions className='card-actions-section'>
          <Button size='small'
            variant='contained'
            color='primary'>
            Learn more
          </Button>
          <Button size='small'
            variant='contained'
            color='primary'
            onClick={() => dispatch(addToCart({ id: item.id }))}>
            Add to cart
          </Button>
        </CardActions>}

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


