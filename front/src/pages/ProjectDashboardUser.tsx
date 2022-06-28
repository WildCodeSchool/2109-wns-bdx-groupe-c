import { makeStyles } from "@mui/styles"
import { Box } from "@mui/system"
import Sidenav from "../components/molecules/Sidenav"

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
  })

const ProjectDashboardUser = () => {
    const classes = useStyles()
    return (
        <Box className={classes.mainContainer}>
            <Sidenav />
            <h1>Manage User Assigned to the Project</h1>
        </Box>
    )
}

export default ProjectDashboardUser