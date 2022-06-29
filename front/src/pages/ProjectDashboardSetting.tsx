import { useState, useCallback } from 'react';
import { makeStyles } from "@mui/styles"
import { useParams } from 'react-router-dom';
import { Box, Typography, Button } from "@mui/material"
import BoxColored from '../components/atoms/BoxColored'
import Sidenav from "../components/molecules/Sidenav"
import ModalDeleteProject from '../components/molecules/Project/ModalDeleteProject'
import ModalResetTasks from '../components/molecules/Project/ModalResetTasks'

const useStyles = makeStyles({
    mainContainer: {
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
    testComponent: {
      border: '1px solid red',
      minHeight: '150px',
      borderRadius: '20px',
    },
    testComponentHighlight: {
      backgroundColor: 'red',
      minHeight: '20px',
      borderRadius: '100px 0 0 0',
      maxWidth: '220px',
      position: 'relative',
      left: '-1px',
      top: '-1px',
    },
    boxColored: {
      maxWidth: "80%",
      marginLeft: '1rem',
      marginTop: '1rem',
    },
    buttonContainer: {
      marginTop: '1rem',
    },
    buttonValidation: {
      backgroundColor: '#f2381e',
      color: 'white',
      fontWeight: '700',
      '&:hover': {
        backgroundColor: '#881e10',
      },
    },
    buttonValidationTasks: {
      backgroundColor: '#a5a6f6',
      color: 'white',
      fontWeight: '700',
      '&:hover': {
        backgroundColor: '#6b6ba1',
      },
    },
  })

interface UseParamProps {
  id: string,
}

const ProjectDashboardSetting = () => {
    const classes = useStyles()
    const [ showModalDelete, setShowModalDelete ] = useState<boolean>(false);
    const toggleModalDelete = useCallback(() => {
      setShowModalDelete(!showModalDelete);
    }, [showModalDelete, setShowModalDelete]);

    const [ showModalResetTasks, setShowModalResetTasks ] = useState<boolean>(false);
    const toggleModalResetTasks = useCallback(() => {
      setShowModalResetTasks(!showModalResetTasks);
    }, [showModalResetTasks, setShowModalResetTasks]);

    const { id } = useParams<UseParamProps>();

    return (
        <Box className={classes.mainContainer}>
            <Sidenav />
            <h1>Administration settings of the project</h1>
            <BoxColored color='#a5a6f6' className={classes.boxColored}>
              <Typography id="title" variant="h6" component="h2">
                Reset all tasks from the project
              </Typography>
              <Box className={classes.buttonContainer}>
                <Button
                  onClick={toggleModalResetTasks}
                  className={classes.buttonValidationTasks}
                >
                    Reset tasks
                </Button>
              </Box>
            </BoxColored>
            <BoxColored color='#f2381e' className={classes.boxColored}>
              <Typography id="title" variant="h6" component="h2">
                Highway to the danger zone
              </Typography>
              <Box className={classes.buttonContainer}>
                <Button
                  onClick={toggleModalDelete}
                  className={classes.buttonValidation}
                >
                    Delete The Project
                </Button>
              </Box>
            </BoxColored>
            <ModalDeleteProject
              showModal={showModalDelete}
              toggleModal={toggleModalDelete}
              projectId={parseInt(id, 10)}
            />
            <ModalResetTasks
              showModal={showModalResetTasks}
              toggleModal={toggleModalResetTasks}
              projectId={parseInt(id, 10)}
            />
        </Box>
    )
}

export default ProjectDashboardSetting