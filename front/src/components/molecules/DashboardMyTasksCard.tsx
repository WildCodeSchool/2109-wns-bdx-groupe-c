import { useQuery } from '@apollo/client'

import { CircularProgress } from '@mui/material'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import CardContent from '@mui/material/CardContent'
import { makeStyles } from '@mui/styles'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'

import MoreMenu from '../atoms/MoreMenu'
import { GET_TASKS_BY_PROJECT } from '../../queries/task'
import { Task } from '../../entities/task'
import { Theme, useTheme } from '@mui/material/styles'

const useStyles = makeStyles((theme: Theme) => ({
  card: {
    maxWidth: '430px',
    backgroundColor: '#7273FF',
  },
  cardPaper: {
    maxWidth: '430px',
    minHeight: '100px',
    margin: '10px 0',
    borderRadius: '30px',
    padding: '1rem 1rem 1rem 2rem',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
  },
  taskPaper: {
    borderRadius: '30px',
  },
  tagCard: {
    position: 'absolute',
    top: 0,
    left: 0,
    borderRadius: '20px 0 0 0',
    minWidth: '100px',
    minHeight: '18px'
  },
  taskCardName: {
    fontSize: '17px !important',
  },
  boxTitle: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
}))

interface Props {
  projectId: number
}


const DashboardMyTasksCard = ({ projectId = 1 }: Props) => {
  const { loading, data, error } = useQuery(GET_TASKS_BY_PROJECT, { variables: { projectId } })

  const theme = useTheme();
  const classes = useStyles()


  const color = {
    "To Do" : theme.palette.secondary.purple,
    "In Progress" : theme.palette.secondary.yellow,
    "Code Review" : theme.palette.secondary.cyan,
    "Done" : theme.palette.secondary.green,
  }

  return (
    <Card className={classes.card} sx={{borderRadius: '20px'}}>
      <CardContent sx={{ backgroundColor: '#0F4473', position: 'relative'}}>
      <Box className={classes.tagCard} sx={{backgroundColor: color['To Do']}} />
        <Box className={classes.boxTitle}>
          <Typography variant="h2" sx={{ fontSize: '28px', color: 'white', fontWeight: 'bold' }}>
            Tasks &lt; To do
          </Typography>
          <MoreMenu options={['Ajouter une tâche']} onClick={()=>console.log('click')}/>
        </Box>
        {loading && (
            <CircularProgress />
        )}
        {data?.tasks.map((task: Task) => {
          return (
            <Paper key={task.id} className={classes.taskPaper}>
              <CardActionArea className={classes.cardPaper}>
                <Box>
                  <Typography variant="h4" fontWeight="bold" className={classes.taskCardName}>
                    {task.subject}
                  </Typography>
                  <Typography>{task.description}</Typography>
                  <Typography>{task.createdAt}</Typography>
                </Box>
              </CardActionArea>
            </Paper>
          )
        })}
      </CardContent>
    </Card>
  )
}

export default DashboardMyTasksCard
