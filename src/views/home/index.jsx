import React from 'react'
import { Container, Typography, Box } from '@material-ui/core'
import ProductCard from '../../components/product-card'
import { useSelector } from 'react-redux'

const Home = () => {

  const items = useSelector(state => state.cart.items)
  return (
    <Container>

      <Typography component='h1' variant='h5'>
        TEST catalog
      </Typography>

      <Box display='flex' justifyContent='space-between'>
        {items.map((item, index) => <ProductCard key={index} item={item} />)}
      </Box>

    </Container>
  )
}

export default Home

