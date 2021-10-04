import React from 'react'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import Router from './router'
import store from './redux/store'
import Header from './components/header'
import Footer from './components/footer'
import './App.scss'
import { PersistGate } from 'redux-persist/integration/react'
import { persistStore } from 'redux-persist'

let persistor = persistStore(store)

function App() {

  const isAuthorized = document.cookie.replace(/(?:(?:^|.*;\s*)isAuthorized\s*=\s*([^;]*).*$)|^.*$/, "$1")

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <BrowserRouter>
          <div className='app-wrapper'>
            <Header isAuthorized={isAuthorized} />
            <div className='app-content'>
              <Router />
            </div>
            <Footer />
          </div>
        </BrowserRouter>
      </PersistGate>
    </Provider>
  )
}

export default App
