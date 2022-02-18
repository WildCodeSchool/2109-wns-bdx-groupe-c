import { Route, Router, Switch, useHistory } from 'react-router-dom'
import Dashboard from '../pages/Dashboard'
import Home from '../pages/Home'

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
      </Switch>
    </Router>
  )
}
export default Routes
