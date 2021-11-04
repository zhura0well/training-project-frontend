import React from 'react'
import { render, screen } from '@testing-library/react'
import Login from '.'
import { BrowserRouter } from 'react-router-dom'

describe('Login tests', () => {

  it('Renders properly when user is registered', () => {
    render(
      <BrowserRouter>
        <Login isRegistered={true}/>
      </BrowserRouter>
    )

    expect(screen.getAllByText(/Sign in/i)).toHaveLength(2)
  })

  it('Renders properly when user isn`t registered', () => {
    render(
      <BrowserRouter>
        <Login isRegistered={false}/>
      </BrowserRouter>
    )

    expect(screen.getAllByText(/Sign up/i)).toHaveLength(2)
  })


})
