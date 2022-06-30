import React, {useMemo} from 'react'
import { Droppable } from 'react-beautiful-dnd'
import makeStyles from "@mui/styles/makeStyles";
import Card from "@mui/material/Card";

import TaskCard from './TaskCard'
import Box from '@mui/material/Box'

import { Task } from "../../entities/task"
import { statusColors } from '../../constants';


const useStyles = makeStyles({
  cardTitle: {
      height: 'fit-content',
      minHeight: '150px',
      maxHeight: '800px',
      width: '350px',
      backgroundColor: '#0F4473',
      marginTop: '25px',
      marginRight: '2rem',
  },
  tagCard: {
    position: 'relative',
    top: 0,
    left: 0,
    borderRadius: '20px 0 0 0',
    minWidth: '100px',
    minHeight: '18px',
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
  }
})

interface StatusColumnProps {
  column: {
    id: string,
    name: 'To Do' | 'In Progress' | 'Code Review' | 'Done',
    tasks: Task[],
  },
}


/*
Le composant colonne est un élément "Dropable" qui est doit être wrappé dans un <DragDropContext>
On doit fournir au Dropable :
- {provided}
- {provided.innerRef}
à la <div> retourné  ainsi que le {provided.placeholder}
*/

const StatusColumn: React.FC<StatusColumnProps> =  ({ column: {id, name, tasks}}) => {

  const colorStatus = useMemo(() => statusColors[name], [name]);
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
          <Box className={classes.tagCard} sx={{backgroundColor: colorStatus}} />
          <h2 className={classes.title}>{name}</h2>
          <Box
            className={classes.cardContent}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {tasks.map((task, index) => (
              <TaskCard key={task.id} task={task} index={index} />
            ))}
            {provided.placeholder}
          </Box>
        </Card>
      )}
    </Droppable>
  )
}

export default StatusColumn
