import {useState} from 'react'
import { useQuery } from "@apollo/client"

import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
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
import { useCallback } from "react";

const useStyles = makeStyles({
    boxTitle: {
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      },
      tagCard: {
        position: 'absolute',
        top: 0,
        left: 0,
        borderRadius: '20px 0 0 0',
        minWidth: '100px',
        minHeight: '18px'
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
  tagColor?: string
}

const ProjectAllTasksCard = ({propStatus, tagColor}: Props) => {
    const { data } = useQuery(GET_ALL_TASKS)
    const [openAddTask, setOpenAddTask] = useState(false);

    const toggleModal = useCallback(() => {
        setOpenAddTask(!openAddTask);
    }, [openAddTask]);

    const classes = useStyles()

    return (
        <>
        <Card sx={{overflowY: 'hidden', backgroundColor: '#ffffff00', boxShadow: 'none'}}>
            <CardContent sx={{ backgroundColor: '#0F4473', position: 'relative', borderRadius: '20px'}}>
                <Box className={classes.tagCard} sx={{backgroundColor: tagColor}} />
                <Box className={classes.boxTitle} >
                {'Task ' + propStatus &&
                (<Typography variant="h2" sx={{ fontSize: '28px', color: 'white', fontWeight: 'bold' }}>
                    {'Task ' + propStatus}
                </Typography>
                )}
                <MoreMenu options={['Ajouter une tâche']} onClick={toggleModal}/>
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
        <Modal
            hideBackdrop
            open={openAddTask}
            onClose={toggleModal}
            aria-labelledby="child-modal-title"
            aria-describedby="child-modal-description"
        >
            <Box sx={{
                backgroundColor: '#ffff',
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                border: '2px solid #000',            }}>
            <h2 id="child-modal-title">Text in a child modal</h2>
            <p id="child-modal-description">
                Lorem ipsum, dolor sit amet consectetur adipisicing elit.
            </p>
            <Button onClick={toggleModal}>Close Child Modal</Button>
            </Box>
        </Modal>
        </>
    )
}

export default ProjectAllTasksCard