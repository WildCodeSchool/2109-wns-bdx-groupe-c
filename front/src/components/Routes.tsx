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
  console.log('loading venant du profil', loading)
  console.log('DATA VENANT DU PROFILE', data)
  console.log('error venant du profil', error)

  const isAuthenticated = data && data.myProfile
  return (
    <Router history={history}>
      <Switch>
        {isAuthenticated && (
          <>
            <Route exact path="/">
              <Dashboard />
            </Route>
            <Redirect to={{ pathname: '/' }} />
            <Route exact path="/project/:id">
              <Project />
            </Route>
          </>
        )}
        {!isAuthenticated && (
          <>
            <Route exact path="/test" component={DragList} />
            <Route path="/login" component={Home} />
            {/* <Redirect to={{ pathname: '/login' }} /> */}
          </>
        )}
      </Switch>
    </Router>
  )
}
export default Routes
