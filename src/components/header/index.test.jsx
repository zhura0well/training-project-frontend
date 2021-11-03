import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Header from '.'
import { ROLE } from '../../clientConfig'


describe('Header tests', () => {


  it('Renders correct text for admin', () => {
    render(
      <BrowserRouter>
        <Header roles={ROLE.ADMIN} />
      </BrowserRouter>
    )

    expect(screen.getByText(/admin/i)).toBeInTheDocument()
    expect(screen.getByText(/logout/i)).toBeInTheDocument()
  })

  it('Renders correct text for moder', () => {
    render(
      <BrowserRouter>
        <Header roles={ROLE.MODER} />
      </BrowserRouter>
    )

    expect(screen.getByText(/add/i)).toBeInTheDocument()
    expect(screen.getByText(/logout/i)).toBeInTheDocument()
  })

  it('Renders correct text for user', () => {
    render(
      <BrowserRouter>
        <Header roles={ROLE.USER} />
      </BrowserRouter>
    )

    expect(screen.getByText(/logout/i)).toBeInTheDocument()
  })

  it('Renders with empty string', () => {
    render(
      <BrowserRouter>
        <Header roles='' />
      </BrowserRouter>
    )

    expect(screen.getByText(/login/i)).toBeInTheDocument()
  })

  it('Tests logout function', () => {
    jest.spyOn(window.localStorage.__proto__, 'removeItem')
    window.localStorage.__proto__.removeItem = jest.fn()

    render(
      <BrowserRouter>
        <Header roles={ROLE.ADMIN} />
      </BrowserRouter>
    )
    fireEvent.click(screen.getByRole('link', { name: 'Logout' }))
    expect(window.localStorage.removeItem).toHaveBeenCalledTimes(1)

  })

})

