import React from 'react'
import { Droppable } from 'react-beautiful-dnd'
import TaskCard from './TaskCard'

import Box from '@mui/material/Box'

interface TaskTest {
    shortText: string
    subject: string
}

interface ColumnProps {
  column: {
    id: string,
    name: string,
    tasks: TaskTest[]
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
  return (
    <Droppable droppableId={name}>
      {(provided, snapshot) => (
        <Box
          style={{
            backgroundColor: "#D800E2", //PINK
            display: 'flex',
            flexDirection: 'column'
          }}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <h2>{name}</h2>
          <Box
            style={{
              backgroundColor: "#37E200", // Green
              display: 'flex',
              flexDirection: 'column',
              minHeight: '500px'
              //When using multiple columns, it's important to have a minimum height on the element that takes provided.droppableProps.
            }}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {tasks.map((task, index) => (
              <TaskCard key={task.shortText} task={task} index={index} />
            ))}
            {provided.placeholder}
          </Box>
        </Box>
      )}
    </Droppable>
  )
}

export default StatusColumn
