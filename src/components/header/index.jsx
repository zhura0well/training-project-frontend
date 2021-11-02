import React from 'react'
import { Box, AppBar, Toolbar, IconButton, Container } from '@material-ui/core'
import { Menu, ShoppingCart } from '@material-ui/icons'
import PropTypes from 'prop-types'
import { NavLink} from 'react-router-dom'
import './styles.scss'
import { ROLE } from '../../clientConfig'
const Header = ({ roles }) => {

  const logout = async() => {
    localStorage.removeItem('roles')
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
            {roles && roles.includes(ROLE.MODER) &&
            <NavLink className='link' activeClassName='link-active' exact to='/add-item'>
              Add item
            </NavLink>}
            {roles && roles.includes(ROLE.ADMIN) &&
              <NavLink className='link' activeClassName='link-active' exact to='/admin/all-users'>
                Admin
              </NavLink>}

            {!roles ?
              <NavLink exact to='/login' className='link' activeClassName='link-active'>
                Login
              </NavLink> :
              <a className='link' href='/' onClick={logout}>
                Logout
              </a>
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