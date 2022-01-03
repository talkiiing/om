import { useCallback } from 'react'
import { request } from '../core/dataExchange'
import { sync } from '../core/syncer'

export const useSharedData = () => {
  const requestData = useCallback(
    (key: string, timeout?: number) =>
      request({
        key: key,
        timeout: timeout,
      }),
    [],
  )

  const syncData = useCallback(
    <T = any>(key: string, data: T) => sync(key, data),
    [],
  )

  return {
    requestData,
    syncData,
  }
}
