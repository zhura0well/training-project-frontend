import React from 'react'
import { render } from '@testing-library/react'
import Home from '.'
import { Provider } from 'react-redux'
import store from '../../redux/store'

describe('Home tests', () => {

  it('Renders properly', () => {
    const {container} = render(
      <Provider store={store}>
        <Home />
      </Provider>
    )

    expect(container.getElementsByClassName('spinner-container')).toHaveLength(1)
  })


})
