import { useState, useCallback, useEffect, useMemo } from 'react';
import { useMutation, ApolloError } from "@apollo/client";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {makeStyles} from "@mui/styles"
import { emptyProject } from '../../../helpers/ProjectHelper';
import { TextField, Button } from '@mui/material'

import {MUTATION_CREATE_PROJECT, GET_ALL_PROJECTS} from "../../../queries/project"

import { ExceptionGraphQL } from '../../../entities/error';

interface Props {
  openModal: boolean,
  toggleModal: () => void,
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


const ModalAddProject = ({openModal, toggleModal}: Props) => {
  const classes = useStyles()
  const [name, setName] = useState<string>(emptyProject.name);
  const [shortText, setShortText] = useState<string>(emptyProject.shortText);
  const [description, setDescription] = useState<string>(emptyProject.description);
  const [initialTimeSpent, setInitialTimeSpent] = useState<number>(emptyProject.initialTimeSpent);

  const [error, setError] = useState<ApolloError | null>(null)
  const [createProject] = useMutation(MUTATION_CREATE_PROJECT);

  useEffect(() => {
    setName(emptyProject.name)
    setShortText(emptyProject.shortText)
    setDescription(emptyProject.description)
    setInitialTimeSpent(emptyProject.initialTimeSpent)
    setError(null)
  }, [openModal])

  const handleCreation = useCallback(async (e: React.MouseEvent<HTMLButtonElement, MouseEvent> ) => {
  e.preventDefault()
    try {
      await createProject({
        variables: {
          name,
          shortText,
          description,
          initialTimeSpent,
        },
        refetchQueries: [{
          query: GET_ALL_PROJECTS,
        }]
      });
      toggleModal();
    } catch (error) {
      setError(error as ApolloError)
    }
  }, [shortText, name, description, initialTimeSpent, createProject, setError]);


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
    open={openModal}
    onClose={toggleModal}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
    >
      <Box className={classes.mainContainer}>
        <Box className={classes.containerHeader}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Add a project here !
          </Typography>
          <FontAwesomeIcon
                        icon={faXmark}
                        className={classes.iconXmark}
                        onClick={toggleModal}
                    />
        </Box>
        <Box className={classes.containerField}>
          <TextField
              id="name"
              type="text"
              label="Name of the project"
              variant="standard"
              value={name}
              className={errorProps?.name ? classes.texFieldError : classes.textField}
              onChange={(event) => setName(event.target.value)}
          />
          {errorProps?.name && <Box className={classes.fieldError}>{errorProps.name}</Box>}
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
              id="initialTimeSpent"
              type="number"
              label="Expected Duration in hours"
              variant="standard"
              value={initialTimeSpent}
              className={errorProps?.initialTimeSpent ? classes.texFieldError : classes.textField}
              onChange={(event) => setInitialTimeSpent(parseFloat(event.target.value))}
          />
          {errorProps?.initialTimeSpent && <Box className={classes.fieldError}>{errorProps.initialTimeSpent}</Box>}
        </Box>
        <Box className={classes.buttonContainer}>
          <Button
            onClick={(e) => handleCreation(e)}
            className={classes.buttonValidation}
          >
              Create the project
          </Button>
        </Box>
      </Box>
    </Modal>
    );
}

export default ModalAddProject