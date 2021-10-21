import React, { useCallback, useEffect, useRef } from 'react'
import { Switch, Route, useHistory } from 'react-router-dom'
import './misc/router-animations.css'
import './misc/additional-animations.css'
import backly from './services/backly/backly'
import { buildRoute } from './routes/routes'
import {
  isNotificationsSupported,
  notificationService,
} from './services/notifications/notifications'

import Auth from './pages/Auth/Auth'
import Home from './pages/Home/Home'
import Datasets from './pages/Datasets/Datasets'
import Oms from './pages/Oms/Oms'
import Pipelines from './pages/Pipelines/Pipelines'

import { useSelector, useDispatch } from 'react-redux'
import {
  setOptions,
  SettingsModel,
  StorageKeySettings,
} from './store/settings/settings'
import WithNavigation from './components/WithNavigation/WithNavigation'
import AuthConfirm from './pages/AuthConfirm'
import {
  registerHandler,
  unregisterHandler,
} from './thru-tab/wrappers/registerHandler'
import { RequestHandlerFn } from './thru-tab/wrappers/wrapperTypes'
import { CacheStoreModel } from './store/cache/cache'
import { unregisterClient } from './thru-tab'

const App = () => {
  const history = useHistory()
  const appRootRef = useRef<HTMLDivElement>(null)
  const transitionRoot = useRef<HTMLDivElement>(null)

  const settings = useSelector(
    (state: { settings: SettingsModel }) => state.settings,
  )
  const cache = useSelector((state: { cache: CacheStoreModel }) => state.cache)
  const dispatch = useDispatch()

  const reAuth = () => {
    backly.auth.reAuth(
      () => {
        console.log('Session continued succesfully')
      },
      () => {
        history.push(buildRoute(['auth']))
      },
    )
  }
  useEffect(() => {
    console.log(settings)
  }, [settings])

  const handleRequests: RequestHandlerFn = useCallback(
    (data, reply, reject) => {
      console.log('Got to handle', data)
      if (data && Object(cache).hasOwnProperty(data.requestKey)) {
        console.log('request is going to be fulfilled')
        reply(cache[data.requestKey].data)
      } else {
        reject()
      }
    },
    [cache],
  )

  useEffect(() => {
    const fnRef = registerHandler(handleRequests)
    return () => unregisterHandler(fnRef)
  }, [handleRequests])

  useEffect(() => {
    if (settings.options.colorScheme === 'dark') {
      document.getElementById('body')?.classList.add('dark')
    } else {
      document.getElementById('body')?.classList.remove('dark')
    }
  }, [settings.options.colorScheme])

  useEffect(() => {
    //navigator.onLine ? reAuth() : document.addEventListener('online', reAuth)

    const storedSettings = localStorage.getItem(StorageKeySettings)
    if (storedSettings)
      dispatch(
        setOptions((JSON.parse(storedSettings) as SettingsModel).options),
      )

    isNotificationsSupported() &&
      notificationService.send(
        'Привет! Это уведомление от React PWA template, который сделан командой /talkiiing"',
      )

    return () => document.removeEventListener('online', reAuth)
  }, [])

  return (
    <div className='w-screen scroll-root' ref={appRootRef}>
      <WithNavigation>
        <Route
          render={({ location }) => (
            <div className='w-full' ref={transitionRoot}>
              <div className='h-route-full'>
                {' '}
                {/* previous className="p-6 container max-w-3xl"*/}
                <Switch location={location}>
                  <Route path={buildRoute(['auth'])}>
                    <Auth />
                  </Route>
                  <Route path={buildRoute(['datasets'])}>
                    <Datasets />
                  </Route>
                  <Route path={buildRoute(['oms'])}>
                    <Oms />
                  </Route>
                  <Route path={buildRoute(['pipelines'])}>
                    <Pipelines />
                  </Route>
                  <Route path={buildRoute(['authConfirm'])}>
                    <AuthConfirm />
                  </Route>

                  <Route path={buildRoute([])}>
                    <Home />
                  </Route>
                </Switch>
              </div>
            </div>
          )}
        />
      </WithNavigation>
    </div>
  )
}

export default App
