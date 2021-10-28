import React from 'react'
import ReactDOM from 'react-dom'
import './index.css'
import App from './App'
import { BrowserRouter as Router } from 'react-router-dom'

import { Provider } from 'react-redux'
import store from './store/store'
import { Workbox } from 'workbox-window'
import { manageSubscription } from 'thrutab'
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

  wb.addEventListener('waiting', () => {
    wb.messageSkipWaiting()
  })

  const localSign = crypto.randomBytes(10).toString('hex')

  wb.register()
    .then((reg) => {
      manageSubscription(localSign)
    })
    .catch((err) => console.error('Service Worker registration failed', err))
}

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
//reportWebVitals(console.log)
