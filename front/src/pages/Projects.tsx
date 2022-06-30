import { useHistory } from 'react-router-dom';
import { useState, useMemo, useCallback, useEffect } from 'react';
import { useQuery } from "@apollo/client"
import { makeStyles } from '@mui/styles'
import  { Box, FormControl, TextField, CardActionArea, Paper, Typography, CircularProgress, Chip, Stack } from "@mui/material"
import  PersonIcon from '@mui/icons-material/Person';

import { GET_ALL_PROJECTS } from '../queries/project';
import { Project, ProjectFromApi, Projects as ProjectsType } from '../entities/project';
import { hydrateProjectFromApi } from '../helpers/ProjectHelper';

const useStyles = makeStyles({
    mainContainer: {
        display: 'inline-flex',
        alignItems: 'flex-start',
        justifyContent: 'center',
        position: 'relative',
        height: '100vh',
        width: '100vw',
        maxWidth: '100%',
        marginTop: '4rem',
        backgroundColor: '#061B2E',
        '@media screen and (max-width: 980px)': {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start',
            marginTop: '4rem',
        },
    },
    projectsContainer: {
        display: 'grid',
        gridTemplateColumns: 'repeat(4, 1fr)',
        gridGap: '2rem',
        width: '75%',
        margin: '2rem',
        padding: '2rem',
        border: '1px solid #1F84E1',
        borderRadius: '20px',
        '@media screen and (max-width: 1280px)': {
            gridTemplateColumns: 'repeat(3, 1fr)',
        },
        '@media screen and (max-width: 980px)': {
            gridTemplateColumns: 'repeat(2, 1fr)',
            width: '90%',
        },
        '@media screen and (max-width: 640px)': {
            gridTemplateColumns: '1fr',
            margin: '1rem',
            padding: '1rem',
        },
    },
    projectPaper: {
        borderRadius: '14px',
        backgroundColor: '#0c355b'
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
    tasksContainer: {
        width: '15%',
        marginTop: '2rem',
        padding: '2rem',
        border: '1px solid #1F84E1',
        borderRadius: '20px',
        '@media screen and (max-width: 980px)': {
            width: '90%',
        },
    },
    taskOptionsTitile: {
        marginBottom: '2rem',
        color: '#fff',
        fontSize: '1.6rem',
        fontWeight: 'bold',
    },
    searchForm: {
        backgroundColor: '#fff',
        borderRadius: '4px',
    },
})

const Projects = () => {
    const history = useHistory();
    const classes = useStyles();

    const { loading, data } = useQuery<ProjectsType>(GET_ALL_PROJECTS);
    const [ searchQuery, setSearchQuery ] = useState('');   
    let projects: Project[] = useMemo(() => {
        if (data) {
            return data.projects.map((projectFromApi: ProjectFromApi) => hydrateProjectFromApi(projectFromApi))
        } else {
            return []
        }

    }, [data]);
    const [ projectsShown, setProjectsShown ] = useState(projects)

    useEffect(() => {
        if (projects && searchQuery === '') {
            setProjectsShown(projects);
        }
    }, [projects, searchQuery])

    const onChange = useCallback((query: string) => {
        let search = query.toLowerCase();
        setSearchQuery(search);

        if (search === '' || search.length < 3) {
            setProjectsShown(projects);
        }
        
        let filteredProjects: Project[] = projects.filter((project) => project.name.toLowerCase().startsWith(search));

        setProjectsShown(filteredProjects);

    }, [setSearchQuery, setProjectsShown, projects])

    return (
      <Box className={classes.mainContainer}>
            <Box className={classes.tasksContainer}>
                <Typography variant="h2" className={classes.taskOptionsTitile}>Projects</Typography>
                <FormControl className={classes.searchForm}>
                    <TextField
                        id="searchProjects"
                        type="string"
                        label="Search"
                        value={searchQuery}
                        onChange={(event: any) => onChange(event.target.value)}
                    />
                </FormControl>
                
            </Box>

           <Box className={classes.projectsContainer}>
                {loading && (
                    <CircularProgress />
                )}
                {projectsShown?.map((project: any) => {
                    if (project) {
                        const {id, name, shortText, languages, countAssignee} = project;
                        return (
                            <Paper className={classes.projectPaper} onClick={() => history.push(`/project/${id}/Tasks`)}>
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
                                        {languages.map((language: any) => {
                                            return (
                                                <Chip key={language.id} label={language.name} color="primary" variant="outlined" className={classes.chipLanguage}/>
                                            )
                                        })}
                                    </Stack>
                                    </Box>
                                </Box>
                                </CardActionArea>
                            </Paper>
                        )
                    }
                })}
            </Box>
      </Box>
    )
  }
  
export default Projects
