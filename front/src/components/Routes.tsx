import { Route, Router, Switch, useHistory, Redirect } from 'react-router-dom'
import { CircularProgress } from '@mui/material'
import { useQuery } from "@apollo/client"

import Home from '../pages/Home'
import Dashboard from '../pages/Dashboard'
import ProjectDashboardTask from '../pages/ProjectDashboardTask'

import { MY_PROFILE } from '../queries/user'
import Tasks from '../pages/Tasks'
import Projects from '../pages/Projects'
import ProjectDashboardInfo from '../pages/ProjectDashboardInfo'
import ProjectDashboardUser from '../pages/ProjectDashboardUser'
import ProjectDashboardComment from '../pages/ProjectDashboardComment'
import ProjectDashboardSetting from '../pages/ProjectDashboardSetting'
import Registration from '../pages/Registration'
import Profil from '../pages/Profil'
import MenuAppBar from './molecules/all/Header'

const Routes = () => {
  const history = useHistory()

  const { loading, data } = useQuery(MY_PROFILE)

  const isAuthenticated = data && data.myProfile

  if (loading) {
    return <CircularProgress />
  }

  return (
    <Router history={history}>
      <Switch>
        {isAuthenticated && (
          <>
            <MenuAppBar />
            <Route path="/tasks">
              <Tasks />
            </Route>
            <Route path="/projects">
              <Projects />
            </Route>
            <Route path="/project/:id/tasks">
              <ProjectDashboardTask />
            </Route>
            <Route exact path="/project/:id/infos">
              <ProjectDashboardInfo />
            </Route>
            <Route exact path="/project/:id/users">
              <ProjectDashboardUser />
            </Route>
            <Route exact path="/project/:id/comments">
              <ProjectDashboardComment />
            </Route>
            <Route exact path="/project/:id/settings">
              <ProjectDashboardSetting />
            </Route>
            <Route exact path="/login">
              <Redirect to="/" />
            </Route>
            <Route exact path="/profil">
              <Profil />
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
            <Route exact path="/registration" component={Registration} />
          </>
        )}
      </Switch>
    </Router>
  )
}
export default Routes
