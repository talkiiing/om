import { Route, Switch, useRouteMatch, Link } from 'react-router-dom'
import DatasetMaster from '../../components/DatasetMaster/DatasetMaster'

const Pipelines = () => {
  let { path, url } = useRouteMatch()
  return (
    <Switch>
      <Route exact path={path}>
        <h3>
          <Link to={`${url}/add`}>Add</Link>
        </h3>
      </Route>
      <Route path={`${path}/add`}>
        <div className='w-full h-full flex items-center justify-center'>
          <DatasetMaster />
        </div>
      </Route>
    </Switch>
  )
}

export default Pipelines
