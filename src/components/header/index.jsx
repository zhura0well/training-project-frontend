import React from 'react'
import { Box, AppBar, Toolbar, IconButton, Container } from '@material-ui/core'
import { Menu, ShoppingCart } from '@material-ui/icons'
import PropTypes from 'prop-types'
import { NavLink, Link, useHistory } from 'react-router-dom'
import './styles.scss'
import { putData } from '../../requests'
import { useSelector } from 'react-redux'
import { ROLE } from '../../clientConfig'

const Header = ({ roles }) => {

  const items = useSelector(state => state.cart.addedItems)
  const totalPrice = useSelector(state => state.cart.totalPrice)
  const history = useHistory()
  const logout = () => {
    const userId = localStorage.getItem('userId')
    localStorage.clear()

    putData(`/api/shoppingCart/${userId}`, {
      cart: {
        items,
        totalPrice
      }
    })
      .then(() => history.push('/'))
      .finally(() => window.location.reload())
  }

  return (
    <header>
      <AppBar position='static' style={{ background: '#2E3B55' }}>
        <Container maxWidth='lg'>
          <Toolbar className='toolbar-container'>
            <Box width='35%'>
              <IconButton
                size='medium'
                edge='start'
                color='inherit'
                sx={{ mr: 2 }}
              >
                <Menu />
              </IconButton>
            </Box>
            <NavLink className='link' activeClassName='link-active' exact to='/'>
              Home
            </NavLink>
            <NavLink className='link' activeClassName='link-active' exact to='/about'>
              About us?
            </NavLink>
            {roles.includes(ROLE.MODER) &&
              <NavLink className='link' activeClassName='link-active' exact to='/add-item'>
                Add item
              </NavLink>}

            {roles.includes(ROLE.ADMIN) &&
              <Link className='link' activeClassName='link-active' exact to='/admin/all-users'>
                Admin
              </Link>}

            {!roles ?
              <NavLink exact to='/login' className='link' activeClassName='link-active'>
                Login
              </NavLink> :
              <Link className='link'  onClick={logout}>
                Logout
              </Link>
            }

            <NavLink exact to='/cart' className='link' activeClassName='link-active'>
              <IconButton
                size='medium'
                edge='start'
                color='inherit'
                sx={{ mr: 2 }}
              >
                <ShoppingCart />
              </IconButton>
            </NavLink>

          </Toolbar>
        </Container>
      </AppBar>
    </header>)
}

Header.propTypes = { roles: PropTypes.string }

export default Header