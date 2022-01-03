import { useEffect } from 'react'
import { AskHandlerFn, SyncHandlerFn } from '../core/types'
import { registerHandler, unregisterHandler } from '../core/resolvers'

export const useConnectorFn = (
  requestHandler: AskHandlerFn,
  syncHandler: SyncHandlerFn,
) => {
  useEffect(() => {
    const fnRef = registerHandler(requestHandler, syncHandler)
    return () => unregisterHandler(fnRef)
  }, [requestHandler, syncHandler])
}
