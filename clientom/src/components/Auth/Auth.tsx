import React, { useEffect } from 'react'
import { Route, Switch, useHistory, useRouteMatch } from 'react-router-dom'
import Up from './Up'
import In from './In'
import backly from '../../services/backly/backly'
import { buildRoute } from '../../routes/routes'

const Auth = () => {
  const history = useHistory()

  useEffect(() => {
    if (backly.auth.state) {
      history.replace(buildRoute([]))
    }
  }, [backly.auth.state])

  let match = useRouteMatch()

  return (
    <div className="flex flex-col space-y-4 mt-16">
      <Switch>
        <Route path={`${match.path}/in`}>
          <In />
        </Route>
        <Route path={`${match.path}/up`}>
          <Up />
        </Route>
        <Route path={`${match.path}/`}>
          <In />
        </Route>
      </Switch>
    </div>
  )
}

export default Auth
