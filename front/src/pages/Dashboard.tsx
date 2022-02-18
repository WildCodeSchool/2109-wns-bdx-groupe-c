import Box from '@mui/material/Box'
import { makeStyles } from '@mui/styles'
import TaskCard from '../components/TaskCard'

const useStyles = makeStyles({
  mainContainer: {
    backgroundColor: '#061B2E',
    height: '100vh',
    width: '100vw',
  },
})

const Dashboard = () => {
  const classes = useStyles()

  return (
    <Box className={classes.mainContainer}>
      <TaskCard />
    </Box>
  )
}

export default Dashboard
