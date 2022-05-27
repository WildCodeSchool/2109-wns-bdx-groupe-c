import { makeStyles } from "@mui/styles"
import { Box } from "@mui/system"
import ProjectInfo from "../components/molecules/ProjectInfo"
import Sidenav from "../components/molecules/Sidenav"

const useStyles = makeStyles({
    mainContainer: {
      backgroundColor: '#061B2E',
      margin: '0',
      minHeight: '100vh',
      padding: '25px',
      marginLeft: '65px',
      marginTop: '64px',
      '@media screen and (max-width: 600px)': {
        marginTop: '54px',
      },
    },
  })

const ProjectDashboardInfo = () => {
    const classes = useStyles()
    return (
        <Box className={classes.mainContainer}>
            <Sidenav />
            <ProjectInfo />
        </Box>   
    )
 }

export default ProjectDashboardInfo