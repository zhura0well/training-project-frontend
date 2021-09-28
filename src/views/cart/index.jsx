import React from 'react'
import { Container, Typography, Box } from '@material-ui/core'
import ProductCard from '../../components/product-card'
import { useSelector } from 'react-redux'

const Cart = () => {

  const items = useSelector(state => state.cart.addedItems)
  const totalPrice = useSelector(state => state.cart.totalPrice)

  return (
    <Container>

      <Typography component='h1' variant='h5'>
        TEST catalog
      </Typography>

      <Box display='flex' justifyContent='space-between'>
        {items.map((item, index) => <ProductCard key={index} item={item} inCart={true} />)}
      </Box>

      <Typography variant='h5' component='p' align='center'>
        Totalprice: {totalPrice}$
      </Typography>


    </Container>
  )
}

export default Cart

