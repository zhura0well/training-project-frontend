import React from 'react'
import { Route, Switch } from 'react-router-dom'
import { ROLE } from '../clientConfig'

/*can't import from config.js
 relative imports outside of src/ are not supported*/

import Admin from '../views/admin'
import AllUsers from '../views/all-users'
import Cart from '../views/cart'
import Home from '../views/home'
import Login from '../views/login'
import Moder from '../views/moder'
import NotFoundPage from '../views/not-found-page'
import UserInfo from '../views/user-info'
import AddItem from '../views/add-item'

function Router() {

  const userRouts = [
    { path: '/user', component: <Home /> },
  ]

  const moderRouts = [
    { path: '/moder', component: <Moder /> },
    {path: '/add-item', component: <AddItem />}
  ]

  const adminRouts = [
    { path: '/admin', component: <Admin /> },
    { path: '/admin/all-users', component: <AllUsers /> },
    { path: '/admin/user-info/:id', component: <UserInfo /> }
  ]

  const roles = localStorage.getItem('roles') || ''

  return (
    <Switch>
      <Route path='/login'>
        <Login isRegistered={true} />
      </Route>

      <Route path='/register'>
        <Login isRegistered={false} />
      </Route>
      <Route path='/cart'>
        <Cart />
      </Route>
      <Route exact path='/'>

        <Home />
      </Route>
      {
        roles.includes(ROLE.USER) &&
        userRouts.map((route, index) => (
          <Route exact path={route.path} key={index}>
            {route.component}
          </Route>
        ))}

      {
        roles.includes(ROLE.MODER) &&
        moderRouts.map((route, index) => (
          <Route exact path={route.path} key={index}>
            {route.component}
          </Route>
        ))}

      {
        roles.includes(ROLE.ADMIN) &&
        adminRouts.map((route, index) => (
          <Route exact path={route.path} key={index}>
            {route.component}
          </Route>
        ))}

      <Route>
        <NotFoundPage />
      </Route>

    </Switch>
  )
}


export default Router