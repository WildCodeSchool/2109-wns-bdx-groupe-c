import { useCallback, useState } from 'react';
import { useQuery } from "@apollo/client"
import { useHistory } from 'react-router-dom';

import  { Box, Card, CardActionArea, CardContent, Paper, Typography, CircularProgress, Chip, Stack }  from "@mui/material"
import  LibraryBooksIcon from '@mui/icons-material/LibraryBooks';
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
    cardsAll: {
      display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)',
      gridGap: '2rem',
      width: '100%',
      marginTop: '1rem',
      '@media screen and (max-width: 1440px)': {
        gridTemplateColumns: 'repeat(3, 1fr)',
      },
      '@media screen and (max-width: 840px)': {
        gridTemplateColumns: 'repeat(2, 1fr)',
      },
      '@media screen and (max-width: 640px)': {
        gridTemplateColumns: 'repeat(1, 1fr)',
      }
    },
    card: {
      margin: '3rem 0 0',
      borderRadius: '20px'
    },
    projectPaper: {
      borderRadius: '14px',
    },
    projectActionArea: {
      minWidth: '200px',
      minHeight: '125px',
      borderRadius: '14px',
      padding: '1rem',
      boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    },
    projectCardName: {
      fontSize: '17px !important',
      marginBottom: '1rem',
      fontWeight: 'bold',
    },
    boxTitle: {
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: '1rem',
    },
    projectContainerTitle: {
      fontSize: '28px',
      color: 'white',
      fontWeight: 'bold',
    },
    projectUserElements: {
      display: 'flex',
      alignItems: 'center',
      marginTop: '1rem',
    },
    projectLanguagesElement: {
      display: 'flex',
      alignItems: 'center',
      marginTop: '1rem',
    },
    chipLanguage: {
      color: 'white',
      fontWeight: '700',
      borderColor: 'white',
    },
    languageName: {
      marginLeft: '.5rem'
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
      <Card className={classes.card}>
        <CardContent className={classes.cardContainer}>
          <Box className={classes.boxTitle} >
            <Typography variant="h2" className={classes.projectContainerTitle}>
              All Projects
            </Typography>
            <MoreMenu options={['Add a Project']} onClick={toggleModal}/>
          </Box>
          <Box className={classes.cardsAll}>
            {loading && (
                <CircularProgress />
            )}
            {data?.projects.map((project: Project) => {
            const {id, name, shortText, languages, countAssignee} = project
            return (
                <Paper key={id} className={classes.projectPaper} onClick={() => history.push(`/project/${id}/Tasks`)}>
                    <CardActionArea className={classes.projectActionArea}>
                    <Box>
                        <Typography className={classes.projectCardName}>{name}</Typography>
                        <Typography>{shortText}</Typography>
                        <Box className={classes.projectUserElements}>
                          <PersonIcon />
                          <Typography className={classes.languageName}>{countAssignee <= 1 ? countAssignee + ' user' : countAssignee + ' users'}</Typography>
                        </Box>
                        <Box className={classes.projectLanguagesElement}>
                          <LibraryBooksIcon />
                          {languages.map((language: Language) => {
                              return (
                              <>
                                  <Typography className={classes.languageName} key={language.id} component={'p'}>{language.name}</Typography>
                              </>
                              )
                          })}
                        </Box>
                    </Box>
                    </CardActionArea>
                </Paper>
            )
            })}
          </Box>
        </CardContent>
        <ModalAddProject
          openModal={openModal}
          toggleModal={toggleModal}
        />
      </Card>
    )
}

export default DashboardProjectsCard
