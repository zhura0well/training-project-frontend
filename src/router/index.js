import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { ROLE } from '../clientConfig'

/*can't import from config.js
 relative imports outside of src/ are not supported*/

import Admin from '../views/admin'
import AllUsers from '../views/all-users'
import Home from '../views/home'
import Login from '../views/login'
import Moder from '../views/moder'
import UserInfo from '../views/user-info'

function Router() {
  const userRouts = [
    { path: '/user', component: <Home /> },
  ]

  const moderRouts = [
    { path: '/moder', component: <Moder /> },
  ]

  const adminRouts = [
    { path: '/admin', component: <Admin /> },
    { path: '/admin/all-users', component: <AllUsers />},
    { path: '/admin/user-info/:id', component: <UserInfo/>}
  ]

  const roles = document.cookie.replace(/(?:(?:^|.*;\s*)roles\s*=\s*([^;]*).*$)|^.*$/, "$1")
  const isAuthorized = document.cookie.replace(/(?:(?:^|.*;\s*)isAuthorized\s*=\s*([^;]*).*$)|^.*$/, "$1")

  return (
    <>
      <Route path='/login'>
        <Login isRegistered={true} />
      </Route>

      <Route path='/register'>
        <Login isRegistered={false} />
      </Route>
      <Route exact path='/'>
        {!isAuthorized ?
          <Redirect push to='/login' />
          : <Home />}
      </Route>
      {
        roles.includes(ROLE.USER) &&
        userRouts.map((route, index) => (
          <Route path={route.path} key={index}>
            {route.component}
          </Route>
        ))}

      {
        roles.includes(ROLE.MODER) &&
        moderRouts.map((route, index) => (
          <Route path={route.path} key={index}>
            {route.component}
          </Route>
        ))}

      {
        roles.includes(ROLE.ADMIN) &&
        adminRouts.map((route, index) => (
          <Route path={route.path} key={index}>
            {route.component}
          </Route>
        ))}

    </>
  )
}


export default Router