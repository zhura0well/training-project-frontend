import React from 'react'
import { Container, Typography, Grid, Box, Button } from '@material-ui/core'
import ProductCard from '../../components/product-card'
import { useSelector } from 'react-redux'

const Cart = () => {


  const items = useSelector(state => state.cart.addedItems)
  const totalPrice = useSelector(state => state.cart.totalPrice)

  return (
    <Container>
      {totalPrice ?
        <>
          <Grid spacing={10} container >

            {items.map((item, index) => {
              return (
                <Grid item key={index} >
                  <ProductCard item={item} inCart={true} />
                </Grid>
              )
            }
            )}
          </Grid>
          <Box mt={5} display='flex' justifyContent='space-between'>
            <Box mx={5}>
              <Button
                size='large'
                variant='contained'
                href='/'>
                Continue shopping
              </Button>
            </Box>

            <Box mx={5} display='flex' justifyContent='space-between' alignItems='center' >
              <Typography variant='h5' component='p' align='center' >
                Totalprice: {totalPrice}$
              </Typography>
              <Box ml={4}>
                <Button
                  size='large'
                  variant='contained'
                  color='primary'>
                  Checkout
                </Button>
              </Box>

            </Box>


          </Box>
        </>
        :
        <>
          <Typography variant='h3' component='p' align='center'>
            No items yet
          </Typography>
        </>
      }
    </Container>
  )
}

export default Cart
