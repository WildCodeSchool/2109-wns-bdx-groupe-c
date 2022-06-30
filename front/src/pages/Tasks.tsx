import { useHistory } from 'react-router-dom';
import { useState, useMemo, useCallback, useEffect } from 'react';
import { useQuery } from "@apollo/client"
import { makeStyles } from '@mui/styles'
import  { Box, FormControl, TextField, CardActionArea, Paper, Typography, CircularProgress, Chip, Stack } from "@mui/material"
import FolderIcon from '@mui/icons-material/Folder';
import SubjectIcon from '@mui/icons-material/Subject';

import { Task, Tasks as TasksType, TaskFromApi } from '../entities/task';
import { GET_ALL_TASKS } from '../queries/task';
import { hydrateTaskFromApi } from '../helpers/TaskHelper';

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
        gridTemplateColumns: 'repeat(3, 1fr)',
        gridGap: '2rem',
        width: '75%',
        margin: '2rem',
        padding: '2rem',
        border: '1px solid #1F84E1',
        borderRadius: '20px',
        '@media screen and (max-width: 1280px)': {
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
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        minWidth: '200px',
        minHeight: '125px',
        height: '100%',
        borderRadius: '14px',
        padding: '1rem',
        boxShadow: '0px 4px 4px rgba(0, 0, 0, 0.25)',
    },
    projectCardName: {
        fontSize: '17px !important',
        marginBottom: '1rem',
        fontWeight: 'bold',
        color: '#1F84E1',
    },
    projectCardContent: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        width: '100%',
    },
    projectCardInfo: {
        display: 'flex',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        width: '100%',
        marginTop: '1rem',
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
    withIcon: {
        display: 'inline-flex',
        alignItems: 'center',
    },
    icon: {
        marginRight: '.5rem',
    }
})

const Tasks = () => {
    const history = useHistory();
    const classes = useStyles();

    const { loading, data } = useQuery<TasksType>(GET_ALL_TASKS);
    const [ searchQuery, setSearchQuery ] = useState('');   

    let tasks: Task[] = useMemo(() => {
        if (data) {
            return data.allTasks.map((taskFromApi: TaskFromApi) => hydrateTaskFromApi(taskFromApi))
        } else {
            return []
        }

    }, [data]);
    const [ tasksShown, setTasksShown ] = useState(tasks)

    useEffect(() => {
        if (tasks && searchQuery === '') {
            setTasksShown(tasks);
        }
    }, [tasks, searchQuery])

    const onChange = useCallback((query: string) => {
        let search = query.toLowerCase();
        setSearchQuery(search);

        if (search === '' || search.length < 3) {
            setTasksShown(tasks);
        }
        
        let filteredTasks: Task[] = tasks.filter((task) => task.shortText.toLowerCase().startsWith(search));

        setTasksShown(filteredTasks);

    }, [setSearchQuery, setTasksShown, tasks])

    return (
      <Box className={classes.mainContainer}>
            <Box className={classes.tasksContainer}>
                <Typography variant="h2" className={classes.taskOptionsTitile}>Tasks</Typography>
                <FormControl className={classes.searchForm}>
                    <TextField
                        id="searchTasks"
                        type="string"
                        label="Search by subject"
                        value={searchQuery}
                        onChange={(event: any) => onChange(event.target.value)}
                    />
                </FormControl>
                
            </Box>

           <Box className={classes.projectsContainer}>
                {loading && (
                    <CircularProgress />
                )}
                {tasksShown?.map((task: any) => {
                    if (task && task.status.name !== "Done") {
                        const {id, subject, shortText, status, project} = task;
                        return (
                            <Paper className={classes.projectPaper} onClick={() => history.push(`/project/${project.id}/Tasks`)}>
                                <CardActionArea className={classes.projectActionArea}>
                                    <Typography className={classes.projectCardName}>{subject}</Typography>
                                    <Box className={classes.projectCardContent}>
                                        <Typography className={classes.withIcon}>
                                            <SubjectIcon className={classes.icon}/>
                                            {shortText}
                                        </Typography>
                                        <Box className={classes.projectCardInfo}>
                                            <Typography className={classes.withIcon} sx={{ fontWeight: 'bold' }}>
                                                <FolderIcon className={classes.icon}/>
                                                {project.name}
                                            </Typography>
                                            <Typography
                                                sx={{ 
                                                    color: status.name === 'To Do' ? '#A5A6F6'
                                                    : status.name === 'In Progress' ? '#E9FF63'
                                                    : status.name === 'Code Review' ? '#10CEC3'
                                                    : '',
                                                    fontWeight: 'bold',
                                                }}
                                            
                                            >{status.name}</Typography>
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
  
export default Tasks
