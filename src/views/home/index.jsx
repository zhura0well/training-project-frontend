import React, { useEffect } from 'react'
import { Container, Grid } from '@material-ui/core'
import ProductCard from '../../components/product-card'
import { useSelector, useDispatch } from 'react-redux'
import { getData } from '../../requests'
import { setItems } from '../../redux/reducers/cartReducer'

const Home = () => {

  const dispatch = useDispatch()

  useEffect(() => {
    getData('/api/products')
      .then(response => {
        dispatch(setItems({ items: response }))
      })
      .catch(e => {
        console.log(e)
      })
  }, [])

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

