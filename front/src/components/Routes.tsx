import { Route, Router, Switch, useHistory } from 'react-router-dom'
import Home from '../pages/Home'
import Dashboard from '../pages/Dashboard'
import Project from '../pages/Project'

const Routes = () => {
  const history = useHistory()
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route exact path="/login">
          <Home />
        </Route>
        <Route exact path="/dashboard">
          <Dashboard />
        </Route>
        <Route exact path="/project">
          <Project />
        </Route>
      </Switch>
    </Router>
  )
}
export default Routes
