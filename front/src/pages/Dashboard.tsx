import Box from '@mui/material/Box'
import { makeStyles } from '@mui/styles'
import ProjectCard from '../components/molecules/ProjectCard'
import TaskCard from '../components/molecules/TaskCard'



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
        <TaskCard projectId={1} />
        <ProjectCard userId={3} />
    </Box>
  )
}

export default Dashboard
