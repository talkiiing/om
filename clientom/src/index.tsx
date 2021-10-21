import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'

import { Provider } from 'react-redux'
import store from './store/store'
import * as localforage from 'localforage'
import { Workbox } from 'workbox-window'
import { cancelSubscriptionOnLeave, registerClient } from './thru-tab'
import { RegisterMessage } from './thru-tab/types'
import crypto from 'crypto'

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA

if ('serviceWorker' in navigator) {
  const wb = new Workbox('/service-worker.js')

  const localSign = crypto.randomBytes(10).toString('hex')

  wb.addEventListener('waiting', () => {
    wb.messageSkipWaiting()
  })

  wb.register()
    .then((reg) => {
      // eslint-disable-next-line
      registerClient({
        broadcast: { sign: localSign, type: 'register' },
      })
      console.info('Successful service worker registration', reg)
      cancelSubscriptionOnLeave()
    })
    .catch((err) => console.error('Service worker registration failed', err))
}

console.log('Registering SW')

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals(console.log)
