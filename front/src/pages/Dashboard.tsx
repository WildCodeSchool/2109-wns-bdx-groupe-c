import { Redirect } from 'react-router-dom'
import { useQuery } from '@apollo/client';
import { MY_PROFILE } from '../queries/user'

import Box from '@mui/material/Box'
import { makeStyles } from '@mui/styles'

import DashboardMyTasksCard from '../components/molecules/DashboardMyTasksCard'
import DashboardProjectsCard from '../components/molecules/DashboardProjectsCard';

const useStyles = makeStyles({
  mainContainer: {
    backgroundColor: '#061B2E',
    minHeight: '100vh',
    padding: '25px',
    margin: '64px 0 0',
    '@media screen and (max-width: 600px)': {
      margin: '54px 0 0',
    },
  },
  tasksContainer: {
    display: 'inline-flex',
    width: '100%',
    '@media screen and (max-width: 1200px)': {
      paddingBottom: '1rem',
      overflowX: 'scroll',
      '&::-webkit-scrollbar': {
        width: '9px',
      },
      '&::-webkit-scrollbar-track': {
        background: '#f1f1f1',
        borderRadius: '14px'
      },
      '&::-webkit-scrollbar-thumb': {
        background: '#0F4473',
        borderRadius: '14px'
      },
      '&::-webkit-scrollbar-thumb:hover': {
        background: '#555'
      },
    },
  },
})

const Dashboard = () => {
  const classes = useStyles()
  const { data } = useQuery(MY_PROFILE)

  return (
    <>
      <Box className={classes.mainContainer}>
          <Box className={classes.tasksContainer}>
            <DashboardMyTasksCard statusName={'To Do'} color={'#A5A6F6'} />
            <DashboardMyTasksCard statusName={'In Progress'} color={'#E9FF63'} />
            <DashboardMyTasksCard statusName={'Code Review'} color={'#10CEC3'} />
          </Box>
          <DashboardProjectsCard />
      </Box>
      {!data && (
          <Redirect to={{ pathname: "/" }} />
      )}
    </>
  )
}

export default Dashboard
