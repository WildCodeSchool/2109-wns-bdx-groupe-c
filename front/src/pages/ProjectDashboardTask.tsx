import { useState, useEffect, useCallback } from 'react'
import { useQuery, useMutation } from "@apollo/client"
import { useParams } from 'react-router-dom';
import { DragDropContext, DropResult } from 'react-beautiful-dnd'
import Box from "@mui/material/Box"
import {makeStyles} from "@mui/styles"
import ObjectHelpers from '../helpers/ObjectHelper';
import { Task } from '../entities/task';
import { Status } from '../entities/status';
import Button from '@mui/material/Button';

import StatusColumn from '../components/molecules/StatusColumn';

import {
    GET_TASKS_BY_STATUS_BY_PROJECTID,
    GET_ALL_STATUS,
} from "../queries/status"
import { MUTATION_UPDATE_STATUS_TASK } from "../queries/task"
import ModalAddTask from '../components/molecules/Task/ModalAddTask';
import { Theme } from '@mui/material/styles'
import Sidenav from '../components/molecules/Sidenav';
import useToast from '../contexts/useToast';

const useStyles = makeStyles((theme: Theme) => ({
    masterContainer: {
        backgroundColor: '#061B2E',
        margin: '0',
        minHeight: '100vh',
        padding: '25px',
        marginLeft: '65px',
        color: '#fff',
        marginTop: '64px',
        '@media screen and (max-width: 600px)': {
          marginTop: '54px',
        },
      },
    containerWrapper: {
        backgroundColor: '#061B2E',
        minHeight: '100vh',
    },
    mainContainer: {
        backgroundColor: theme.palette.secondary.main,
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr 1fr',
        margin: '24px auto',
        width: '80%',
        gap: '15px',
        marginTop: '64px',
        '@media screen and (max-width: 600px)': {
          marginTop: '54px',
        },
    },
    buttonContainer: {
        display: 'flex',
        justifyContent: 'center',
        marginTop: '2rem',
    },
    addTaskButton: {
        backgroundColor: '#1F84E1',
        color: 'white',
        minWidth: '200px',
        '&:hover': {
            backgroundColor: '#145591',
        },
    }
}))

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

const ProjectDashboardTask = () => {
    const classes = useStyles()
    const { showToast } = useToast();
    const { id } = useParams<UseParamProps>();

    const { data: dataAllStatus, loading: loadingAllStatus } = useQuery(GET_ALL_STATUS)

    const { loading, data } = useQuery(GET_TASKS_BY_STATUS_BY_PROJECTID, {
        variables: {projectId: id ? parseInt(id, 10) : 0}
    })

    const [openAddTask, setOpenAddTask] = useState(false);

    const toggleAddTaskModal = useCallback(() => {
        setOpenAddTask(!openAddTask);
      },[openAddTask]);

    const [updateStatusTask] = useMutation(MUTATION_UPDATE_STATUS_TASK)
    const [statusColumns, setStatusColumns] = useState<dragListType | null>(null)

    useEffect(() => {
        if(data) {
            const { taskByStatusByProject } = data
            const taskByStatusByProjectFormatted = ObjectHelpers.ArrayToObject(taskByStatusByProject, 'name')
            setStatusColumns(taskByStatusByProjectFormatted);
        }
    }, [data])

    const onDragEnd = ({ source, destination }: DropResult) => {
        if (statusColumns && dataAllStatus) {
            // Make sure we have a valid destination
            if (destination === undefined || destination === null) return null

            const sourceDroppableId = source.droppableId as 'Code Review' | 'Done' | 'In Progress' | 'To Do';
            const destinationDroppableId = destination.droppableId as 'Code Review' | 'Done' | 'In Progress' | 'To Do';

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
              const statusTable: Status[] = dataAllStatus.status
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
              }

              // Si le start !== end c'est qu'on change de colonne !, la colonne de start perd son élément
              const newColStart = statusColumns[sourceDroppableId].tasks.filter((_, index) => index !== source.index);


              const newCols = {...statusColumns, ...{[sourceDroppableId]: {...statusColumns[sourceDroppableId], tasks: newColStart}, [destinationDroppableId]: {...statusColumns[destinationDroppableId], tasks: newColEnd}}}
              setStatusColumns(newCols)


            }
        }
        showToast('success', 'status of the task updated !');

      }

    return (
        <Box className={classes.masterContainer}>
            <Sidenav />
            <Box className={classes.containerWrapper}>
                <DragDropContext onDragEnd={onDragEnd}>
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
                <Box className={classes.buttonContainer}>
                    <Button
                        className={classes.addTaskButton}
                        onClick={toggleAddTaskModal}
                    >
                    Add a Task
                    </Button>
                </Box>
                <ModalAddTask
                    openAddTask={openAddTask}
                    toggleAddTaskModal={toggleAddTaskModal}
                />
            </Box>
        </Box>
    )
}

export default ProjectDashboardTask