import React from 'react'
import { Droppable } from 'react-beautiful-dnd'
import Item from './Item'

interface ColumnProps {
  column: {
    id: string,
    list: string[]
  }
}


/*
Le composant colonne est un élément "Dropable" qui est doit être wrappé dans un <DragDropContext>
On doit fournir au Dropable :
- {provided}
- {provided.innerRef}
à la <div> retourné  ainsi que le {provided.placeholder}
*/

const Column: React.FC<ColumnProps> =  ({ column: {id, list} }) => {
  return (
    <Droppable droppableId={id}>
      {(provided, snapshot) => (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column'
          }}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          <h2>{id}</h2>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              minHeight: '120px'
              //When using multiple columns, it's important to have a minimum height on the element that takes provided.droppableProps.
            }}
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {list.map((text, index) => (
              <Item key={text} text={text} index={index} />
            ))}
            {provided.placeholder}
          </div>
        </div>
      )}
    </Droppable>
  )
}

export default Column
