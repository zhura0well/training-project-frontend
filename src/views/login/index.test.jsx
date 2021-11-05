import React from 'react'
import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import Login from '.'
import { BrowserRouter } from 'react-router-dom'
import userEvent from '@testing-library/user-event'

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

  it('Tests inputs and setStates func', () => {
    const checkInput = (testId, expectedValue, initialValue) => {
      const input = screen.getByTestId(testId)
      expect(input.value).toBe(initialValue)
      userEvent.type(input, expectedValue)
      expect(input.value).toBe(expectedValue)
      expect(screen.getByDisplayValue(expectedValue)).toBeInTheDocument()
    }

    render(
      <BrowserRouter>
        <Login />
      </BrowserRouter>
    )

    checkInput('username', 'username', '')
    checkInput('password', 'password', '')

  })

  it('Tests login func', async () => {

    const {container} = render(
      <BrowserRouter>
        <Login isRegistered={true}/>
      </BrowserRouter>
    )

    userEvent.type(screen.getByTestId('username'), 'user1')
    userEvent.type(screen.getByTestId('password'), 'userpass1')
    fireEvent.click(screen.getByRole('button', {name: 'Sign in'}))

    expect(container.getElementsByClassName('spinner-container')).toHaveLength(1)

    const usernameElem = await waitFor(() => screen.findByTestId('username'), {
      timeout: 2000
    })

    expect(usernameElem.value).toBe('')
  })

})
