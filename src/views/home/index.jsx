import React from 'react'
import { Container, Grid } from '@material-ui/core'
import ProductCard from '../../components/product-card'
import { useSelector } from 'react-redux'

const Home = () => {

  const items = useSelector(state => state.cart.items)
  return (
    <Container>
      <Grid spacing={10} container>

        {items.map((item, index) => {
          return (
            <Grid item key={index}>
              <ProductCard item={item} />
            </Grid>
          )
        }
        )}
      </Grid>
    </Container>
  )
}

export default Home

