import { useQuery } from "@apollo/client"

import Box from "@mui/material/Box"
import Card from "@mui/material/Card"
import CardActionArea from "@mui/material/CardActionArea"
import CardContent from "@mui/material/CardContent"
import Paper from "@mui/material/Paper"
import Typography from "@mui/material/Typography"

import { makeStyles }  from "@mui/styles"

import MoreMenu from "../atoms/MoreMenu"

import { GET_ALL_TASKS } from "../../queries/task"
import { Task } from "../../entities/task"

const useStyles = makeStyles({
    boxTitle: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
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
})

interface Props {
  propStatus?: string
}

const ProjectAllTasksCard = ({propStatus}: Props) => {
    const { loading, data, error } = useQuery(GET_ALL_TASKS)

    const classes = useStyles()
    console.log('error', error)
    console.log('loading', loading)
    console.log('data', data)

    return (
        <Card sx={{overflowY: 'scroll', backgroundColor: '#ffffff00', boxShadow: 'none'}}>
            <CardContent sx={{ backgroundColor: '#0F4473', position: 'relative', borderRadius: '20px'}}>
                <Box className={classes.boxTitle}>
                {propStatus && 
                (<Typography variant="h2" sx={{ fontSize: '28px', color: 'white', fontWeight: 'bold' }}>
                    {propStatus}
                </Typography>
                )}
                <MoreMenu options={['Ajouter une tâche']}/>
                </Box>
            {data?.allTasks.filter((task: Task) => 
                task.status.name === propStatus
            ).map((task : Task) => {
                return (
                    <Paper key={task.id} className={classes.taskPaper}>
                        <CardActionArea sx={{ borderRadius: '5px' }}>
                            <Box padding="15px">
                                <Typography variant="h4" fontWeight="bold" className={classes.taskCardName}>
                                    {task.subject}
                                </Typography>
                                <Typography>{task.shortText}</Typography>
                            </Box>
                        </CardActionArea>
                    </Paper>
                )
            })}
            </CardContent>
        </Card>
    )
}

export default ProjectAllTasksCard