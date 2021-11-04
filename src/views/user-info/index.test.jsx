import React from 'react'
import { render } from '@testing-library/react'
import UserInfo from '.'
import { Provider } from 'react-redux'
import store from '../../redux/store'
import { BrowserRouter } from 'react-router-dom'

describe('User Info tests', () => {

  it('Renders properly', () => {
    const { container } = render(
      <Provider store={store}>
        <BrowserRouter>
          <UserInfo />
        </BrowserRouter>
      </Provider>
    )

    expect(container.getElementsByClassName('spinner-container')).toHaveLength(1)
  })


})
