import { useState, useCallback, useEffect } from 'react';
import { useMutation, ApolloError } from "@apollo/client";
import { useParams } from 'react-router-dom';

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
  containerField: {
    display: 'flex',
    flexDirection: 'column',
    marginBottom: '1rem',
  },
  buttonValidation: {
    backgroundColor: '#1F84E1',
    color: 'white',
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'center',
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
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Formulaire d'ajout de tâche
        </Typography>
        <Box className={classes.containerField}>
          <TextField
              id="shortText"
              type="text"
              label="shortText"
              variant="standard"
              value={shortText}
              onChange={(event) => setShortText(event.target.value)}
          />
          <TextField
              id="subject"
              type="text"
              label="subject"
              variant="standard"
              value={subject}
              onChange={(event) => setSubject(event.target.value)}
          />
          <TextField
              id="description"
              type="text"
              label="description"
              variant="standard"
              value={description}
              onChange={(event) => setDescription(event.target.value)}
          />
          <TextField
              id="expectedDuration"
              type="number"
              label="expectedDuration"
              variant="standard"
              value={expectedDuration}
              onChange={(event) => setExpectedDuration(event.target.value)}
          />
          <TextField
              id="dueDate"
              type="date"
              label="dueDate"
              variant="standard"
              value={dueDate}
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