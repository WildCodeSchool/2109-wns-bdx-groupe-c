import { gql, useQuery } from '@apollo/client'

import Box from '@mui/material/Box'
import CardContent from '@mui/material/CardContent'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import Paper from '@mui/material/Paper'
import Typography from '@mui/material/Typography'
import { makeStyles } from '@mui/styles'

import MoreMenu from '../atoms/MoreMenu'

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
  menu: {
    position: 'absolute',
    right: '15px',
    top: '10px',
  },
})

const GET_TASKS = gql`
  query Query($projectId: Float!) {
    tasks(projectId: $projectId) {
      subject
      shortText
      description
      assignee {
        id
      }
      status {
        name
      }
      updatedAt
      createdAt
      dueDate
      comments {
        id
      }
    }
  }
`

interface Props {
  projectId: number
}

interface Task {
  subject: string
  description: string
  createdAt: Date
}

const TaskCard = ({ projectId = 1 }: Props) => {
  const { loading, data, error } = useQuery(GET_TASKS, { variables: { projectId } })

  const classes = useStyles()
  console.log('error', error)
  console.log('loading', loading)
  console.log('data', data)
  return (
    <Card className={classes.card}>
      <CardContent sx={{ backgroundColor: '#7273FF', position: 'relative' }}>
        <MoreMenu options={['Ajouter une tâche']} className={classes.menu} />
        <Typography variant="h2" sx={{ fontSize: '28px' }}>
          Tasks &lt; To do
        </Typography>
        {data?.tasks.map((task: Task) => {
          return (
            <Paper className={classes.taskPaper}>
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

export default TaskCard
