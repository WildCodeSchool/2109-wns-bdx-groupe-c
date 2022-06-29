import { useHistory } from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useMutation } from '@apollo/client';

import { Modal, Typography, Box, Button } from '@mui/material';
import {makeStyles} from "@mui/styles"
import useToast from '../../../contexts/useToast';
import { GET_ALL_PROJECTS, MUTATION_DELETE_PROJECT } from '../../../queries/project';

interface Props {
  showModal: boolean,
  toggleModal: () => void,
  projectId: number,
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
  buttonValidation: {
    backgroundColor: '#1F84E1',
    color: 'white',
    '&:hover': {
      backgroundColor: '#145591',
    },
  },
  buttonContainer: {
    display: 'flex',
    justifyContent: 'space-evenly',
    marginTop: '2rem',
  },
  iconXmark: {
    position: 'relative',
    top: '0',
    right: '-80px',
    cursor: 'pointer',
  },
})

const ModalDeleteProject = ({showModal, toggleModal, projectId}: Props) => {
  const classes = useStyles();
  const history = useHistory();
  const { showToast } = useToast();
  const [ deleteProject ] = useMutation(MUTATION_DELETE_PROJECT);

  const handleValidation = async () => {
    try {
      deleteProject({
        variables: {
          deleteProjectId: parseInt(String(projectId), 10),
        },
        refetchQueries: [{
          query: GET_ALL_PROJECTS,
        }]
      })
      toggleModal();
      showToast('success', 'Project deleted with success !');
      history.push('/');
    }
    catch {

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
            Are you sure to delete this project ?
          </Typography>
          <FontAwesomeIcon
            icon={faXmark}
            className={classes.iconXmark}
            onClick={toggleModal}
        />
        </Box>
        <Box className={classes.buttonContainer}>
          <Button
            onClick={toggleModal}
            variant="outlined"
          >
              No
          </Button>
          <Button
            onClick={handleValidation}
            className={classes.buttonValidation}
          >
              Yes
          </Button>
        </Box>
      </Box>
    </Modal>
    );
}

export default ModalDeleteProject