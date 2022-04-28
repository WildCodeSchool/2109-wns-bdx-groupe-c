import { Route, Router, Switch, useHistory, Redirect } from 'react-router-dom'
import { CircularProgress } from '@mui/material'
import { useQuery } from "@apollo/client"

import Home from '../pages/Home'
import Dashboard from '../pages/Dashboard'
import Project from '../pages/Project'

import { MY_PROFILE } from '../queries/user'

const Routes = () => {
  const history = useHistory()

  const { loading, data, error } = useQuery(MY_PROFILE)

  const isAuthenticated = data && data.myProfile

  if (loading) {
    return <CircularProgress />
  }
  return (
    <Router history={history}>
      <Switch>
        {isAuthenticated && (
          <>
            <Route path="/project/:id">
              <Project />
            </Route>
            <Route exact path="/">
              <Dashboard />
            </Route>
          </>
        )}
        {!isAuthenticated && (
          <>
            <Redirect to={{ pathname: '/login' }} />
            <Route path="/login" component={Home} />
          </>
        )}
      </Switch>
    </Router>
  )
}
export default Routes
