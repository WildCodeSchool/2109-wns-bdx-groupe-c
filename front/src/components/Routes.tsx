import { Route, Router, Switch, useHistory, Redirect } from 'react-router-dom'

import { useQuery } from "@apollo/client"
import { MY_PROFILE } from '../queries/user'

import Home from '../pages/Home'
import Dashboard from '../pages/Dashboard'
import Project from '../pages/Project'
import DragList from './DragNDrop/DragList'

const Routes = () => {
  const history = useHistory()

  const { loading, data, error } = useQuery(MY_PROFILE)

  const isAuthenticated = data && data.myProfile
  return (
    <Router history={history}>
      <Switch>
        {isAuthenticated && (
          <>
            <Route exact path="/test">
              <DragList />
            </Route>
            <Route exact path="/project/:id">
              <Project />
            </Route>
            <Route exact path="/">
              <Dashboard />
            </Route>
            <Redirect to={{ pathname: '/' }} />
          </>
        )}
        {!isAuthenticated && (
          <>
            <Route path="/login" component={Home} />
            <Redirect to={{ pathname: '/login' }} />
          </>
        )}
      </Switch>
    </Router>
  )
}
export default Routes
