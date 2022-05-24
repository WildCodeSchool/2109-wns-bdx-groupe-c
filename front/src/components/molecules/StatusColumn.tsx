import React from 'react'
import { Droppable } from 'react-beautiful-dnd'
import makeStyles from "@mui/styles/makeStyles";
import Card from "@mui/material/Card";

import TaskCard from './TaskCard'
import Box from '@mui/material/Box'

import { Task } from "../../entities/task"

const useStyles = makeStyles({
  cardTitle: {
      minHeight: '275px',
      backgroundColor: '#0F4473',
      marginTop: '25px',
      height: 'auto',
      border: '1px solid white'
  },
  title: {
    fontSize: '1.5rem',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  cardContent: {
    backgroundColor: '#0F4473',
    display: 'flex',
    flexDirection: 'column',
    minHeight: '500px'
  }
})


interface ColumnProps {
  column: {
    id: string,
    name: string,
    tasks: Task[]
  }
}


/*
Le composant colonne est un élément "Dropable" qui est doit être wrappé dans un <DragDropContext>
On doit fournir au Dropable :
- {provided}
- {provided.innerRef}
à la <div> retourné  ainsi que le {provided.placeholder}
*/

const StatusColumn: React.FC<ColumnProps> =  ({ column: {id, name, tasks} }) => {
  const classes = useStyles()
  return (
    <Droppable droppableId={name}>
      {(provided) => (
        <Card
          className={classes.cardTitle}
          sx={{
          borderRadius: '20px'
          }}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <h2 className={classes.title}>{name}</h2>
          <Box
            className={classes.cardContent}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {tasks.map((task, index) => (
              <TaskCard key={task.shortText} task={task} index={index} />
            ))}
            {provided.placeholder}
          </Box>
        </Card>
      )}
    </Droppable>
  )
}

export default StatusColumn
