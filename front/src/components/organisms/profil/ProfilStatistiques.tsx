import Box from "@mui/material/Box"
import {makeStyles} from "@mui/styles"
import { Theme } from '@mui/material/styles'
import { useQuery, useMutation } from "@apollo/client"

import { USER_MY_PROJECTS } from "../../../queries/user"

import BasicBox from "../../atoms/all/BasicBox"

const useStyles = makeStyles((theme: Theme) => ({
    container: {
        display: 'grid',
        gridTemplateColumns: 'repeat(6, 1fr)',
        gridGap: '2rem',
        border: '1px solid #1F84E1',
        borderRadius: '18px',
        padding: '2rem',
        marginBottom: '4rem',
        '@media screen and (max-width: 1024px)': {
            gridTemplateColumns: 'repeat(4, 1fr)',
        },
        '@media screen and (max-width: 840px)': {
            gridTemplateColumns: 'repeat(3, 1fr)',
        },
        '@media screen and (max-width: 580px)': {
            gridTemplateColumns: 'repeat(2, 1fr)',
        },
    },
    statsTitle: {
        gridRow: 1,
        margin: 0,
    },
    projectsCompleted: {
        gridRow: 2,
    },
    projectsInProgress: {
        gridRow: 2,
    },
    tasksCompleted: {
        gridRow: 2,
    },
    tasksInProgress: {
        gridRow: 2,
    },
}))

const ProfilStatistiques = () => {
    const classes = useStyles()

    const { loading: loadingProjectsDone, data: dataProjectsDone } = useQuery(USER_MY_PROJECTS, { variables: 'Done' })
    const { loading: loadingProjectsInProgress, data: dataProjectsInProgress } = useQuery(USER_MY_PROJECTS, { variables: 'In Progress' })

    return (
        <Box className={classes.container}>
            <h2 className={classes.statsTitle}>Statistiques :</h2>
            {loadingProjectsDone}
            {dataProjectsDone &&
                <Box className={classes.projectsCompleted}>
                    <BasicBox 
                        label={'Projects completed :'}
                        value={dataProjectsDone.myProjects.length}
                    />
                </Box>
            }
            {loadingProjectsInProgress}
            {dataProjectsInProgress &&
                <Box className={classes.projectsInProgress}>
                    <BasicBox 
                        label={'Projects in progress :'}
                        value={dataProjectsInProgress.myProjects.length}
                    />
                </Box>
            }
            <Box className={classes.tasksCompleted}>
                <BasicBox 
                    label={'Tasks Completed :'}
                    value={1}
                />
            </Box>
            <Box className={classes.tasksInProgress}>
                <BasicBox 
                    label={'Tasks in progress :'}
                    value={1}
                />
            </Box>
        </Box>
    )
}

export default ProfilStatistiques