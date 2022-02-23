import Box from "@mui/material/Box"
import {makeStyles} from "@mui/styles"

const useStyles = makeStyles({
    mainContainer: {
        width: '100vw',
        height: '100vh',
    }
})

const Project = () => {
    const classes = useStyles()
    return (
        <Box className={classes.mainContainer}></Box>
    )
}

export default Project