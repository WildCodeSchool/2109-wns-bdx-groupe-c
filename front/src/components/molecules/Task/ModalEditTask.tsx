import { useState, useCallback, useEffect, useMemo } from 'react';
import { useMutation, ApolloError } from "@apollo/client";
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {makeStyles} from "@mui/styles"
import { TextField, Button } from '@mui/material'

import { MUTATION_UPDATE_TASK }  from "../../../queries/task"
import { Task }  from "../../../entities/task"
import {GET_TASKS_BY_STATUS_BY_PROJECTID} from "../../../queries/status"
import useToast from '../../../contexts/useToast';

import { ExceptionGraphQL } from '../../../entities/error';

interface Props {
  openEditTask: boolean,
  toggleEditTaskModal: () => void,
  task: Task
}

const useStyles = makeStyles({
  mainContainer: {
    position: 'absolute',
    backgroundColor:'white',
    top: '30%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: '24',
    padding: '1rem',
    p: 4,
  },
  containerHeader: {
    display: 'flex',
    justifyContent: 'center',
  },
  containerField: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '1rem',
  },
  buttonValidation: {
    backgroundColor: '#1F84E1',
    color: 'white',
    '&:hover': {
      backgroundColor: '#145591',
    },
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
  },
  iconXmark: {
    position: 'relative',
    top: '0',
    right: '-80px',
    cursor: 'pointer',
  },
  textField: {
    paddingBottom: '1rem',
  },
  texFieldError: {
    "& .MuiInput-root::before": {
      borderColor: 'red',
    },
  },
  fieldError: {
    color: 'red',
    fontSize: '0.8rem',
  }
})

interface UseParamProps {
  id: string | undefined,
};


const ModalEditTask = ({openEditTask, toggleEditTaskModal, task}: Props) => {
  const classes = useStyles()
  const { id } = useParams<UseParamProps>();
  const { showToast } = useToast();

  const [shortText, setShortText] = useState<string>('');
  const [subject, setSubject] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [expectedDuration, setExpectedDuration] = useState<string>('');
  const [dueDate, setDueDate] = useState<string>('');

  const [error, setError] = useState<ApolloError | null>(null)
  const [updateTask] = useMutation(MUTATION_UPDATE_TASK);

  useEffect(() => {
    setShortText(task.shortText)
    setSubject(task.subject)
    setDescription(task.description)
    setExpectedDuration(String(task.expectedDuration))
    setDueDate(new Date(task.dueDate).toISOString().split('T')[0])
    setError(null)
  }, [openEditTask, task])

  const handleEdition = useCallback(async (e: React.MouseEvent<HTMLButtonElement, MouseEvent> ) => {
    e.preventDefault()
    if (id) {
      try {
        await updateTask({
          variables: {
            updateTaskId: parseInt(String(task.id), 10),
            description,
            shortText,
            subject,
            expectedDuration: parseInt(expectedDuration, 10),
            dueDate: new Date(dueDate).toISOString()
          },
          refetchQueries: [{
            query: GET_TASKS_BY_STATUS_BY_PROJECTID,
            variables: {
              projectId: parseInt(id, 10)
            }
          }]
        });
        toggleEditTaskModal();
        showToast('success', 'Task edited with success !');
      } catch (error) {
        setError(error as ApolloError)
      }
    }
  }, [shortText, subject, description, expectedDuration, dueDate, updateTask]);


  const errorProps = useMemo(() => {
    const errorFormatted: {[key:string]: string} = {};
    if (error) {
      if (error.graphQLErrors && error.graphQLErrors.length > 0) {
        const graphQLErrors = error.graphQLErrors;
        const extentions = graphQLErrors[0].extensions;
        const exceptions = extentions.exception as ExceptionGraphQL;
        const validationErrors = exceptions.validationErrors;
        validationErrors.forEach((validationError) => {
          const property: string = validationError.property;
          const message: string = validationError.constraints[Object.keys(validationError.constraints)[0]];
          errorFormatted[property] = message;
        });
        return errorFormatted;
      }
      return errorFormatted
    } else {
      return errorFormatted
    }
  }, [error])

  return (
    <Modal
    open={openEditTask}
    onClose={toggleEditTaskModal}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
    >
      <Box className={classes.mainContainer}>
        <Box className={classes.containerHeader}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Edit the task
          </Typography>
          <FontAwesomeIcon
                        icon={faXmark}
                        className={classes.iconXmark}
                        onClick={toggleEditTaskModal}
                    />
        </Box>
        <Box className={classes.containerField}>
          <TextField
              id="subject"
              type="text"
              label="Subject"
              variant="standard"
              value={subject}
              className={errorProps?.subject ? classes.texFieldError : classes.textField}
              onChange={(event) => setSubject(event.target.value)}
          />
          {errorProps?.subject && <Box className={classes.fieldError}>{errorProps.subject}</Box>}
          <TextField
              id="shortText"
              type="text"
              label="Short Text"
              variant="standard"
              value={shortText}
              className={errorProps?.shortText ? classes.texFieldError : classes.textField}
              onChange={(event) => setShortText(event.target.value)}
          />
          {errorProps?.shortText && <Box className={classes.fieldError}>{errorProps.shortText}</Box>}
          <TextField
              id="description"
              type="text"
              label="Description"
              variant="standard"
              value={description}
              className={errorProps?.description ? classes.texFieldError : classes.textField}
              onChange={(event) => setDescription(event.target.value)}
          />
          {errorProps?.description && <Box className={classes.fieldError}>{errorProps.description}</Box>}
          <TextField
              id="expectedDuration"
              type="number"
              label="Expected Duration in hours"
              variant="standard"
              value={expectedDuration}
              className={errorProps?.expectedDuration ? classes.texFieldError : classes.textField}
              onChange={(event) => setExpectedDuration(event.target.value)}
          />
          {errorProps?.expectedDuration && <Box className={classes.fieldError}>{errorProps.expectedDuration}</Box>}
          <TextField
              id="dueDate"
              type="date"
              label="Due date"
              variant="standard"
              value={dueDate}
              className={errorProps?.dueDate ? classes.texFieldError : classes.textField}
              onChange={(event) => setDueDate(event.target.value)}
          />
          {errorProps?.dueDate && <Box className={classes.fieldError}>{errorProps.dueDate}</Box>}
        </Box>
        <Box className={classes.buttonContainer}>
          <Button
            onClick={(e) => handleEdition(e)}
            className={classes.buttonValidation}
          >
              VALIDATE
          </Button>
        </Box>
      </Box>
    </Modal>
    );
}

export default ModalEditTask