import { useQuery } from '@apollo/client'

import { makeStyles } from '@mui/styles'
import { Box, Paper, Typography, Theme, Card, CardContent,CardActionArea, CircularProgress } from '@mui/material'

import MoreMenu from '../atoms/MoreMenu'
import { GET_TASKS_BY_STATUS_MORE } from '../../queries/task'
import { Task } from '../../entities/task'

const useStyles = makeStyles((theme: Theme) => ({
  cardTasksContainer: {
    display: 'inline-flex',
    height: 'fit-content',
  },
  card: {
    minWidth: '320px',
    maxWidth: '400px',
    marginRight: '2rem',
    backgroundColor: '#7273FF',
    borderRadius: '14px',
  },
  cardContent: {
    position: 'relative',
    backgroundColor: '#0F4473',
  },
  cardPaper: {
    minHeight: '100px',
    margin: '10px 0',
    borderRadius: '14px',
    padding: '1rem',
    boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
  },
  cardTasksList: {
    maxHeight: '800px',
    paddingRight: '1rem',
    overflowY: 'scroll',
    '&::-webkit-scrollbar': {
      width: '9px',
    },
    '&::-webkit-scrollbar-track': {
      background: '#f1f1f1',
      borderRadius: '14px'
    },
    '&::-webkit-scrollbar-thumb': {
      background: '#061B2E',
      borderRadius: '14px'
    },
    '&::-webkit-scrollbar-thumb:hover': {
      background: '#555'
    },
  },
  taskPaper: {
    borderRadius: '14px',
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
    marginBottom: '1rem',
    fontWeight: 'bold',
  },
  boxTitle: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: '1rem',
  },
  cardTitle: {
    fontSize: '28px',
    color: 'white',
    fontWeight: 'bold'
  },
  description: {
    marginBottom: '1rem',
  },
}))

interface Props {
  statusName: string,
  color: string,
}

const DashboardMyTasksCard = ({ statusName, color }: Props) => {

  const classes = useStyles();

  const { loading, data } = useQuery(GET_TASKS_BY_STATUS_MORE, { variables: { statusName, color } })

  return (
    <Box className={classes.cardTasksContainer}>
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
        <Box className={classes.tagCard} sx={{ backgroundColor: color}} />
          <Box className={classes.boxTitle}>
            <Typography variant="h2"  className={classes.cardTitle}>Tasks : {statusName}</Typography>
            <MoreMenu options={['See all tasks']} onClick={()=>console.log('click')}/>
          </Box>
          <Box className={classes.cardTasksList}>
            {loading && (
              <CircularProgress />
            )}
            {data?.tasksByStatus.map((task: Task) => {
              let createdAt = new Date(task.createdAt);
              let inscriptionDate = createdAt.toLocaleDateString();
              return (
                <Paper key={task.id} className={classes.taskPaper}>
                  <CardActionArea className={classes.cardPaper}>
                    <Box>
                      <Typography variant="h4" className={classes.taskCardName}>{task.subject}</Typography>
                      <Typography className={classes.description}>{task.description}</Typography>
                      <Typography>{inscriptionDate}</Typography>
                    </Box>
                  </CardActionArea>
                </Paper>
              )
            })}
          </Box>
        </CardContent>
      </Card>
    </Box>
  )
}

export default DashboardMyTasksCard
