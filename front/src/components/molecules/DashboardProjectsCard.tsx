import { useCallback, useState } from 'react';
import { useQuery } from "@apollo/client"
import { useHistory } from 'react-router-dom';

import  { Box, Card, CardActionArea, CardContent, Paper, Typography, CircularProgress, Chip, Stack, Menu, MenuItem, IconButton } from "@mui/material"
import  PersonIcon from '@mui/icons-material/Person';
import { makeStyles } from "@mui/styles"
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import { GET_ALL_PROJECTS }  from "../../queries/project"
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
    iconMore: {
      color:'#fff',
      fontSize: '40px',
    },
})

const DashboardProjectsCard = () => {
    const { loading, data, error } = useQuery(GET_ALL_PROJECTS)
    const [ openModal, setOpenModal ] = useState<boolean>(false);
    const toggleModal = useCallback(() => {
      setOpenModal(!openModal);
      handleClose();
    }, [openModal, setOpenModal]);
    const history = useHistory();
    const classes = useStyles()

    const [anchorEl, setAnchorEl] = useState(null);
  
    const handleMenu = (event: any) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleClose = () => {
      setAnchorEl(null);
    };

    return (
      <Card className={classes.card}>
        <CardContent className={classes.cardContainer}>
          <Box className={classes.boxTitle} >
            <Typography variant="h2" className={classes.projectContainerTitle}>
              All Projects
            </Typography>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="primary"
            >
              <MoreHorizIcon className={classes.iconMore} />
            </IconButton>
            <Menu
              id="menu-projects"
              anchorEl={anchorEl}
              anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
              vertical: 'top',
              horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
          >
              <MenuItem onClick={() => history.push('/projects')}>See all</MenuItem>
              <MenuItem onClick={toggleModal}>Add a project</MenuItem>
          </Menu>

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
                          <Stack direction="row" spacing={1}>
                            {languages.map((language) => {
                                const {name} = language;
                                return (
                                    <Chip key={language.id} label={name} color="primary" variant="outlined" className={classes.chipLanguage}/>
                                )
                            })}
                          </Stack>
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
