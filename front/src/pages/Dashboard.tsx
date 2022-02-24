import Box from '@mui/material/Box'
import { makeStyles } from '@mui/styles'

import DashboardMyProjectsCard from '../components/molecules/DashboardMyProjectsCard'
import DashboardMyTasksCard from '../components/molecules/DashboardMyTasksCard'

const useStyles = makeStyles({
  mainContainer: {
    backgroundColor: '#061B2E',
    margin: '0',
    minHeight: '100vh',
    padding: '25px',
  },
})

const Dashboard = () => {
  const classes = useStyles()

  return (
    <Box className={classes.mainContainer}>
        <DashboardMyTasksCard projectId={1} />
        <DashboardMyProjectsCard userId={3} />
    </Box>
  )
}

export default Dashboard
