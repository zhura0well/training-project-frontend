import React from 'react'
import { Box, AppBar, Toolbar, IconButton, Container } from '@material-ui/core'
import { Menu } from '@material-ui/icons'
import PropTypes from 'prop-types'
import { NavLink } from 'react-router-dom'
import './styles.scss'
const Header = ({ isAuthorized }) => {


  return (
    <header>
      <AppBar position='static' style={{ background: '#2E3B55'}}>
        <Container maxWidth='lg'>
          <Toolbar className='toolbar-container'>
            <Box width='35%'>
              <IconButton
                size='medium'
                edge='start'
                color='inherit'
                aria-label='menu'
                sx={{ mr: 2 }}
              >
                <Menu />
              </IconButton>
            </Box>
            <NavLink className='link' activeClassName='link-active' exact to='/'>
              Home
            </NavLink>
            <NavLink className='link' activeClassName='link-active' exact to='/user'>
              User
            </NavLink>
            <NavLink className='link' activeClassName='link-active' exact to='/#'>
              Sth else
            </NavLink>
            <NavLink className='link' activeClassName='link-active' exact to='/#'>
              Sth else
            </NavLink>
            <NavLink exact to='/login' className='link' activeClassName='link-active'> {!isAuthorized ? 'Login' : 'Logout'}</NavLink>
          </Toolbar>
        </Container>
      </AppBar>
    </header>)
}

Header.propTypes = { isAuthorized: PropTypes.string }

export default Header