import {useState} from 'react';
import Column from './Column'
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
/*

The react-beautiful-dnd package expects a syntax you might not have seen before.
It uses components that expect a function as its child.

That function then returns JSX/TSX containing the element you want to make droppable/draggable.

*/

/*

This is because the function has an argument called provided that needs to be passed
as props to the droppable/draggable elements. (It also allows use of a second, more advanced argument that we won't need today.)
First, we need to wrap everything in a <DragDropContext>. We also need to make a onDragEnd function that we'll be using later.


/*
DragDropContext  (contient une sorte de store)  => onDragEnd c'est la fonction qui gère ce qu'il se passe quand on fait un drag & drop
  si tu ne précise rien, ()=>null, le drag & drop fonctionne mais ta liste va toujours revenir à son état initial, tu as besoin de la fonction onDragEnd
  pour garder dans un state la liste après le drag & drop, onDragEnd viens avec 2 props : source et destination qui te permettent de décrire ce qu'il se passe
  en fonction de la source et de la destination.

  Droppable (C'est l'objet qui va contenir les éléments draggables)

    Draggable  (C'est l'objet qu'on va pouvoir placer dans un droppable ou d'un dropable à un autre dropable)

*/

export interface dragElementProps {
  index: number
  droppableId: string
}


function Draglist () {

  const initialColumns = {
    "todo": {
      id: 'todo',
      list: ['item 1', 'item 2', 'item 3']
    },
    "doing": {
      id: 'doing',
      list: []
    },
    "done": {
      id: 'done',
      list: []
    }
  }
  const [columns, setColumns] = useState(initialColumns)

  const onDragEnd = ({ source, destination }: DropResult) => {
    // Make sure we have a valid destination
    if (destination === undefined || destination === null) return null

    const sourceDroppableId = source.droppableId as 'todo' | 'doing' | 'done';
    const destinationDroppableId = destination.droppableId as 'todo' | 'doing' | 'done';

    // If the source and destination columns are the same
    // AND if the index is the same, the item isn't moving
    if (
      sourceDroppableId === destinationDroppableId &&
      destination.index === source.index
    )
      return null

    // Set start and end variables => ce sont les colonnes
      const start = columns[sourceDroppableId];
      const end = columns[destinationDroppableId];


    // If start is the same as end, we're in the same column, on replace juste l'index
    if (start === end) {
      // Move the item within the list
      // Start by making a new list without the dragged item
      let newList = columns[sourceDroppableId].list.filter((_, index) => index !== source.index)

      // Then insert the item at the right location
      // Ici on supprime 0 éléments c'est le 0, à partir de l'index : destination.index, et on y place l'élement list[source.index]
      newList.splice(destination.index, 0, columns[sourceDroppableId].list[source.index])

      const newCols = {...columns, ...{[sourceDroppableId]: {...columns[sourceDroppableId], list: newList}}}

      setColumns(newCols)

    } else {
      let newColEnd;
      const elementToMove: string = columns[sourceDroppableId].list[source.index]
      if (columns[destinationDroppableId].list.length === 0 && typeof(elementToMove) === 'string') {
        // Si pas d'élement dans le tableau le nouveau tableau a juste l'élément
        newColEnd = [elementToMove];
      } else {
        const endList = columns[destinationDroppableId].list;

        // At position 2, add 2 elements:
        endList.splice(destination.index, 0, elementToMove);

        newColEnd = endList;
      }

      // Si le start !== end c'est qu'on change de colonne !, la colonne de start perd son élément
      const newColStart = columns[sourceDroppableId].list.filter((_, index) => index !== source.index);


      const newCols = {...columns, ...{[sourceDroppableId]: {...columns[sourceDroppableId], list: newColStart}, [destinationDroppableId]: {...columns[destinationDroppableId], list: newColEnd}}}
      setColumns(newCols)
    }


  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr 1fr',
          margin: '24px auto',
          width: '80%',
          gap: '8px'
        }}
      >
        {Object.values(columns).map(column => (
          <Column column={column} key={column.id} />
        ))}
      </div>
    </DragDropContext>
  )
}


export default Draglist