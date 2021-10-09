import { useCallback, useEffect, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { CacheStoreModel, save } from '../../store/cache/cache'

const useCached = <T extends any>(
  cacheKey: string,
  fetcherFn: () => PromiseLike<T>,
) => {
  const cache = useSelector(
    (state: { cache: CacheStoreModel }) => state.cache[cacheKey],
  )
  const dispatch = useDispatch()

  useEffect(() => {
    console.log(JSON.stringify(cache))
  }, [cache])

  const reFetch = useCallback(async () => {
    dispatch(
      save({
        key: cacheKey,
        data: await fetcherFn(),
      }),
    )
  }, [cacheKey, dispatch, fetcherFn])

  useEffect(() => {
    if (!cache) {
      reFetch()
    }
  }, [reFetch])

  return {
    data: cache?.data,
    forceFetch: () => reFetch(),
  }
}

export default useCached
