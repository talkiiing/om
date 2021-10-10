import { useCallback, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CacheStoreModel, save } from '../../store/cache/cache'

const useCached = <T = any>(
  cacheKey: string,
  fetcherFn: () => PromiseLike<T>,
) => {
  const cache = useSelector((state: { cache: CacheStoreModel }) => state.cache)
  const dispatch = useDispatch()

  const reFetch = useCallback(async () => {
    dispatch(
      save({
        key: cacheKey,
        data: await fetcherFn(),
      }),
    )
  }, [cacheKey, dispatch, fetcherFn])

  useEffect(() => {
    if (!cache[cacheKey]) {
      reFetch()
    }
  }, [cache, cacheKey, reFetch])

  return {
    data: cache[cacheKey]?.data as T,
    forceFetch: () => reFetch(),
  }
}

export default useCached
