import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faTrash, faUser } from '@fortawesome/free-solid-svg-icons';
import { useMutation, ApolloError } from "@apollo/client";
import { useParams } from 'react-router-dom';

import {useCallback, useState} from 'react'
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";


import { Draggable } from 'react-beautiful-dnd'
import Box from '@mui/material/Box'
import {makeStyles} from "@mui/styles"


import { Task } from "../../entities/task"
import {MUTATION_DELETE_TASK} from "../../queries/task"
import {GET_TASKS_BY_STATUS_BY_PROJECTID } from "../../queries/status"
import ModalAttributeUserToTask from './Task/ModalAttributeUserToTask';
import useToast from '../../contexts/useToast';


interface TaskCardProps {
  task: Task
  index: number
}

const useStyles = makeStyles({
  taskPaper: {
    maxWidth: '100%',
    minHeight: '100px',
    padding: '0',
    margin: '10px',
  },
  cardContainer: {
    display: 'flex',
    minHeight:'100px',
    justifyContent: 'space-between',
  },
  title: {
    fontWeight: 'bold',
  },
  iconContainer: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    paddingLeft: '.5rem'
  },
  iconTrash: {
    cursor: 'pointer',
    marginBottom: '.5rem',
  },
  iconEdit: {
    cursor: 'pointer',
    marginBottom: '.5rem',
  },
  iconUser: {
    cursor: 'pointer',
  }
})

interface UseParamProps {
  id: string | undefined,
};

const TaskCard: React.FC<TaskCardProps> = ({ task, index } ) => {
  const classes = useStyles()
  const { showToast } = useToast();
  const { id: projectId } = useParams<UseParamProps>();
  const {shortText, subject, id: taskId, assignee } = task
  const [ deleteTask ] = useMutation(MUTATION_DELETE_TASK);
  const [ error, setError ] = useState<ApolloError | null>(null)
  const [ showModal, setShowModal ] = useState<boolean>(false)

  const toggleModal = useCallback(() => {
    setShowModal(!showModal)
  }, [showModal, setShowModal])

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
          showToast('success', 'Task deleted with success !');
        })
        .catch((error) => {
          setError(error as ApolloError)
        })
    }
  }, [projectId, setError, showToast]);

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
                  {assignee && (
                    <>
                      <Typography>{ assignee.firstName } { assignee.lastName }</Typography>
                    </>
                  )}
                </Box>
                <Box className={classes.iconContainer}>
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
                  <FontAwesomeIcon
                      icon={faUser}
                      className={classes.iconUser}
                      onClick={toggleModal}
                      color="#00bcd4"
                  />
                </Box>
              </Box>
            </Paper>
        )}
      </Draggable>
      <ModalAttributeUserToTask
        showModal={showModal}
        toggleModal={toggleModal}
        taskId={taskId}
        projectId={projectId}
      />
    </>
  )
}

export default TaskCard