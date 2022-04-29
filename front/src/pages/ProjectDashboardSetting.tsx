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
      color: '#fff'
    },
  })

const ProjectDashboardSetting = () => {
    const classes = useStyles()
    return (
        <Box className={classes.mainContainer}>
            <Sidenav />
            <h1>Hello Project Dashboard Setting</h1>
        </Box>
    )
}

export default ProjectDashboardSetting