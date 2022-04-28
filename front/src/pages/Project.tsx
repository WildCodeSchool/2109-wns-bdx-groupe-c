import { useState, useEffect } from 'react'
import { useQuery, useMutation } from "@apollo/client"
import { useParams } from 'react-router-dom';
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import Box from "@mui/material/Box"
import {makeStyles} from "@mui/styles"
import ObjectHelpers from '../helpers/ObjectHelper';
import { Task } from '../entities/task';
import { Status } from '../entities/status';

// import ProjectAllTasksCard from "../components/molecules/ProjectAllTasksCard"
import StatusColumn from '../components/molecules/StatusColumn';

import {
    GET_TASKS_BY_STATUS_BY_PROJECTID,
    GET_ALL_STATUS,
} from "../queries/status"
import { MUTATION_UPDATE_STATUS_TASK } from "../queries/task"

const useStyles = makeStyles({
    mainContainer: {
        backgroundColor: '#0086FF', //BLUE
        // margin: '0',
        // minHeight: '100vh',
        // padding: '25px',
        // display: 'grid',
        // gridTemplate: 'minmax(200px, calc(100vh - 50px)) / 1fr 1fr 1fr 1fr',
        // columnGap: '30px'
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr 1fr',
        margin: '24px auto',
        width: '80%',
        gap: '8px'
    }
})

interface UseParamProps {
    id: string | undefined,
  }

interface dragListType {
    "Code Review": {
        id: string,
        name: string,
        tasks: Task[]
    },
    'Done': {
        id: string,
        name: string,
        tasks: Task[]
    },
    'In Progress': {
        id: string,
        name: string,
        tasks: Task[]
    },
    'To Do': {
        id: string,
        name: string,
        tasks: Task[]
    },
}

interface TaskTest {
    id: string,
    shortText: string
    subject: string
}

const Project = () => {
    const classes = useStyles()
    const { id } = useParams<UseParamProps>();

    const { data: statusData } = useQuery(GET_ALL_STATUS)

    const { loading, data } = useQuery(GET_TASKS_BY_STATUS_BY_PROJECTID, {
        variables: {projectId: id ? parseInt(id, 10) : 0}
    })

    const [updateStatusTask] = useMutation(MUTATION_UPDATE_STATUS_TASK)

    /*
  const [logOut] = useMutation(LOG_OUT, {refetchQueries: [{query: MY_PROFILE}]});
  const [signIn, { data, error }] = useMutation(SIGN_IN);

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    signIn({
      variables: { email, password },
      refetchQueries: [ MY_PROFILE ]
    })
  }, [signIn, email, password])



    */

    const [statusColumns, setStatusColumns] = useState<dragListType | null>(null)

    useEffect(() => {
        if(data) {
            const { taskByStatusByProject } = data
            const taskByStatusByProjectFormatted = ObjectHelpers.ArrayToObject(taskByStatusByProject, 'name')
            setStatusColumns(taskByStatusByProjectFormatted);
        }
    }, [data])

    const onDragEnd = ({ source, destination }: DropResult) => {
        if (statusColumns && statusData) {
            // Make sure we have a valid destination
            if (destination === undefined || destination === null) return null

            const sourceDroppableId = source.droppableId as 'Code Review' | 'Done' | 'In Progress' | 'To Do';
            const destinationDroppableId = destination.droppableId as 'Code Review' | 'Done' | 'In Progress' | 'To Do';

            // If the source and destination columns are the same
            // AND if the index is the same, the item isn't moving
            if (
              sourceDroppableId === destinationDroppableId &&
              destination.index === source.index
            )
              return null

            // Set start and end variables => ce sont les colonnes
              const start = statusColumns[sourceDroppableId];
              const end = statusColumns[destinationDroppableId];


            // If start is the same as end, we're in the same column, on replace juste l'index
            if (start === end) {
              // Move the item within the list
              // Start by making a new list without the dragged item
              let newList = statusColumns[sourceDroppableId].tasks.filter((_, index) => index !== source.index)

              // Then insert the item at the right location
              // Ici on supprime 0 éléments c'est le 0, à partir de l'index : destination.index, et on y place l'élement list[source.index]
              newList.splice(destination.index, 0, statusColumns[sourceDroppableId].tasks[source.index])

              const newCols = {...statusColumns, ...{[sourceDroppableId]: {...statusColumns[sourceDroppableId], tasks: newList}}}

              setStatusColumns(newCols)

            } else {
              let newColEnd;
              const elementToMove: Task = statusColumns[sourceDroppableId].tasks[source.index]
              console.log('elementToMove', elementToMove);
              console.log('destination', destination);
              const statusTable: Status[] = statusData.status
              const statusId = statusTable.find(status => status.name === destinationDroppableId)?.id
              const taskId = elementToMove.id


              if ( statusId && taskId ) {
                const statusIdFormatted = parseInt(statusId, 10);
                const taskIdFormatted = parseInt(taskId, 10);
                updateStatusTask({
                    variables:{
                        updateStatusId: taskIdFormatted,
                        statusId: statusIdFormatted
                    },
                    // refetchQueries: [ GET_TASKS_BY_STATUS_BY_PROJECTID ]
                })
              }
              if (statusColumns[destinationDroppableId].tasks.length === 0) {
                // Si pas d'élement dans le tableau le nouveau tableau a juste l'élément
                newColEnd = [elementToMove];
              } else {
                const endList = statusColumns[destinationDroppableId].tasks;
                const endListCopy = ObjectHelpers.deepClone(endList);
                endListCopy.splice(destination.index, 0, elementToMove);

                newColEnd = endListCopy;
                console.log('newColEnd', newColEnd);
              }

              // Si le start !== end c'est qu'on change de colonne !, la colonne de start perd son élément
              const newColStart = statusColumns[sourceDroppableId].tasks.filter((_, index) => index !== source.index);


              const newCols = {...statusColumns, ...{[sourceDroppableId]: {...statusColumns[sourceDroppableId], tasks: newColStart}, [destinationDroppableId]: {...statusColumns[destinationDroppableId], tasks: newColEnd}}}
              setStatusColumns(newCols)
            }
        }


      }

    return (
        <>
            <DragDropContext onDragEnd={onDragEnd}>
                <h1>DragNDrop TEST</h1>
                {loading && <h1>Loading...</h1>}
                {!loading && statusColumns && (
                    <Box className={classes.mainContainer}>
                        {Object.values(statusColumns).map(status => {
                            const { id } = status
                            return (
                                <StatusColumn column={status} key={id} />
                            )
                        })}
                    </Box>
                )}
            </DragDropContext>
        </>
    )
}

export default Project