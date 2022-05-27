import { useState, useCallback, useEffect } from 'react';
import { useMutation, ApolloError } from "@apollo/client";
import { useParams } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {makeStyles} from "@mui/styles"
import { emptyTask } from '../../../helpers/TaskHelper';
import { TextField, Button } from '@mui/material'

import {MUTATION_CREATE_TASK} from "../../../queries/task"
import {GET_TASKS_BY_STATUS_BY_PROJECTID} from "../../../queries/status"

interface Props {
  openAddTask: boolean,
  toggleAddTaskModal: () => void,
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
  }
})

interface UseParamProps {
  id: string | undefined,
};


const ModalAddTask = ({openAddTask, toggleAddTaskModal}: Props) => {
  const classes = useStyles()
  const { id } = useParams<UseParamProps>();

  const [shortText, setShortText] = useState<string>(emptyTask.shortText);
  const [subject, setSubject] = useState<string>(emptyTask.subject);
  const [description, setDescription] = useState<string>(emptyTask.description);
  const [expectedDuration, setExpectedDuration] = useState<string>(emptyTask.expectedDuration);
  const [dueDate, setDueDate] = useState<string>(emptyTask.dueDate);

  const [error, setError] = useState<ApolloError | null>(null)
  const [createTask] = useMutation(MUTATION_CREATE_TASK);

  useEffect(() => {
    setShortText(emptyTask.shortText)
    setSubject(emptyTask.subject)
    setDescription(emptyTask.description)
    setExpectedDuration(emptyTask.expectedDuration)
    setDueDate(emptyTask.dueDate)
  }, [openAddTask])

  const handleCreation = useCallback(async (e: React.MouseEvent<HTMLButtonElement, MouseEvent> ) => {
    e.preventDefault()
    if (id) {
      try {
        await createTask({
          variables: {
            subject,
            shortText,
            description,
            projectId: parseInt(id, 10),
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
        toggleAddTaskModal();
      } catch (error) {
        setError(error as ApolloError)
      }
    }
  }, [shortText, subject, description, expectedDuration, dueDate, createTask]);

  return (
    <Modal
    open={openAddTask}
    onClose={toggleAddTaskModal}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
    >
      <Box className={classes.mainContainer}>
        <Box className={classes.containerHeader}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add a task here !
          </Typography>
          <FontAwesomeIcon
                        icon={faXmark}
                        className={classes.iconXmark}
                        onClick={toggleAddTaskModal}
                    />
        </Box>
        <Box className={classes.containerField}>
          <TextField
              id="subject"
              type="text"
              label="Subject"
              variant="standard"
              value={subject}
              className={classes.textField}
              onChange={(event) => setSubject(event.target.value)}
          />
          <TextField
              id="shortText"
              type="text"
              label="Short Text"
              variant="standard"
              value={shortText}
              className={classes.textField}
              onChange={(event) => setShortText(event.target.value)}
          />
          <TextField
              id="description"
              type="text"
              label="Description"
              variant="standard"
              value={description}
              className={classes.textField}
              onChange={(event) => setDescription(event.target.value)}
          />
          <TextField
              id="expectedDuration"
              type="number"
              label="Expected Duration in hours"
              variant="standard"
              value={expectedDuration}
              className={classes.textField}
              onChange={(event) => setExpectedDuration(event.target.value)}
          />
          <TextField
              id="dueDate"
              type="date"
              label="Due date"
              variant="standard"
              value={dueDate}
              className={classes.textField}
              onChange={(event) => setDueDate(event.target.value)}
          />
        </Box>
        <Box className={classes.buttonContainer}>
          <Button
            onClick={(e) => handleCreation(e)}
            className={classes.buttonValidation}
          >
              VALIDATE
          </Button>
        </Box>
      </Box>
    </Modal>
    );
}

export default ModalAddTask