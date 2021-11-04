import React from 'react'
import { render } from '@testing-library/react'
import AllUsers from '.'
import { Provider } from 'react-redux'
import store from '../../redux/store'

describe('All users tests', () => {

  it('Renders properly', () => {
    const {container} = render(
      <Provider store={store}>
        <AllUsers />
      </Provider>
    )

    expect(container.getElementsByClassName('spinner-container')).toHaveLength(1)
  })


})
