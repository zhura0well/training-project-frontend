import React, { useEffect, useState } from 'react'
import { Container, Grid } from '@material-ui/core'
import ProductCard from '../../components/product-card'
import { useSelector, useDispatch } from 'react-redux'
import { getData } from '../../requests'
import { setItems } from '../../redux/reducers/cartReducer'
import ErrorSnackbar from '../../components/error-snackbar'
import LoadingContainer from '../../components/loading-container'
import CustomCarousel from '../../components/custom-carousel'
import firstImage from '../../assets/slider-1.jpg'
import secondImage from '../../assets/slider-2.jpg'
import thirdImage from '../../assets/slider-3.jpg'

const Home = () => {

  const dispatch = useDispatch()

  const [error, setError] = useState('')
  const [isErrorShown, setIsErrorShown] = useState(false)

  const [loading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    getData('/api/products')
      .then(response => {
        dispatch(setItems({ items: response }))
      })
      .catch(e => {
        setError(e.statusText)
        setIsErrorShown(true)
      })
      .finally(() => setTimeout(() => setLoading(false), 1000))
  }, [])

  const items = useSelector(state => state.cart.items)
  const images = [firstImage, secondImage, thirdImage]

  return (
    <Container>
      <LoadingContainer loading={loading}>
        <CustomCarousel items={images} />
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
      </LoadingContainer>

      {isErrorShown && <ErrorSnackbar errorMessage={error} setIsErrorShown={setIsErrorShown} />}
    </Container>
  )
}

export default Home

