import { DefaultMessageTypes, ThruTabTemplatedEventType } from '../types'
import { associate, remove } from './localstorageManager'
import {
  isRequestBasedMessage,
  isServiceMessage,
  isSyncBasedMessage,
} from './typeCheck'

export async function swTunnel<T = DefaultMessageTypes>(
  this: ServiceWorkerGlobalScope,
  event: ThruTabTemplatedEventType<T>,
) {
  //console.log('swTunnel', event.data, event)
  const data: ThruTabTemplatedEventType<T>['data'] = {
    ...event.data,
    from: (event.source as Client).id,
  }
  if ('broadcast' in data) {
    if (isServiceMessage(data.broadcast)) {
      console.log(
        'catched service message',
        data.broadcast.type,
        JSON.stringify(data.broadcast),
      )
      switch (data.broadcast.type) {
        case 'register':
          break
        case 'unregister':
          break
      }
    } else if (isRequestBasedMessage(data.broadcast)) {
      console.log('request based')
      const allClients = await this.clients.matchAll()
      for (const client of allClients) {
        if (!data.to || data.to === client.id) {
          client.postMessage({
            broadcast: data.broadcast,
            from: data.from,
            to: data.to,
          })
        }
      }
    } else if (isSyncBasedMessage(data.broadcast)) {
      console.log('sync based')
      const allClients = await this.clients.matchAll()
      for (const client of allClients) {
        client.postMessage({
          broadcast: data.broadcast,
          from: data.from,
          to: data.to,
        })
      }
    }
  }
}

export function getTypedSwTunnel<T = DefaultMessageTypes>() {
  return function (
    this: ServiceWorkerGlobalScope,
    ev: ThruTabTemplatedEventType<T>,
  ) {
    console.log('typedSwTunnel registered!')
    return swTunnel.bind(this)(ev)
  }
}

// ServiceWorkerGlobalScope.addEventListener<"message">(type: "message", listener: (this: ServiceWorkerGlobalScope, ev: ExtendableMessageEvent) => any, options?: boolean | AddEventListenerOptions | undefined):
