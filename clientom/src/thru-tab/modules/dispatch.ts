import { MessageModel, RegisterMessage } from '../types'
import { unregisterClient } from '../index'

const noWorkerError = () => new Error('No Service Worker controller available.')

export const dispatch = <T = any>(data: MessageModel<T>) => {
  if (navigator.serviceWorker && navigator.serviceWorker.controller) {
    navigator.serviceWorker.controller.postMessage(data)
  } else {
    throw noWorkerError()
  }
}

export const register = (sign: RegisterMessage) => {
  if (navigator.serviceWorker && navigator.serviceWorker.controller) {
    navigator.serviceWorker.controller.postMessage({
      broadcast: sign.broadcast,
    })
  } else {
    throw noWorkerError()
  }
}

export const unregister = () => {
  if (navigator.serviceWorker && navigator.serviceWorker.controller) {
    navigator.serviceWorker.controller.postMessage({
      broadcast: { type: 'unregister' },
    })
  } else {
    throw noWorkerError()
  }
}

export const cancelSubscriptionOnLeave = () => {
  window.addEventListener('beforeunload', (event) => {
    unregisterClient()
  })
}
