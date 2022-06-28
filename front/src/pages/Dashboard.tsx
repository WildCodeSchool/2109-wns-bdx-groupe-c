import { Redirect } from 'react-router-dom'
import { useQuery } from '@apollo/client';
import { MY_PROFILE } from '../queries/user'

import Box from '@mui/material/Box'
import { makeStyles } from '@mui/styles'

import DashboardMyProjectsCard from '../components/molecules/DashboardMyProjectsCard'
import DashboardMyTasksCard from '../components/molecules/DashboardMyTasksCard'
import DashboardProjectsCard from '../components/molecules/DashboardProjectsCard';

const useStyles = makeStyles({
  mainContainer: {
    backgroundColor: '#061B2E',
    minHeight: '150vh',
    padding: '25px',
    margin: '64px 0 0',
    '@media screen and (max-width: 600px)': {
      margin: '54px 0 0',
    },
  },
})

const Dashboard = () => {
  const classes = useStyles()
  const { data } = useQuery(MY_PROFILE)

  return (
    <>
      <Box className={classes.mainContainer}>
          <DashboardMyTasksCard projectId={1} />
          <DashboardMyProjectsCard />
          <DashboardProjectsCard />
      </Box>
      {!data && (
          <Redirect to={{ pathname: "/" }} />
      )}
    </>
  )
}

export default Dashboard
