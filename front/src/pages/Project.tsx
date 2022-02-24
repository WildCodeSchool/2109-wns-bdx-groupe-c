import { useQuery } from "@apollo/client"

import Box from "@mui/material/Box"
import {makeStyles} from "@mui/styles"

import ProjectAllTasksCard from "../components/molecules/ProjectAllTasksCard"

import { GET_ALL_STATUS } from "../queries/status"
import { Status } from "../entities/status"

const useStyles = makeStyles({
    mainContainer: {
        backgroundColor: '#061B2E',
        margin: '0',
        minHeight: '100vh',
        padding: '25px',
        display: 'grid',
        gridTemplate: 'minmax(200px, calc(100vh - 50px)) / 1fr 1fr 1fr 1fr',
        columnGap: '30px'
    }
})

const Project = () => {
    const classes = useStyles()
    const { loading, data } = useQuery(GET_ALL_STATUS)
    
    return (
        <Box className={classes.mainContainer}>
            {loading ? <h1>Loading...</h1> : data?.status.map((status : Status) => { return (
            <ProjectAllTasksCard key={status.name} propStatus={status.name} />
            )})}
        </Box>
    )
}

export default Project