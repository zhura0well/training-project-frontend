import { render, screen } from '@testing-library/react'
import ErrorSnackbar from '.'


describe('Error snackbar tests', () => {


  it('Renders without text prop', () => {
    render(<ErrorSnackbar/>)

    expect(screen.getByRole('alert')).toBeInTheDocument()
    expect(screen.getByText(/wrong/i)).toBeInTheDocument()
  })

  it('Renders with text prop', () => {
    render(<ErrorSnackbar errorMessage={'Testing'}/>)

    expect(screen.getByText(/testing/i)).toBeInTheDocument()
  })
})
