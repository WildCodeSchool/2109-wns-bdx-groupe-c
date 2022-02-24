import { useQuery } from '@apollo/client'

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

const useStyles = makeStyles({
  card: {
    maxWidth: '500px',
    backgroundColor: '#7273FF',
  },
  taskPaper: {
    maxWidth: '430px',
    minHeight: '70px',
    padding: '0',
    margin: '10px 0',
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
})

interface Props {
  projectId: number
}


const DashboardMyTasksCard = ({ projectId = 1 }: Props) => {
  const { loading, data, error } = useQuery(GET_TASKS_BY_PROJECT, { variables: { projectId } })

  const classes = useStyles()
  console.log('error', error)
  console.log('loading', loading)
  console.log('data', data)
  return (
    <Card className={classes.card} sx={{borderRadius: '20px'}}>
      <CardContent sx={{ backgroundColor: '#0F4473', position: 'relative'}}>
        <Box className={classes.boxTitle}>
          <Typography variant="h2" sx={{ fontSize: '28px', color: 'white', fontWeight: 'bold' }}>
            Tasks &lt; To do
          </Typography>
          <MoreMenu options={['Ajouter une tâche']}/>
        </Box>
        {data?.tasks.map((task: Task) => {
          return (
            <Paper key={task.id} className={classes.taskPaper}>
              <CardActionArea sx={{ borderRadius: '5px' }}>
                <Box padding="15px">
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
