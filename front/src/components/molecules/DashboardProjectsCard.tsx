import { useCallback, useState } from 'react';
import { useQuery } from "@apollo/client"
import { useHistory } from 'react-router-dom';

import {
  CircularProgress,
  Chip,
  Stack,
  Box,
  Card,
  CardActionArea,
  CardContent,
  Paper,
  Typography,
} from '@mui/material';
import  PersonIcon from '@mui/icons-material/Person';
import { makeStyles } from "@mui/styles"

import MoreMenu from "../atoms/MoreMenu"

import { GET_ALL_PROJECTS }  from "../../queries/project"
import { Language } from "../../entities/language"
import { Project } from "../../entities/project"
import ModalAddProject from './Project/ModalAddProject';

const useStyles = makeStyles({
    cardContainer: {
      backgroundColor: '#0F4473',
      display: 'flex',
      flexWrap: 'wrap',
    },
    card: {
      marginTop: '25px',
    },
    projectPaper: {
      borderRadius: '30px',
      maxWidth: '430px',
      marginRight: '2rem',
      marginBottom: '2rem',
    },
    projectActionArea: {
      maxWidth: '430px',
      minWidth: '430px',
      minHeight: '175px',
      borderRadius: '30px',
      padding: '1rem 1rem 1rem 2rem',
      boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    },
    projectCardName: {
      fontSize: '17px !important',
    },
    boxTitle: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    projectUserElements: {
      display: 'flex',
      alignItems: 'center',
    },
    projectLanguagesElement: {
      display: 'flex',
      alignItems: 'center',
    },
    chipLanguage: {
      color: 'white',
      fontWeight: '700',
      borderColor: 'white',
  },
})


const DashboardProjectsCard = () => {
    const { loading, data, error } = useQuery(GET_ALL_PROJECTS)
    const [ openModal, setOpenModal ] = useState<boolean>(false);
    const toggleModal = useCallback(() => {
      setOpenModal(!openModal);
    }, [openModal, setOpenModal]);
    const history = useHistory();
    const classes = useStyles()

    return (
        <Card className={classes.card} sx={{borderRadius: '20px'}}>
            <CardContent className={classes.cardContainer}>
              <Box className={classes.boxTitle} >
                <Typography variant="h2" sx={{ fontSize: '28px', color: 'white', fontWeight: 'bold'}}>
                  All Projects
                </Typography>
                <MoreMenu options={['Add a Project']} onClick={toggleModal}/>
              </Box>
                {loading && (
                   <CircularProgress />
                )}
                {data?.projects.map((project: Project) => {
                const {id, name, shortText, languages, countAssignee} = project
                return (
                    <Paper key={id} className={classes.projectPaper} onClick={() => history.push(`/project/${id}/Tasks`)}>
                        <CardActionArea sx={{ borderRadius: '30px' }} className={classes.projectActionArea}>
                        <Box padding="15px">
                            <Typography fontWeight="bold" className={classes.projectCardName}>
                            {name}
                            </Typography>
                            <Typography>{shortText}</Typography>
                            <Box className={classes.projectUserElements}>
                            <PersonIcon />
                            <Typography>{countAssignee <= 1 ? countAssignee + ' user' : countAssignee + ' users'}</Typography>
                            </Box>
                            <Box className={classes.projectLanguagesElement}>
                            <Stack direction="row" spacing={1}>
                                {languages.map((language) => {
                                    const {name} = language;
                                    return (
                                        <Chip label={name} color="primary" variant="outlined" className={classes.chipLanguage}/>
                                    )
                                })}
                                </Stack>
                            {/* {languages.map((language: Language) => {
                                return (
                                <>
                                    <Typography sx={{marginRight: '5px'}} key={language.id} component='p'>{language.name}</Typography>
                                </>
                                )
                            })} */}
                            </Box>
                        </Box>
                        </CardActionArea>
                    </Paper>
                )
                })}
            </CardContent>
            <ModalAddProject
              openModal={openModal}
              toggleModal={toggleModal}
            />
        </Card>
    )
}

export default DashboardProjectsCard
