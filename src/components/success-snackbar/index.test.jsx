import React from 'react'
import { render, screen } from '@testing-library/react'
import SuccessSnackbar from '.'

describe('Succes snackbar tests', () => {


  it('Renders without text prop', () => {
    render(<SuccessSnackbar />)

    expect(screen.getByRole('alert')).toBeInTheDocument()
  })

  it('Renders with text prop', () => {
    render(<SuccessSnackbar successMessage={'Testing'} />)

    expect(screen.getByText(/testing/i)).toBeInTheDocument()
  })
})