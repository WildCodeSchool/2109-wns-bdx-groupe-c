import { Route, Router, Switch, useHistory } from 'react-router-dom'
import Home from '../pages/Home'

const Routes = () => {
  const history = useHistory()
  return (
    <Router history={history}>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
      </Switch>
    </Router>
  )
}
export default Routes
