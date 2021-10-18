import React, { useEffect, useState } from 'react'
import { Container, Grid } from '@material-ui/core'
import ProductCard from '../../components/product-card'
import { useSelector, useDispatch } from 'react-redux'
import { getData } from '../../requests'
import { setItems } from '../../redux/reducers/cartReducer'
import ErrorSnackbar from '../../components/error-snackbar'
import CustomCarousel from '../../components/custom-carousel'
import firstImage from '../../assets/slider-1.jpg'
import secondImage from '../../assets/slider-2.jpg'
import thirdImage from '../../assets/slider-3.jpg'

const Home = () => {

  const dispatch = useDispatch()

  const [error, setError] = useState('')
  const [isErrorShown, setIsErrorShown] = useState(false)


  useEffect(() => {
    getData('/api/products')
      .then(response => {
        dispatch(setItems({ items: response }))
      })
      .catch(e => {
        setError(e.statusText)
        setIsErrorShown(true)
      })
  }, [])

  const items = useSelector(state => state.cart.items)
  const images = [firstImage, secondImage, thirdImage]

  return (
    <Container>
      <CustomCarousel items={images}/>
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
      {isErrorShown && <ErrorSnackbar errorMessage={error} setIsErrorShown={setIsErrorShown} />}
    </Container>
  )
}

export default Home

