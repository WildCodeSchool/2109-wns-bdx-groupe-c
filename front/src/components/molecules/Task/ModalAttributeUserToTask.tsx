import { useEffect, useState } from 'react';
import Select, {SingleValue, ActionMeta} from 'react-select'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useQuery, useMutation } from '@apollo/client';


import CircularProgress from '@mui/material/CircularProgress'
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {makeStyles} from "@mui/styles"
import { Button } from '@mui/material'
import { GET_ALL_USERS } from '../../../queries/user';
import { ASSIGN_USER_TO_TASK } from '../../../queries/task';
import { GET_TASKS_BY_STATUS_BY_PROJECTID } from "../../../queries/status"
import { GET_ALL_PROJECTS } from '../../../queries/project';
import { User } from '../../../entities/user';
import useToast from '../../../contexts/useToast';

interface Props {
  showModal: boolean,
  toggleModal: () => void,
  taskId: string,
  projectId: string | undefined,
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
})

export interface Option {
  label: string,
  value: string,
}

const ModalAttributeUserToTask = ({showModal, toggleModal, taskId, projectId}: Props) => {
  const classes = useStyles()
  const { showToast } = useToast();
  const { data, loading } = useQuery(GET_ALL_USERS, {
    skip: !showModal
  });
  const [ assignUserToTask ] = useMutation(ASSIGN_USER_TO_TASK);
  const [ optionSelected, setOptionSelected ] = useState<Option | null>(null)
  const [ options, setOptions ] = useState<Option[]>([])

  const handleChange = (newValue: SingleValue<Option>, actionMeta: ActionMeta<Option>) : void => {
    setOptionSelected(newValue)
  }


  useEffect(() => {
    if (data && options.length === 0) {
      const { users } = data;
      users.forEach((user: User) => {
        options.push({
          value: String(user.id),
          label: `${user.firstName} ${user.lastName}`,
        })
      })
      setOptions(options);
    }
  }, [showModal, data, options, setOptions])

  useEffect(() => {
    if (!showModal) {
      setOptionSelected(null)
      setOptions([])
    }
  }, [showModal, setOptionSelected, setOptions])

  const handleValidation = async () => {
    if (optionSelected && projectId) {
      try {
        assignUserToTask({
          variables: {
            assignUserToTaskId: parseInt(taskId,10),
            userId: parseInt(optionSelected.value,10)
          },
          refetchQueries: [{
            query: GET_TASKS_BY_STATUS_BY_PROJECTID,
            variables: {
              projectId: parseInt(projectId, 10),
            }
          }, {
            query: GET_ALL_PROJECTS,
          }]
        })
        toggleModal();
        showToast('success', 'User Attributed with Success !');
      }
      catch {

      }
    }
  };

  return (
    <Modal
    open={showModal}
    onClose={toggleModal}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
    >
      <Box className={classes.mainContainer}>
        <Box className={classes.containerHeader}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add a user to the Task
          </Typography>
          <FontAwesomeIcon
            icon={faXmark}
            className={classes.iconXmark}
            onClick={toggleModal}
        />
        </Box>
        {loading
        ? (
          <CircularProgress/>
        )
        :
          <>
            <Typography id="modal-modal-title" variant="h6" component="h2">
              Choose a user
            </Typography>
            <Box className={classes.containerField}>
            <Select options={options} onChange={handleChange} value={optionSelected}/>
            </Box>
          </>
        }
        <Box className={classes.buttonContainer}>
          <Button
            onClick={handleValidation}
            className={classes.buttonValidation}
          >
              VALIDATE
          </Button>
        </Box>
      </Box>
    </Modal>
    );
}

export default ModalAttributeUserToTask