import React from 'react'

import { Draggable } from 'react-beautiful-dnd'
import Box from '@mui/material/Box'
import {makeStyles} from "@mui/styles"

interface TaskTest {
  shortText: string
  subject: string
}

interface ItemProps {
  task: TaskTest
  index: number
}

const useStyles = makeStyles({
  mainContainer: {
      backgroundColor: '#FF0000', //RED
      marginBottom: '10px',
  }
})

const TaskCard: React.FC<ItemProps> = ({ task, index }) => {
  const classes = useStyles()
  const {shortText, subject} = task
  return (
    <Draggable draggableId={shortText} index={index} >
      {provided => (
        <Box
          className={classes.mainContainer}
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
        >
          {shortText}
        </Box>
      )}
    </Draggable>
  )
}

export default TaskCard