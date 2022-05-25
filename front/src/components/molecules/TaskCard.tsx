import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useMutation, ApolloError, useQuery } from "@apollo/client";
import { useParams } from 'react-router-dom';

import {useCallback, useState, useEffect} from 'react'
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";


import { Draggable } from 'react-beautiful-dnd'
import Box from '@mui/material/Box'
import {makeStyles} from "@mui/styles"


import { Task } from "../../entities/task"
import {MUTATION_DELETE_TASK} from "../../queries/task"
import {GET_TASKS_BY_STATUS_BY_PROJECTID } from "../../queries/status"

interface TaskCardProps {
  task: Task
  index: number
  openToastSuccessTaskDeleted: () => void
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
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: 'bold',
  },
  iconTrash: {
    paddingLeft: '1rem',
    cursor: 'pointer',
  },
  iconEdit: {
    cursor: 'pointer',
  }
})

interface UseParamProps {
  id: string | undefined,
};

const TaskCard: React.FC<TaskCardProps> = ({ task, index, openToastSuccessTaskDeleted } ) => {
  const classes = useStyles()
  const { id: projectId } = useParams<UseParamProps>();
  const {shortText, subject, id: taskId} = task

  const [deleteTask] = useMutation(MUTATION_DELETE_TASK);
  const [error, setError] = useState<ApolloError | null>(null)


  const handleDeleteTask = useCallback(async(taskId: string) => {
    if (projectId) {
      new Promise((resolve) => {
        resolve(deleteTask({
                variables: {
                  deleteTaskId: parseInt(taskId, 10),
                },
                refetchQueries: [{
                  query: GET_TASKS_BY_STATUS_BY_PROJECTID,
                  variables: {
                    projectId: parseInt(projectId, 10),
                  }
                }]
              }));
      })
        .then(() => {
          //TODO ici afficher snackBar
          openToastSuccessTaskDeleted()
        })
        .catch((error) => {
          setError(error as ApolloError)
        })
    }
  }, []);

  return (
    <>
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
                      className={classes.iconEdit}
                      color="#00bcd4"
                    />
                  <FontAwesomeIcon
                      icon={faTrash}
                      className={classes.iconTrash}
                      onClick={() => handleDeleteTask(taskId)}
                      color="#00bcd4"
                  />
                </Box>
              </Box>
            </Paper>
        )}
      </Draggable>
    </>
  )
}

export default TaskCard