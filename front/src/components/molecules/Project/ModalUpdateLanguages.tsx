import { useEffect, useState, useMemo, useCallback } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { useQuery, useMutation } from '@apollo/client';

import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import CircularProgress from '@mui/material/CircularProgress'
import Modal from '@mui/material/Modal';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import {makeStyles} from "@mui/styles"
import { Button } from '@mui/material'
import { GET_ALL_LANGUAGES } from '../../../queries/language';
import { MUTATION_UPDATE_PROJECT_LANGUAGES, GET_ONE_PROJECT } from '../../../queries/project';

import useToast from '../../../contexts/useToast';
import { Project } from '../../../entities/project';
import { Language } from '../../../entities/language';

interface Props {
  showModal: boolean,
  toggleModal: () => void,
  project: Project,
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
    flexDirection: 'row',
    flexWrap: 'wrap',
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

export interface Option {
  label: string,
  value: string,
}

export interface LanguageProject {
  id: number,
  name: string,
  inProject: boolean,
}

const ModalUpdateProjectLanguages = ({showModal, toggleModal, project}: Props) => {
  const classes = useStyles()
  const { showToast } = useToast();
  const { data, loading } = useQuery(GET_ALL_LANGUAGES, {
    skip: !showModal
  });
  const [ projectLanguages, setProjectLanguages ] = useState<number[]>([])
  const [ updateProjectLanguages ] = useMutation(MUTATION_UPDATE_PROJECT_LANGUAGES);

  useEffect(() => {
    if (project) {
      setProjectLanguages(project.languages.map((language) => language.id))
    }
  }, [showModal])



  const handleValidation = async () => {
    if (projectLanguages) {
      let projectLanguagesToSend = projectLanguages.map((id) => parseInt(String(id), 10));
      try {
        updateProjectLanguages({
          variables: {
            updateProjectLanguagesId: parseInt(String(project.id), 10),
            languagesId: projectLanguagesToSend,
          },
          refetchQueries: [{
            query: GET_ONE_PROJECT,
            variables: {
              projectId:  parseInt(String(project.id), 10),
            }
          }]
        })
        toggleModal();
        showToast('success', 'Languages updated with success !');
      }
      catch {

      }
    }
  };

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>, checked: boolean, id:number) => {
    let newProjectLanguages = [...projectLanguages];
    if (checked) {
      newProjectLanguages.push(id);
    } else {
      newProjectLanguages = newProjectLanguages.filter((el) => el !== id);
    }
    setProjectLanguages(newProjectLanguages)
  }, [projectLanguages, setProjectLanguages]);

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
            Update languages
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
              Check Languages
            </Typography>
            <Box className={classes.containerField}>
              {data?.languages.map((language: Language) => {
                const { id, name } = language;
                return (
                  <FormControlLabel
                  value="id"
                  control={
                  <Checkbox
                    checked={projectLanguages.includes(id)}
                    onChange={(e, checked) => handleChange(e, checked, id)}
                  />}
                  label={name}
                  labelPlacement="start"
                  key={id}
                />
                )
              })}
            </Box>
          </>
        }
        <Box className={classes.buttonContainer}>
          <Button
            onClick={handleValidation}
            className={classes.buttonValidation}
          >
              Save modifications
          </Button>
        </Box>
      </Box>
    </Modal>
    );
}

export default ModalUpdateProjectLanguages