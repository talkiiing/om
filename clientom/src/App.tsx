import React, { useEffect, useRef } from 'react'
import { Switch, Route, useHistory } from 'react-router-dom'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import './misc/router-animations.css'
import './misc/additional-animations.css'
import backly from './services/backly/backly'
import Auth from './components/Auth/Auth'
import Home from './components/Home/Home'
import { buildRoute } from './routes/routes'
import RequesterPage from './components/RequesterPage/RequesterPage'
import {
  isNotificationsSupported,
  notificationService,
} from './services/notifications/notifications'
import Settings from './components/Settings/Settings'

import { useSelector, useDispatch } from 'react-redux'
import {
  setOptions,
  SettingsModel,
  StorageKeySettings,
} from './store/settings/settings'
import WithNavigation from './components/WithNavigation/WithNavigation'

const App = () => {
  const history = useHistory()
  const appRootRef = useRef<HTMLDivElement>(null)
  const transitionRoot = useRef<HTMLDivElement>(null)

  const settings = useSelector(
    (state: { settings: SettingsModel }) => state.settings,
  )
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
            <TransitionGroup>
              <CSSTransition
                key={location.pathname}
                classNames={settings.options.animationType || 'none'}
                timeout={settings.options.animationType === 'none' ? 0 : 601}
                //nodeRef={transitionRoot}
              >
                <div className='w-full h-full' ref={transitionRoot}>
                  <div className='p-6'>  {/* previous className="p-6 container max-w-3xl"*/}
                    <Switch location={location}>
                      <Route path={buildRoute(['auth'])}>
                        <Auth />
                      </Route>
                      <Route path={buildRoute(['requester'])}>
                        <RequesterPage />
                      </Route>
                      <Route path={buildRoute(['settings'])}>
                        <Settings />
                      </Route>
                      <Route path={buildRoute([])}>
                        <Home />
                      </Route>
                    </Switch>
                  </div>
                </div>
              </CSSTransition>
            </TransitionGroup>
          )}
        />
      </WithNavigation>
    </div>
  )
}

export default App
