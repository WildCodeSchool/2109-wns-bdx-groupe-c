import Box from "@mui/material/Box"
import {makeStyles} from "@mui/styles"
import { Theme } from '@mui/material/styles'
import { useQuery } from "@apollo/client"

import { USER_MY_PROJECTS, USER_MY_TASKS } from "../../../queries/user"

import BasicBox from "../../atoms/all/BasicBox"

const useStyles = makeStyles((theme: Theme) => ({
    container: {
        display: 'flex',
        flexDirection: 'column',
        border: '1px solid #1F84E1',
        borderRadius: '18px',
        padding: '2rem',
        marginBottom: '4rem',
        '@media screen and (max-width: 640px)': {
            marginBottom: '2rem',
        },
    },
    statsTitle: {
        margin: 0,
    },
    statistiquesContianer: {
        display: 'grid',
        gridTemplateColumns: 'repeat(5, 1fr)',
        gridGap: '2rem',
        marginTop: '1rem',
        '@media screen and (max-width: 1440px)': {
            gridTemplateColumns: 'repeat(4, 1fr)',
        },
        '@media screen and (max-width: 1024px)': {
            gridTemplateColumns: 'repeat(3, 1fr)',
        },
        '@media screen and (max-width: 960px)': {
            gridTemplateColumns: 'repeat(2, 1fr)',
        },
        '@media screen and (max-width: 640px)': {
            gridTemplateColumns: '1fr',
        },
    },
}))

const ProfilStatistiques = () => {
    const classes = useStyles()

    const { loading: loadingProjectsDone, data: dataProjectsDone } = useQuery(USER_MY_PROJECTS, { variables: 'Done' })
    const { loading: loadingProjectsInProgress, data: dataProjectsInProgress } = useQuery(USER_MY_PROJECTS, { variables: 'In Progress' })
    const { loading: loadingTasksDone, data: dataTasksDone } = useQuery(USER_MY_TASKS, { variables: 'Done' })
    const { loading: loadingTasksInProgress, data: dataTasksInProgress } = useQuery(USER_MY_TASKS, { variables: 'In Progress' })

    return (
        <Box className={classes.container}>
            <h2 className={classes.statsTitle}>Statistiques :</h2>
            <Box className={classes.statistiquesContianer}>
                {loadingProjectsDone}
                {dataProjectsDone &&
                    <Box>
                        <BasicBox 
                            label={'Projects completed :'}
                            value={dataProjectsDone.myProjects.length}
                        />
                    </Box>
                }
                {loadingProjectsInProgress}
                {dataProjectsInProgress &&
                    <Box>
                        <BasicBox 
                            label={'Projects in progress :'}
                            value={dataProjectsInProgress.myProjects.length}
                        />
                    </Box>
                }
                {loadingTasksDone}
                {dataTasksDone &&
                    <Box>
                        <BasicBox 
                            label={'Tasks Completed :'}
                            value={dataTasksDone.myTasks.length}
                        />
                    </Box>
                }
                {loadingTasksInProgress}
                {dataTasksInProgress &&
                    <Box>
                        <BasicBox 
                            label={'Tasks in progress :'}
                            value={dataTasksInProgress.myTasks.length}
                        />
                    </Box>
                }
            </Box>
        </Box>
    )
}

export default ProfilStatistiques