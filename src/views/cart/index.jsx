import React, { useState } from 'react'
import { Container, Typography, Grid, Box, Button } from '@material-ui/core'
import ProductCard from '../../components/product-card'
import { useSelector } from 'react-redux'
import OrderModal from '../../components/order-modal'
const Cart = () => {

  const [orderData, setOrderData] = useState({
    email: '',
    phone: '',
    cart: {
      items: [],
      totalPrice: 0
    }

  })

  const items = useSelector(state => state.cart.addedItems)
  const totalPrice = useSelector(state => state.cart.totalPrice)

  const [isModalOpen, setIsModalOpen] = useState(false)

  const placeOrder = () => {
    // setOrderData({ cart: { items, totalPrice } })
    setOrderData({
      cart: {
        items: items.map(item => ({ _id: item._id, quantity: item.quantity })),
        totalPrice
      }
    })
    setIsModalOpen(true)
  }
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
                  color='primary'
                  onClick={placeOrder}>
                  Checkout
                </Button>
              </Box>

            </Box>


          </Box>
          <OrderModal
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            orderData={orderData}
            setOrderData={setOrderData} />
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

