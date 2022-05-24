import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import React from 'react'
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";


import { Draggable } from 'react-beautiful-dnd'
import Box from '@mui/material/Box'
import {makeStyles} from "@mui/styles"


import { Task } from "../../entities/task"

interface ItemProps {
  task: Task
  index: number
}

const useStyles = makeStyles({
  taskPaper: {
    maxWidth: '100%',
    minHeight: '70px',
    padding: '0',
    margin: '10px 0',
  },
  cardContainer: {
    display: 'flex',
  },
  title: {
    fontWeight: 'bold',
  },
})

const TaskCard: React.FC<ItemProps> = ({ task, index }) => {
  const classes = useStyles()
  const {shortText, subject} = task
  return (
    <Draggable draggableId={shortText} index={index} >
      {provided => (
          <Paper
            className={classes.taskPaper}
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <Box padding="15px" className={classes.cardContainer}>
              <Box>
                <Typography className={classes.title}>{ subject }</Typography>
                <Typography>{ shortText }</Typography>
              </Box>
              <Box>
                <FontAwesomeIcon
                    icon={faPencil}
                    onClick={() => console.log('test')}
                    color="#00bcd4"
                  />
                <FontAwesomeIcon
                    icon={faTrash}
                    onClick={() => console.log('test')}
                    color="#00bcd4"
                />
              </Box>
            </Box>
          </Paper>
      )}
    </Draggable>
  )
}

export default TaskCard