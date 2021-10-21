import { RequestHandlerFn } from './wrapperTypes'
import {
  DataPromiseBusState,
  MessageModel,
  RequestBasedMessage,
  TunnelEvent,
} from '../types'
import { isRequestBasedMessage } from '../modules/typeCheck'
import { replyOnDataRequest, resolveDataRequest } from './requestData'

const getReplyFn =
  (
    to: MessageModel<any>['to'],
    requestId: RequestBasedMessage['requestId'],
    requestKey: RequestBasedMessage['requestKey'],
  ) =>
  (data: any) =>
    replyOnDataRequest(to, requestId, requestKey, data)

export const registerHandler = (fn: RequestHandlerFn) => {
  const builtFn = (event: MessageEvent<TunnelEvent<RequestBasedMessage>>) => {
    console.log('builtFn called')
    if (isRequestBasedMessage(event.data.broadcast)) {
      console.log('builtFn called for request')
      if (!event.data.broadcast.answer) {
        fn(
          event.data.broadcast,
          getReplyFn(
            event.data.to,
            event.data.broadcast.requestId,
            event.data.broadcast.requestKey,
          ),
          () => {},
        )
      } else {
        resolveDataRequest(
          event.data.broadcast.requestId,
          event.data.broadcast.answer,
        )
      }
    }
  }
  navigator.serviceWorker.addEventListener('message', builtFn)
  window.addEventListener('beforeunload', (event) => {
    navigator.serviceWorker.removeEventListener('message', builtFn)
  })
  console.log('handler registered')
  return builtFn
}

export const unregisterHandler = (builtFn: (event: MessageEvent) => void) => {
  navigator.serviceWorker.removeEventListener('message', builtFn)
  console.log('handler unregistered')
}
